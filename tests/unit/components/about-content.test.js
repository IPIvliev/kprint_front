import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const aboutViewPath = path.resolve(__dirname, '../../../src/views/About.vue')
const aboutMainBlockPath = path.resolve(__dirname, '../../../src/components/elements/MainPage/MainPageAbout.vue')

describe('about page content', () => {
  it('shows company identity and timeframe in hero section', () => {
    const source = fs.readFileSync(aboutViewPath, 'utf8')
    expect(source).toContain('ООО «НПП')
    expect(source).toContain('3Д Аддитивные Технологии')
    expect(source).toContain('С 2019 года')
    expect(source).toContain('О компании')
  })

  it('describes core directions and key software cases', () => {
    const source = fs.readFileSync(aboutMainBlockPath, 'utf8')

    expect(source).toContain('ПО для высокоскоростного фотополимерного 3D-принтера')
    expect(source).toContain('ПО для подбора фотополимерных материалов по матрице цветов лица пациента')
    expect(source).toContain('Собственное производство фотополимерных материалов и филамента')
    expect(source).toContain('Ферма 3D-принтеров для изделий под заказ')
    expect(source).toContain('Обучение 3D-печати и 3D-сканированию')
    expect(source).toContain('Сертификаты на программное обеспечение и патенты')
  })

  it('contains v2 trust and timeline sections', () => {
    const aboutSource = fs.readFileSync(aboutViewPath, 'utf8')
    const mainSource = fs.readFileSync(aboutMainBlockPath, 'utf8')

    expect(aboutSource).toContain('Сертификаты и патенты')
    expect(aboutSource).toContain('Подтверждённые результаты в ПО и материалах')
    expect(mainSource).toContain('Как мы развиваем направление с 2019 года')
    expect(mainSource).toContain('Исследования и первые прикладные решения')
    expect(mainSource).toContain('Собственная технологическая экосистема')
  })
})
