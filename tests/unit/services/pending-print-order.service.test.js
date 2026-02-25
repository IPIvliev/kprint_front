import {
  buildPrintOrderFormData,
  clearPendingPrintOrderDraft,
  consumePendingPrintOrderDraft,
  getPendingPrintOrderDraft,
  setPendingPrintOrderDraft
} from '@/services/pending-print-order.service'

describe('pending-print-order service', () => {
  it('stores, reads and consumes pending draft', () => {
    const draft = { quantity: 2, material_name: 'PLA' }
    setPendingPrintOrderDraft(draft)

    expect(getPendingPrintOrderDraft()).toEqual(draft)
    const meta = JSON.parse(window.sessionStorage.getItem('pending_print_order_meta'))
    expect(meta.quantity).toBe(2)
    expect(meta.material_name).toBe('PLA')

    expect(consumePendingPrintOrderDraft()).toEqual(draft)
    expect(getPendingPrintOrderDraft()).toBe(null)
    expect(window.sessionStorage.getItem('pending_print_order_meta')).toBe(null)
  })

  it('clears draft manually', () => {
    setPendingPrintOrderDraft({ quantity: 1 })
    clearPendingPrintOrderDraft()
    expect(getPendingPrintOrderDraft()).toBe(null)
  })

  it('builds FormData from draft payload', () => {
    const modelFile = new File(['stl-content'], 'test.stl', { type: 'model/stl' })
    const previewFile = new File(['img'], 'preview.png', { type: 'image/png' })
    const formData = buildPrintOrderFormData({
      file: modelFile,
      quantity: 3,
      price_client: '1200',
      volume_mm3: 150,
      material_name: 'ABS',
      preview_image: previewFile,
      dimension_x_mm: 10,
      dimension_y_mm: 20,
      dimension_z_mm: 30
    })

    const modelValue = formData.get('model_file')
    expect(modelValue).toBeInstanceOf(File)
    expect(modelValue.name).toBe('test.stl')
    expect(formData.get('quantity')).toBe('3')
    expect(formData.get('price_client')).toBe('1200')
    expect(formData.get('volume_mm3')).toBe('150')
    expect(formData.get('material_name')).toBe('ABS')
    const previewValue = formData.get('preview_image')
    expect(previewValue).toBeInstanceOf(File)
    expect(previewValue.name).toBe('preview.png')
    expect(formData.get('dimension_x_mm')).toBe('10')
    expect(formData.get('dimension_y_mm')).toBe('20')
    expect(formData.get('dimension_z_mm')).toBe('30')
  })
})
