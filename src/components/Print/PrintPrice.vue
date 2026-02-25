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
                <p class="print_material_category_title">{{ category.full_name || category.name }}</p>
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
                  <span class="print_material_price">{{ material.price_per_mm3 }} руб/см3</span>
                </label>
              </div>
            </div>
          </div>

          <div class="print_result">
            <p class="print_hint">
              Для расчета используем объём по формуле X × Y × Z. Укажите итоговые габариты модели в см.
            </p>

            <div v-if="hasModelData" class="print_size_block">
              <p class="print_size_original">
                Исходные размеры: X {{ formatDimension(originalSizeCm.x) }} см,
                Y {{ formatDimension(originalSizeCm.y) }} см,
                Z {{ formatDimension(originalSizeCm.z) }} см
              </p>

              <div class="print_size_inputs">
                <label>
                  X, см
                  <input
                    v-model="targetSizeCm.x"
                    type="number"
                    min="0.01"
                    step="0.01"
                    @input="onSizeAxisInput('x')"
                  >
                </label>
                <label>
                  Y, см
                  <input
                    v-model="targetSizeCm.y"
                    type="number"
                    min="0.01"
                    step="0.01"
                    @input="onSizeAxisInput('y')"
                  >
                </label>
                <label>
                  Z, см
                  <input
                    v-model="targetSizeCm.z"
                    type="number"
                    min="0.01"
                    step="0.01"
                    @input="onSizeAxisInput('z')"
                  >
                </label>
                <button class="print_size_reset" type="button" @click="setTargetSizeToOriginal">
                  Подставить исходные
                </button>
              </div>
            </div>

            <p>Объём модели (X × Y × Z): <strong>{{ formatVolume(modelVolumeCm3) }} см3</strong></p>
            <p>
              Примерная стоимость ({{ orderQuantityValue || 1 }} шт.):
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
              <div class="print_ugc_notice">
                <p class="print_ugc_notice__title">Для отправки заказа печати подтвердите права на 3D-модель:</p>
                <label class="print_ugc_consent">
                  <input v-model="ugcRightsAccepted" type="checkbox">
                  <span>
                    <strong class="print_ugc_badge">Обязательно</strong>
                    Подтверждаю права на контент
                    <router-link to="/legal/terms-offer#10-пользовательский-контент-3d-модели-и-файлы" target="_blank" rel="noopener noreferrer">
                      (UGC)
                    </router-link>
                  </span>
                </label>
                <p class="print_ugc_status" :class="{ 'print_ugc_status--ready': ugcRightsAccepted }">
                  {{ ugcRightsAccepted ? 'Подтверждение получено. Можно отправлять заказ.' : 'Без подтверждения прав заказ на печать не отправляется.' }}
                </p>
              </div>
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
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export default {
  data () {
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
      ugcRightsAccepted: false,
      isLoadingMaterials: false,
      materialCategories: [],
      selectedMaterialId: null,
      rawModelVolume: 0,
      rawBoundsSize: {
        x: 0,
        y: 0,
        z: 0
      },
      targetSizeCm: {
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
    flatMaterials () {
      return this.materialCategories.flatMap(category => category.materials || [])
    },
    selectedMaterial () {
      return this.flatMaterials.find(material => material.id === this.selectedMaterialId) || null
    },
    hasModelData () {
      return this.rawModelVolume > 0
    },
    originalSizeCm () {
      return {
        x: this.rawBoundsSize.x / 10,
        y: this.rawBoundsSize.y / 10,
        z: this.rawBoundsSize.z / 10
      }
    },
    parsedTargetSizeCm () {
      return {
        x: this.toPositiveDecimal(this.targetSizeCm.x),
        y: this.toPositiveDecimal(this.targetSizeCm.y),
        z: this.toPositiveDecimal(this.targetSizeCm.z)
      }
    },
    modelVolumeCm3 () {
      const { x, y, z } = this.parsedTargetSizeCm
      if (!x || !y || !z) {
        return 0
      }
      return this.roundTo2(x * y * z)
    },
    orderQuantityValue () {
      const normalized = Math.floor(this.toNumber(this.orderQuantity))
      if (!Number.isFinite(normalized) || normalized <= 0) {
        return 0
      }
      return normalized
    },
    unitPrice () {
      if (!this.selectedMaterial) {
        return 0
      }
      return this.roundTo2(this.modelVolumeCm3 * this.toNumber(this.selectedMaterial.price_per_mm3))
    },
    estimatedPrice () {
      if (!this.unitPrice || !this.orderQuantityValue) {
        return 0
      }
      return this.roundTo2(this.unitPrice * this.orderQuantityValue)
    },
    canCreateOrder () {
      return Boolean(
        this.selectedFile &&
        this.hasModelData &&
        this.selectedMaterial &&
        this.orderQuantityValue > 0 &&
        this.parsedTargetSizeCm.x &&
        this.parsedTargetSizeCm.y &&
        this.parsedTargetSizeCm.z &&
        this.ugcRightsAccepted
      )
    }
  },
  methods: {
    onCalculateClick () {
      this.fileError = ''
      if (this.$refs.fileInput) {
        this.$refs.fileInput.click()
      }
    },
    async onFileChange (event) {
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
      this.ugcRightsAccepted = false
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
    async loadMaterialCategories () {
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
    async renderModel (file) {
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
    hasGeometryVertices (geometry) {
      const position = geometry && geometry.getAttribute ? geometry.getAttribute('position') : null
      return Boolean(position && position.count >= 3)
    },
    initViewer (geometry) {
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
    fitCameraToMesh () {
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
    renderLoop () {
      if (!this.renderer || !this.scene || !this.camera) {
        return
      }

      if (this.controls) {
        this.controls.update()
      }

      this.renderer.render(this.scene, this.camera)
      this.animationFrameId = window.requestAnimationFrame(() => this.renderLoop())
    },
    handleResize () {
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
    updateBounds (geometry) {
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
    calculateVolume (geometry) {
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
    capturePreviewImage () {
      const canvas = this.renderer?.domElement
      if (!canvas || typeof canvas.toBlob !== 'function') {
        return
      }
      canvas.toBlob((blob) => {
        if (!blob) {
          return
        }
        this.previewImageFile = new File([blob], `print-preview-${Date.now()}.png`, {
          type: 'image/png'
        })
      }, 'image/png')
    },
    buildOrderDraft () {
      const quantity = this.orderQuantityValue || 1
      const dimensionXcm = this.parsedTargetSizeCm.x
      const dimensionYcm = this.parsedTargetSizeCm.y
      const dimensionZcm = this.parsedTargetSizeCm.z
      const dimensionXmm = this.roundTo2(dimensionXcm * 10)
      const dimensionYmm = this.roundTo2(dimensionYcm * 10)
      const dimensionZmm = this.roundTo2(dimensionZcm * 10)
      return {
        file: this.selectedFile,
        quantity,
        price_client: this.estimatedPrice.toFixed(2),
        volume_mm3: String(this.roundTo2(this.modelVolumeCm3 * 1000)),
        material_name: this.selectedMaterial?.name || '',
        preview_image: this.previewImageFile,
        dimension_x_mm: String(dimensionXmm || ''),
        dimension_y_mm: String(dimensionYmm || ''),
        dimension_z_mm: String(dimensionZmm || ''),
        ugc_rights_accepted: this.ugcRightsAccepted
      }
    },
    maybeStartUploadFromRoute () {
      if (this.$route?.query?.start !== 'upload') {
        return
      }
      this.$nextTick(() => {
        this.onCalculateClick()
        this.$router.replace({ path: '/print' }).catch(() => {})
      })
    },
    async onCreateOrderClick () {
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
          query: { next: '/login', create_print_order: '1' }
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
            query: { orderId: String(createdId) }
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
            query: { next: '/login', create_print_order: '1' }
          })
          return
        }
        this.orderError = error?.userMessage || 'Не удалось создать заказ. Попробуйте еще раз.'
      } finally {
        this.isCreatingOrder = false
      }
    },
    onViewerContextMenu (event) {
      event.preventDefault()
    },
    onViewerPointerDown (event) {
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
    onViewerPointerMove (event) {
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
    onViewerPointerUp (event) {
      if (event.button === 0) {
        this.isLeftDraggingModel = false
      }
      if (event.button === 2) {
        this.isRightDraggingCamera = false
      }
    },
    orbitCameraByDelta (deltaX, deltaY) {
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
    setTargetSizeToOriginal () {
      this.targetSizeCm = {
        x: this.formatInputNumber(this.originalSizeCm.x),
        y: this.formatInputNumber(this.originalSizeCm.y),
        z: this.formatInputNumber(this.originalSizeCm.z)
      }
    },
    onSizeAxisInput (axis) {
      const current = this.toPositiveDecimal(this.targetSizeCm[axis])
      const originalAxis = this.toPositiveDecimal(this.originalSizeCm[axis])
      if (!current || !originalAxis) {
        this.targetSizeCm = {
          ...this.targetSizeCm,
          [axis]: ''
        }
        return
      }
      const scaleFactor = current / originalAxis
      this.targetSizeCm = {
        x: this.formatInputNumber(this.originalSizeCm.x * scaleFactor),
        y: this.formatInputNumber(this.originalSizeCm.y * scaleFactor),
        z: this.formatInputNumber(this.originalSizeCm.z * scaleFactor)
      }
    },
    formatInputNumber (value) {
      const number = this.toPositiveDecimal(value)
      if (!number) {
        return ''
      }
      return this.roundTo2(number).toFixed(2)
    },
    toPositiveDecimal (value) {
      if (value === null || value === undefined || value === '') {
        return null
      }
      const normalized = String(value).replace(',', '.')
      const parsed = Number(normalized)
      if (!Number.isFinite(parsed) || parsed <= 0) {
        return null
      }
      return parsed
    },
    roundTo2 (value) {
      if (!Number.isFinite(value)) {
        return 0
      }
      return Math.round(value * 100) / 100
    },
    clearViewer () {
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
    closeModal () {
      this.isModalOpen = false
      this.selectedFileName = ''
      this.selectedFile = null
      this.modelError = ''
      this.orderError = ''
      this.isCreatingOrder = false
      this.orderQuantity = 1
      this.ugcRightsAccepted = false
      this.rawModelVolume = 0
      this.rawBoundsSize = { x: 0, y: 0, z: 0 }
      this.targetSizeCm = { x: '', y: '', z: '' }
      this.previewImageFile = null
      this.clearViewer()
      if (this.hasResizeListener) {
        window.removeEventListener('resize', this.handleResize)
        this.hasResizeListener = false
      }
    },
    toNumber (value) {
      const parsed = Number(value)
      return Number.isFinite(parsed) ? parsed : 0
    },
    formatMoney (value) {
      return MONEY_FORMATTER.format(value || 0)
    },
    formatDimension (value) {
      const number = this.toPositiveDecimal(value)
      if (!number) {
        return '0.00'
      }
      return this.roundTo2(number).toFixed(2)
    },
    formatVolume (value) {
      const normalized = this.roundTo2(this.toNumber(value))
      return VOLUME_FORMATTER.format(normalized)
    }
  },
  mounted () {
    this.maybeStartUploadFromRoute()
  },
  watch: {
    '$route.query.start' () {
      this.maybeStartUploadFromRoute()
    }
  },
  beforeUnmount () {
    this.clearViewer()
    if (this.hasResizeListener) {
      window.removeEventListener('resize', this.handleResize)
      this.hasResizeListener = false
    }
  }
}
</script>

<style scoped>
.print_ugc_notice {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 420px;
  padding: 10px 12px;
  border: 1px solid #d9dee8;
  border-radius: 8px;
  background: #f7f9fc;
}

.print_ugc_notice__title {
  margin: 0;
  color: #232629;
  font-size: 13px;
  line-height: 1.35;
  font-weight: 600;
}

.print_ugc_consent {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  max-width: 360px;
  color: #5d636f;
  font-size: 13px;
  line-height: 1.35;
  margin: 0;
}

.print_ugc_consent input {
  margin-top: 3px;
}

.print_ugc_badge {
  display: inline-block;
  margin-right: 6px;
  padding: 1px 6px;
  border-radius: 999px;
  background: #fde8ec;
  color: #c9314f;
  font-size: 11px;
  line-height: 1.2;
}

.print_ugc_status {
  margin: 0;
  color: #a03d52;
  font-size: 12px;
  line-height: 1.35;
}

.print_ugc_status--ready {
  color: #2f8f4e;
}
</style>
