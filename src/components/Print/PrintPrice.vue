<template>
  <div class="white_block white_background cmp-components-print-printprice">
    <div class="container center">
      <div class="row gy-1 item_center">
        <h1 class="title center">Рассчитать стоимость 3Д-печати</h1>

        <div class="print_price center">
          <i class="icon_print"></i>
          <h3>Загрузите 3Д модель</h3>
          <p class="print_p">Поддерживаемый формат - .stl</p>
          <button class="print_button btn btn--red" @click="onCalculateClick">
            Рассчитать печать
          </button>
          <p v-if="fileError" class="print_error">{{ fileError }}</p>
        </div>
      </div>
    </div>

    <input
      ref="fileInput"
      type="file"
      accept=".stl"
      class="print_file_input"
      @change="onFileChange"
    >

    <teleport to="body">
      <div v-if="isModalOpen" class="print_modal_overlay" @click.self="closeModal">
        <div class="print_modal">
          <button class="print_modal_close" @click="closeModal">x</button>

          <div class="print_modal_header">
            <h3>Расчёт печати</h3>
            <p class="print_modal_filename">{{ selectedFileName }}</p>
          </div>

          <div class="print_modal_content">
            <div class="print_model_preview_wrapper">
              <div ref="modelPreview" class="print_model_preview"></div>
              <p v-if="modelError" class="print_modal_error">{{ modelError }}</p>
            </div>

            <div class="print_materials">
              <h4>Материалы</h4>
              <p v-if="isLoadingMaterials">Загружаем материалы...</p>
              <p v-if="materialsError" class="print_modal_error">{{ materialsError }}</p>

              <div
                v-for="category in materialCategories"
                :key="category.id"
                class="print_material_category"
              >
                <p class="print_material_category_title">{{ category.name }}</p>
                <label
                  v-for="material in category.materials"
                  :key="material.id"
                  class="print_material_item"
                  :class="{ active: selectedMaterialId === material.id }"
                >
                  <input
                    v-model.number="selectedMaterialId"
                    type="radio"
                    name="print-material"
                    :value="material.id"
                  >
                  <span
                    class="print_material_color"
                    :style="{ backgroundColor: material.color || '#FFFFFF' }"
                  ></span>
                  <span class="print_material_name">{{ material.name }}</span>
                  <span class="print_material_price">{{ material.price_per_mm3 }} ₽/мм3</span>
                </label>
              </div>
            </div>
          </div>

          <div class="print_result">
            <p class="print_hint">
              Для расчета используем объём по формуле X × Y × Z. Укажите итоговые габариты модели в мм.
            </p>

            <div v-if="hasModelData" class="print_size_block">
              <p class="print_size_original">
                Исходные размеры: X {{ formatDimension(originalSizeMm.x) }} мм,
                Y {{ formatDimension(originalSizeMm.y) }} мм,
                Z {{ formatDimension(originalSizeMm.z) }} мм
              </p>

              <div class="print_size_inputs">
                <label>
                  X, мм
                  <input
                    v-model="targetSizeMm.x"
                    type="number"
                    min="1"
                    step="1"
                    @input="onSizeAxisInput('x')"
                  >
                </label>
                <label>
                  Y, мм
                  <input
                    v-model="targetSizeMm.y"
                    type="number"
                    min="1"
                    step="1"
                    @input="onSizeAxisInput('y')"
                  >
                </label>
                <label>
                  Z, мм
                  <input
                    v-model="targetSizeMm.z"
                    type="number"
                    min="1"
                    step="1"
                    @input="onSizeAxisInput('z')"
                  >
                </label>
                <button class="print_size_reset" type="button" @click="setTargetSizeToOriginal">
                  Подставить исходные
                </button>
              </div>
            </div>

            <p>Объём модели (X × Y × Z): <strong>{{ formatVolume(modelVolumeMm3) }} мм3</strong></p>
            <p>
              Примерная стоимость:
              <strong>{{ formatMoney(estimatedPrice) }}</strong>
            </p>
            <div class="print_size_inputs">
              <label>
                Количество деталей
                <input
                  v-model.number="orderQuantity"
                  type="number"
                  min="1"
                  step="1"
                >
              </label>
              <button
                class="btn btn--red"
                type="button"
                :disabled="isCreatingOrder || !canCreateOrder"
                @click="onCreateOrderClick"
              >
                {{ isCreatingOrder ? 'Создаем заказ...' : 'Заказать печать' }}
              </button>
            </div>
            <p v-if="orderError" class="print_modal_error">{{ orderError }}</p>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { markRaw } from 'vue'
