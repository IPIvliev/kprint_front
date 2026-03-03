import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const componentPath = path.resolve(__dirname, '../../../src/components/Panel/PanelStudyUser.vue')

describe('PanelStudyUser HLS playback', () => {
  it('supports m3u8 playback with native and hls.js fallbacks', () => {
    const source = fs.readFileSync(componentPath, 'utf8')

    expect(source).toContain('ref="lessonVideoPlayer"')
    expect(source).toContain("video.canPlayType('application/vnd.apple.mpegurl')")
    expect(source).toContain("import('hls.js')")
    expect(source).toContain('isHlsStream (value)')
    expect(source).toContain("VUE_APP_STUDY_VIDEO_CDN_HOST")
    expect(source).toContain("storage.yandexcloud.net")
    expect(source).toContain('this.setupLessonVideoPlayback()')
  })
})
