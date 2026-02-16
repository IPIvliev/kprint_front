<template>
  <div class="order-model-preview">
    <div v-if="loading" class="order-model-preview__state">Загружаем 3D-модель...</div>
    <div v-else-if="requiresManualLoad" class="order-model-preview__state order-model-preview__state--interactive">
      <div class="order-model-preview__manual-text">
        STL-файл большой ({{ fileSizeLabel }}). Чтобы не зависал браузер, загрузка 3D отключена по умолчанию.
      </div>
      <button type="button" class="btn btn--grayborder" @click="onForceLoadClick">
        Загрузить 3D всё равно
      </button>
    </div>
    <div v-else-if="error" class="order-model-preview__state order-model-preview__state--error">{{ error }}</div>
    <div ref="viewport" class="order-model-preview__viewport"></div>
    <div v-if="!loading && !error && !requiresManualLoad" class="order-model-preview__hint">
      ЛКМ: вращение, колесо: масштаб, ПКМ: смещение
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const MAX_AUTO_PREVIEW_MB = 8

export default {
  name: 'OrderModelPreview',
  props: {
    modelUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      error: '',
      renderer: null,
      scene: null,
      camera: null,
      controls: null,
      mesh: null,
      animationFrameId: null,
      resizeObserver: null,
      requiresManualLoad: false,
      fileSizeBytes: null,
    }
  },
  computed: {
    fileSizeLabel() {
      const bytes = Number(this.fileSizeBytes)
      if (!Number.isFinite(bytes) || bytes <= 0) {
        return `>${MAX_AUTO_PREVIEW_MB} МБ`
      }
      return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`
    },
  },
  watch: {
    modelUrl: {
      immediate: true,
      handler(url) {
        this.prepareLoad(url)
      },
    },
  },
  methods: {
    async prepareLoad(url, force = false) {
      this.clearViewer()
      this.requiresManualLoad = false
      this.fileSizeBytes = null
      this.error = ''

      if (!url) {
        this.error = 'Файл модели недоступен.'
        this.loading = false
        return
      }

      if (!force) {
        const fileSizeBytes = await this.fetchModelSizeBytes(url)
        this.fileSizeBytes = fileSizeBytes
        if (Number.isFinite(fileSizeBytes) && fileSizeBytes > MAX_AUTO_PREVIEW_MB * 1024 * 1024) {
          this.requiresManualLoad = true
          this.loading = false
          return
        }
      }

      await this.loadModel(url)
    },
    async onForceLoadClick() {
      this.requiresManualLoad = false
      await this.prepareLoad(this.modelUrl, true)
    },
    async fetchModelSizeBytes(url) {
      try {
        const headResponse = await fetch(url, { method: 'HEAD' })
        const contentLengthHeader = headResponse.headers.get('content-length')
        const contentLength = Number(contentLengthHeader || 0)
        if (Number.isFinite(contentLength) && contentLength > 0) {
          return contentLength
        }
      } catch (error) {
        // ignore metadata request errors
      }

      try {
        const rangeResponse = await fetch(url, {
          method: 'GET',
          headers: { Range: 'bytes=0-0' },
        })
        const contentRange = rangeResponse.headers.get('content-range') || ''
        const sizePart = contentRange.includes('/') ? contentRange.split('/').pop() : ''
        const size = Number(sizePart || 0)
        return Number.isFinite(size) && size > 0 ? size : null
      } catch (error) {
        return null
      }
    },
    async loadModel(url) {
      await this.$nextTick()
      const container = this.$refs.viewport
      if (!container) {
        return
      }

      this.loading = true
      this.error = ''

      const width = container.clientWidth || 420
      const height = container.clientHeight || 320

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(width, height)
      container.innerHTML = ''
      container.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      scene.background = null

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000)
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.08
      controls.enableZoom = true

      const ambientLight = new THREE.HemisphereLight(0xffffff, 0x334455, 1.1)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1)
      directionalLight.position.set(8, 10, 10)
      scene.add(ambientLight)
      scene.add(directionalLight)

      this.renderer = renderer
      this.scene = scene
      this.camera = camera
      this.controls = controls

      const loader = new STLLoader()
      loader.load(
        url,
        (geometry) => {
          geometry.computeVertexNormals()
          geometry.computeBoundingBox()

          const material = new THREE.MeshStandardMaterial({
            color: 0x7ea7d4,
            metalness: 0.1,
            roughness: 0.7,
          })
          const mesh = new THREE.Mesh(geometry, material)
          scene.add(mesh)
          this.mesh = mesh

          this.fitCameraToMesh()
          this.startRenderLoop()
          this.observeResize(container)

          this.loading = false
        },
        undefined,
        () => {
          this.loading = false
          this.error = 'Не удалось загрузить 3D-модель. Попробуйте скачать STL или открыть модель позже.'
        },
      )
    },
    fitCameraToMesh() {
      if (!this.mesh || !this.camera || !this.controls) {
        return
      }
      this.mesh.geometry.computeBoundingBox()
      const box = this.mesh.geometry.boundingBox
      if (!box) {
        return
      }

      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      this.mesh.position.set(-center.x, -center.y, -center.z)

      const maxDimension = Math.max(size.x, size.y, size.z) || 10
      const distance = (maxDimension / (2 * Math.tan((Math.PI * this.camera.fov) / 360))) * 1.8

      this.camera.position.set(distance * 0.9, distance * 0.55, distance)
      this.camera.near = Math.max(distance / 1000, 0.1)
      this.camera.far = Math.max(distance * 30, 1000)
      this.camera.lookAt(0, 0, 0)
      this.camera.updateProjectionMatrix()

      this.controls.target.set(0, 0, 0)
      this.controls.update()
    },
    startRenderLoop() {
      if (!this.renderer || !this.scene || !this.camera) {
        return
      }

      const tick = () => {
        if (!this.renderer || !this.scene || !this.camera) {
          return
        }
        if (this.controls) {
          this.controls.update()
        }
        this.renderer.render(this.scene, this.camera)
        this.animationFrameId = window.requestAnimationFrame(tick)
      }
      tick()
    },
    observeResize(container) {
      if (!container) {
        return
      }
      this.resizeObserver = new ResizeObserver(() => {
        if (!this.renderer || !this.camera) {
          return
        }
        const width = container.clientWidth || 420
        const height = container.clientHeight || 320
        this.renderer.setSize(width, height)
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
      })
      this.resizeObserver.observe(container)
    },
    clearViewer() {
      if (this.animationFrameId) {
        window.cancelAnimationFrame(this.animationFrameId)
        this.animationFrameId = null
      }

      if (this.resizeObserver) {
        this.resizeObserver.disconnect()
        this.resizeObserver = null
      }

      if (this.mesh) {
        this.mesh.geometry.dispose()
        if (this.mesh.material) {
          this.mesh.material.dispose()
        }
        this.mesh = null
      }

      if (this.controls) {
        this.controls.dispose()
        this.controls = null
      }

      if (this.renderer) {
        this.renderer.dispose()
        this.renderer = null
      }

      const container = this.$refs.viewport
      if (container) {
        container.innerHTML = ''
      }

      this.scene = null
      this.camera = null
      this.loading = false
    },
  },
  beforeUnmount() {
    this.clearViewer()
  },
}
</script>

<style scoped>
.order-model-preview {
  position: relative;
  width: 100%;
  min-height: 380px;
  border: 1px solid #d8e2ef;
  border-radius: 14px;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 16%, rgba(255, 255, 255, 0.9) 0, rgba(255, 255, 255, 0) 34%),
    linear-gradient(160deg, #eef5fb 0%, #e6f0fa 42%, #dbe9f6 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.order-model-preview__viewport {
  width: 100%;
  height: clamp(360px, 48vh, 620px);
}

.order-model-preview__state {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px;
  color: #355d86;
  z-index: 2;
  pointer-events: none;
}

.order-model-preview__state--interactive {
  display: grid;
  gap: 10px;
  place-content: center;
  pointer-events: auto;
  max-width: 520px;
  margin: 0 auto;
}

.order-model-preview__manual-text {
  font-size: 13px;
  line-height: 1.35;
  color: #274866;
}

.order-model-preview__state--error {
  color: #c13333;
}

.order-model-preview__hint {
  position: absolute;
  left: 12px;
  bottom: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(18, 36, 56, 0.68);
  color: #f8fbff;
  font-size: 12px;
  line-height: 1;
  pointer-events: none;
}
</style>