import { createPrintOrder, fetchPrintMaterialCategories } from '@/services/print.service'
import { buildPrintOrderFormData, setPendingPrintOrderDraft } from '@/services/pending-print-order.service'

const MONEY_FORMATTER = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const VOLUME_FORMATTER = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

export default {
  data() {
    return {
      isModalOpen: false,
      selectedFileName: '',
      selectedFile: null,
      fileError: '',
      modelError: '',
      materialsError: '',
      orderError: '',
      isCreatingOrder: false,
      orderQuantity: 1,
      isLoadingMaterials: false,
      materialCategories: [],
      selectedMaterialId: null,
      rawModelVolume: 0,
      rawBoundsSize: {
        x: 0,
        y: 0,
        z: 0
      },
      targetSizeMm: {
        x: '',
        y: '',
        z: ''
      },
      previewImageFile: null,
      renderer: null,
      scene: null,
      camera: null,
      mesh: null,
      controls: null,
      animationFrameId: null,
      hasResizeListener: false,
      isLeftDraggingModel: false,
      isRightDraggingCamera: false,
      lastPointerPosition: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    flatMaterials() {
      return this.materialCategories.flatMap(category => category.materials || [])
    },
    selectedMaterial() {
      return this.flatMaterials.find(material => material.id === this.selectedMaterialId) || null
    },
    hasModelData() {
      return this.rawModelVolume > 0
    },
    originalSizeMm() {
      return {
        x: this.rawBoundsSize.x,
        y: this.rawBoundsSize.y,
        z: this.rawBoundsSize.z
      }
    },
    parsedTargetSizeMm() {
      return {
        x: this.toPositiveInteger(this.targetSizeMm.x),
        y: this.toPositiveInteger(this.targetSizeMm.y),
        z: this.toPositiveInteger(this.targetSizeMm.z)
      }
    },
    modelVolumeMm3() {
      const { x, y, z } = this.parsedTargetSizeMm
      if (!x || !y || !z) {
        return 0
      }
      return x * y * z
    },
    estimatedPrice() {
      if (!this.selectedMaterial) {
        return 0
      }
      return this.modelVolumeMm3 * this.toNumber(this.selectedMaterial.price_per_mm3)
    },
    canCreateOrder() {
      return Boolean(
        this.selectedFile &&
        this.hasModelData &&
        this.selectedMaterial &&
        this.orderQuantity > 0 &&
        this.parsedTargetSizeMm.x &&
        this.parsedTargetSizeMm.y &&
        this.parsedTargetSizeMm.z,
      )
    }
  },
  methods: {
    onCalculateClick() {
      this.fileError = ''
      if (this.$refs.fileInput) {
        this.$refs.fileInput.click()
      }
    },
    async onFileChange(event) {
      const files = event.target.files || []
      const file = files[0]
      if (!file) {
        return
      }

      if (!file.name.toLowerCase().endsWith('.stl')) {
        this.fileError = 'Можно выбрать только файл в формате .stl'
        event.target.value = ''
        return
      }

      this.fileError = ''
      this.selectedFileName = file.name
      this.selectedFile = file
      this.previewImageFile = null
      this.orderError = ''
      this.orderQuantity = 1
      this.isModalOpen = true

      try {
        await this.loadMaterialCategories()
        await this.renderModel(file)
      } catch (error) {
        console.error('STL processing failed:', error)
        this.modelError = 'Не удалось обработать STL-файл. Проверьте, что файл не повреждён и содержит корректную геометрию.'
      } finally {
        event.target.value = ''
      }
    },
    async loadMaterialCategories() {
      if (this.materialCategories.length) {
        return
      }

      this.materialsError = ''
      this.isLoadingMaterials = true

      try {
        const response = await fetchPrintMaterialCategories()
        const categories = Array.isArray(response.data) ? response.data : []
        this.materialCategories = categories
        if (!this.selectedMaterialId) {
          const firstMaterial = categories.flatMap(category => category.materials || [])[0]
          this.selectedMaterialId = firstMaterial ? firstMaterial.id : null
        }
      } catch (error) {
        this.materialsError = 'Не удалось загрузить материалы. Попробуйте обновить страницу.'
      } finally {
        this.isLoadingMaterials = false
      }
    },
    async renderModel(file) {
      this.modelError = ''
      const loader = new STLLoader()
      let geometry = null
      let binaryParseError = null
      let textParseError = null

      const fileBuffer = await file.arrayBuffer()

      try {
        geometry = loader.parse(fileBuffer)
      } catch (error) {
        binaryParseError = error
      }

      if (!this.hasGeometryVertices(geometry)) {
        try {
          const fileText = await file.text()
          geometry = loader.parse(fileText)
        } catch (error) {
          textParseError = error
        }
      }

      if (!this.hasGeometryVertices(geometry)) {
        throw textParseError || binaryParseError || new Error('STL geometry is empty')
      }

      geometry.computeVertexNormals()
      this.rawModelVolume = this.calculateVolume(geometry)
      this.updateBounds(geometry)
      this.setTargetSizeToOriginal()

      await this.$nextTick()

      try {
        this.initViewer(geometry)
      } catch (error) {
        geometry.dispose()
        console.error('STL render init failed:', error)
        this.modelError = 'Файл загружен, но браузер не смог отрисовать 3D-превью модели.'
      }
    },
    hasGeometryVertices(geometry) {
      const position = geometry && geometry.getAttribute ? geometry.getAttribute('position') : null
      return Boolean(position && position.count >= 3)
    },
    initViewer(geometry) {
      this.clearViewer()

      const container = this.$refs.modelPreview
      if (!container) {
        geometry.dispose()
        return
      }

      const renderer = markRaw(new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      }))
      const width = container.clientWidth || 640
      const height = container.clientHeight || 420
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(width, height)
      container.innerHTML = ''
      container.appendChild(renderer.domElement)

      const scene = markRaw(new THREE.Scene())
      const camera = markRaw(new THREE.PerspectiveCamera(45, width / height, 0.1, 10000))

      const ambientLight = new THREE.HemisphereLight(0xffffff, 0x223344, 1.1)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3)
      directionalLight.position.set(8, 10, 10)
      scene.add(ambientLight)
      scene.add(directionalLight)

      const meshMaterial = new THREE.MeshStandardMaterial({
        color: 0x7ea7d4,
        metalness: 0.08,
        roughness: 0.68
      })
      const mesh = markRaw(new THREE.Mesh(geometry, meshMaterial))
      scene.add(mesh)

      const controls = markRaw(new OrbitControls(camera, renderer.domElement))
      controls.enableDamping = true
      controls.dampingFactor = 0.06
      controls.enableRotate = false
      controls.enablePan = false
      controls.update()

      renderer.domElement.addEventListener('contextmenu', this.onViewerContextMenu)
      renderer.domElement.addEventListener('pointerdown', this.onViewerPointerDown, true)
      window.addEventListener('pointermove', this.onViewerPointerMove)
      window.addEventListener('pointerup', this.onViewerPointerUp)

      this.renderer = renderer
      this.scene = scene
      this.camera = camera
      this.mesh = mesh
      this.controls = controls

      this.fitCameraToMesh()

      if (!this.hasResizeListener) {
        window.addEventListener('resize', this.handleResize)
        this.hasResizeListener = true
      }

      this.renderLoop()
      window.requestAnimationFrame(() => {
        this.capturePreviewImage()
      })
    },
    fitCameraToMesh() {
      if (!this.mesh || !this.camera) {
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
      const distance = (maxDimension / (2 * Math.tan((Math.PI * this.camera.fov) / 360))) * 1.6

      this.camera.position.set(distance * 0.9, distance * 0.55, distance)
      this.camera.near = Math.max(distance / 1000, 0.1)
      this.camera.far = Math.max(distance * 30, 1000)
      this.camera.lookAt(0, 0, 0)
      this.camera.updateProjectionMatrix()

      if (this.controls) {
        this.controls.target.set(0, 0, 0)
        this.controls.update()
      }
    },
    renderLoop() {
      if (!this.renderer || !this.scene || !this.camera) {
        return
      }

      if (this.controls) {
        this.controls.update()
      }

      this.renderer.render(this.scene, this.camera)
      this.animationFrameId = window.requestAnimationFrame(() => this.renderLoop())
    },
    handleResize() {
      const container = this.$refs.modelPreview
      if (!container || !this.renderer || !this.camera) {
        return
      }

      const width = container.clientWidth || 640
      const height = container.clientHeight || 420
      this.renderer.setSize(width, height)
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      if (this.controls) {
        this.controls.update()
      }
    },
    updateBounds(geometry) {
      geometry.computeBoundingBox()
      const box = geometry.boundingBox
      if (!box) {
        this.rawBoundsSize = { x: 0, y: 0, z: 0 }
        return
      }
      const size = box.getSize(new THREE.Vector3())
      this.rawBoundsSize = {
        x: Math.abs(size.x),
        y: Math.abs(size.y),
        z: Math.abs(size.z)
      }
    },
    calculateVolume(geometry) {
      const position = geometry.getAttribute('position')
      if (!position || position.count < 3) {
        return 0
      }

      geometry.computeBoundingBox()
      const center = new THREE.Vector3()
      if (geometry.boundingBox) {
        geometry.boundingBox.getCenter(center)
      }

      const vertexA = new THREE.Vector3()
      const vertexB = new THREE.Vector3()
      const vertexC = new THREE.Vector3()
      const cross = new THREE.Vector3()
      let volume = 0

      for (let index = 0; index < position.count; index += 3) {
        vertexA.set(position.getX(index), position.getY(index), position.getZ(index)).sub(center)
        vertexB.set(position.getX(index + 1), position.getY(index + 1), position.getZ(index + 1)).sub(center)
        vertexC.set(position.getX(index + 2), position.getY(index + 2), position.getZ(index + 2)).sub(center)

        const tetrahedronVolume = vertexA.dot(cross.crossVectors(vertexB, vertexC)) / 6
        volume += tetrahedronVolume
      }

      return Math.abs(volume)
    },
    capturePreviewImage() {
      const canvas = this.renderer?.domElement
      if (!canvas || typeof canvas.toBlob !== 'function') {
        return
      }
      canvas.toBlob((blob) => {
        if (!blob) {
          return
        }
        this.previewImageFile = new File([blob], `print-preview-${Date.now()}.png`, {
          type: 'image/png',
        })
      }, 'image/png')
    },
    buildOrderDraft() {
      const quantity = Math.max(1, Number(this.orderQuantity) || 1)
      const dimensionX = this.parsedTargetSizeMm.x
      const dimensionY = this.parsedTargetSizeMm.y
      const dimensionZ = this.parsedTargetSizeMm.z
      return {
        file: this.selectedFile,
        quantity,
        price_client: this.estimatedPrice.toFixed(2),
        volume_mm3: String(this.modelVolumeMm3),
        material_name: this.selectedMaterial?.name || '',
        preview_image: this.previewImageFile,
        dimension_x_mm: String(dimensionX || ''),
        dimension_y_mm: String(dimensionY || ''),
        dimension_z_mm: String(dimensionZ || ''),
      }
    },
    maybeStartUploadFromRoute() {
      if (this.$route?.query?.start !== 'upload') {
        return
      }
      this.$nextTick(() => {
        this.onCalculateClick()
        this.$router.replace({ path: '/print' }).catch(() => {})
      })
    },
    async onCreateOrderClick() {
      if (!this.canCreateOrder) {
        this.orderError = 'Проверьте файл, материал, габариты и количество.'
        return
      }

      const draft = this.buildOrderDraft()

      if (!this.$store?.state?.auth?.status?.loggedIn) {
        setPendingPrintOrderDraft(draft)
        this.closeModal()
        this.$router.push({
          path: '/registration',
          query: { next: '/login', create_print_order: '1' },
        })
        return
      }

      this.isCreatingOrder = true
      this.orderError = ''

      try {
        const payload = buildPrintOrderFormData(draft)
        const response = await createPrintOrder(payload)
        const createdId = response?.data?.id
        this.closeModal()
        if (createdId) {
          this.$router.push({
            path: '/panel/print/orders',
            query: { orderId: String(createdId) },
          })
          return
        }
        this.$router.push('/panel/print/orders')
      } catch (error) {
        if (error?.response?.status === 401) {
          setPendingPrintOrderDraft(draft)
          this.closeModal()
          this.$router.push({
            path: '/registration',
            query: { next: '/login', create_print_order: '1' },
          })
          return
        }
        this.orderError = error?.userMessage || 'Не удалось создать заказ. Попробуйте еще раз.'
      } finally {
        this.isCreatingOrder = false
      }
    },
    onViewerContextMenu(event) {
      event.preventDefault()
    },
    onViewerPointerDown(event) {
      if (event.button === 0) {
        this.isLeftDraggingModel = true
        this.lastPointerPosition = {
          x: event.clientX,
          y: event.clientY
        }
        event.preventDefault()
        event.stopPropagation()
        return
      }

      if (event.button === 2) {
        this.isRightDraggingCamera = true
        this.lastPointerPosition = {
          x: event.clientX,
          y: event.clientY
        }
        event.preventDefault()
      }
    },
    onViewerPointerMove(event) {
      if (this.isLeftDraggingModel && this.mesh) {
        const deltaX = event.clientX - this.lastPointerPosition.x
        const deltaY = event.clientY - this.lastPointerPosition.y

        this.mesh.rotation.y += deltaX * 0.008
        this.mesh.rotation.x += deltaY * 0.008

        this.lastPointerPosition = {
          x: event.clientX,
          y: event.clientY
        }

        event.preventDefault()
        return
      }

      if (this.isRightDraggingCamera && this.camera) {
        const deltaX = event.clientX - this.lastPointerPosition.x
        const deltaY = event.clientY - this.lastPointerPosition.y
        this.orbitCameraByDelta(deltaX, deltaY)

        this.lastPointerPosition = {
          x: event.clientX,
          y: event.clientY
        }
        event.preventDefault()
      }
    },
    onViewerPointerUp(event) {
      if (event.button === 0) {
        this.isLeftDraggingModel = false
      }
      if (event.button === 2) {
        this.isRightDraggingCamera = false
      }
    },
    orbitCameraByDelta(deltaX, deltaY) {
      if (!this.camera) {
        return
      }

      const target = this.controls ? this.controls.target : new THREE.Vector3(0, 0, 0)
      const offset = new THREE.Vector3().copy(this.camera.position).sub(target)
      const spherical = new THREE.Spherical().setFromVector3(offset)
      const rotateSpeed = 0.005

      spherical.theta -= deltaX * rotateSpeed
      spherical.phi -= deltaY * rotateSpeed

      const epsilon = 0.0001
      spherical.phi = Math.max(epsilon, Math.min(Math.PI - epsilon, spherical.phi))

      offset.setFromSpherical(spherical)
      this.camera.position.copy(target).add(offset)
      this.camera.lookAt(target)
      this.camera.updateProjectionMatrix()

      if (this.controls) {
        this.controls.update()
      }
    },
    setTargetSizeToOriginal() {
      this.targetSizeMm = {
        x: this.formatInputNumber(this.originalSizeMm.x),
        y: this.formatInputNumber(this.originalSizeMm.y),
        z: this.formatInputNumber(this.originalSizeMm.z)
      }
    },
    onSizeAxisInput(axis) {
      const current = this.toPositiveInteger(this.targetSizeMm[axis])
      this.targetSizeMm = {
        ...this.targetSizeMm,
        [axis]: current ? String(current) : ''
      }
    },
    formatInputNumber(value) {
      const integer = this.toPositiveInteger(value)
      if (!integer) {
        return ''
      }
      return String(integer)
    },
    toPositiveInteger(value) {
      if (value === null || value === undefined || value === '') {
        return null
      }
      const normalized = String(value).replace(',', '.')
      const parsed = Number(normalized)
      if (!Number.isFinite(parsed) || parsed <= 0) {
        return null
      }
      return Math.max(1, Math.round(parsed))
    },
    clearViewer() {
      if (this.animationFrameId) {
        window.cancelAnimationFrame(this.animationFrameId)
        this.animationFrameId = null
      }

      if (this.mesh) {
        this.mesh.geometry.dispose()
        if (Array.isArray(this.mesh.material)) {
          this.mesh.material.forEach(material => material.dispose())
        } else if (this.mesh.material) {
          this.mesh.material.dispose()
        }
      }

      if (this.controls) {
        this.controls.dispose()
      }

      if (this.renderer && this.renderer.domElement) {
        this.renderer.domElement.removeEventListener('contextmenu', this.onViewerContextMenu)
        this.renderer.domElement.removeEventListener('pointerdown', this.onViewerPointerDown, true)
      }
      window.removeEventListener('pointermove', this.onViewerPointerMove)
      window.removeEventListener('pointerup', this.onViewerPointerUp)
      this.isLeftDraggingModel = false
      this.isRightDraggingCamera = false

      if (this.renderer) {
        this.renderer.dispose()
      }

      const container = this.$refs.modelPreview
      if (container) {
        container.innerHTML = ''
      }

      this.mesh = null
      this.scene = null
      this.camera = null
      this.controls = null
      this.renderer = null
    },
    closeModal() {
      this.isModalOpen = false
      this.selectedFileName = ''
      this.selectedFile = null
      this.modelError = ''
      this.orderError = ''
      this.isCreatingOrder = false
      this.orderQuantity = 1
      this.rawModelVolume = 0
      this.rawBoundsSize = { x: 0, y: 0, z: 0 }
      this.targetSizeMm = { x: '', y: '', z: '' }
      this.previewImageFile = null
      this.clearViewer()
      if (this.hasResizeListener) {
        window.removeEventListener('resize', this.handleResize)
        this.hasResizeListener = false
      }
    },
    toNumber(value) {
      const parsed = Number(value)
      return Number.isFinite(parsed) ? parsed : 0
    },
    formatMoney(value) {
      return MONEY_FORMATTER.format(value || 0)
    },
    formatDimension(value) {
      const integer = this.toPositiveInteger(value)
      return integer || 0
    },
    formatVolume(value) {
      return VOLUME_FORMATTER.format(value || 0)
    }
  },
  mounted() {
    this.maybeStartUploadFromRoute()
  },
  watch: {
    '$route.query.start'() {
      this.maybeStartUploadFromRoute()
    },
  },
  beforeUnmount() {
    this.clearViewer()
    if (this.hasResizeListener) {
      window.removeEventListener('resize', this.handleResize)
      this.hasResizeListener = false
    }
  }
}
</script>
