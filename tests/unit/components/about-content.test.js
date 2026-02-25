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

  it('describes core directions and keeps extended section only for about page', () => {
    const aboutSource = fs.readFileSync(aboutViewPath, 'utf8')
    const homeViewPath = path.resolve(__dirname, '../../../src/views/Home.vue')
    const homeSource = fs.readFileSync(homeViewPath, 'utf8')
    const source = fs.readFileSync(aboutMainBlockPath, 'utf8')

    expect(aboutSource).toContain('<MainPageAbout :show-extended="true" />')
    expect(homeSource).toContain('<MainPageAbout/>')
    expect(homeSource).not.toContain('show-extended')

    expect(source).toContain('v-if="showExtended"')
    expect(source).toContain('ПО для высокоскоростного фотополимерного 3D-принтера')
    expect(source).toContain('ПО для подбора фотополимерных материалов по матрице цветов лица пациента')
    expect(source).toContain('Собственное производство фотополимерных материалов и филамента')
    expect(source).toContain('Ферма 3D-принтеров для изделий под заказ')
    expect(source).toContain('Обучение 3D-печати и 3D-сканированию')
    expect(source).toContain('Сертификаты на программное обеспечение и патенты')
  })

  it('renders about gallery block and removes hero action buttons', () => {
    const aboutSource = fs.readFileSync(aboutViewPath, 'utf8')

    expect(aboutSource).toContain('<GalleryBlock page-key="about-us"')
    expect(aboutSource).not.toContain('btn btn--black" to="/contact"')
    expect(aboutSource).not.toContain('btn btn--grayborder" to="/study"')
  })

  it('contains expanded timeline from 2019 to 2026', () => {
    const mainSource = fs.readFileSync(aboutMainBlockPath, 'utf8')
    const yearMarkers = mainSource.match(/<div class="about-company__timeline-year">/g) || []

    expect(yearMarkers).toHaveLength(8)
    expect(mainSource).toContain('about-company__timeline-year">2019<')
    expect(mainSource).toContain('about-company__timeline-year">2020<')
    expect(mainSource).toContain('about-company__timeline-year">2021<')
    expect(mainSource).toContain('about-company__timeline-year">2022<')
    expect(mainSource).toContain('about-company__timeline-year">2023<')
    expect(mainSource).toContain('about-company__timeline-year">2024<')
    expect(mainSource).toContain('about-company__timeline-year">2025<')
    expect(mainSource).toContain('about-company__timeline-year">2026<')
    expect(mainSource).toContain('Gorky Liquid')
  })
})

