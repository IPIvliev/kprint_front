<template>
    <div v-if="videos.length" class="white_block" :class="background">
        <div class="container">
            <div class="row gy-1">
                <div class="col-12">
                    <h3 class="product_section_title">Видео о товаре</h3>
                </div>
                <div class="col-12">
                    <div class="product_videos_grid">
                        <div v-for="video in videos" :key="video.id || video.url" class="product_video_card">
                            <div class="product_video_frame" v-if="toEmbedUrl(video.url)">
                                <iframe
                                  :src="toEmbedUrl(video.url)"
                                  title="Видео о товаре"
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowfullscreen
                                ></iframe>
                            </div>
                            <a v-else :href="video.url" class="product_video_link" target="_blank" rel="noopener noreferrer">
                                Открыть видео
                            </a>
                            <div v-if="video.title" class="product_video_title">{{ video.title }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['background', 'product'],
  computed: {
    videos () {
      return Array.isArray(this.product?.product_videos) ? this.product.product_videos : []
    }
  },
  methods: {
    toEmbedUrl (url) {
      const raw = String(url || '').trim()
      if (!raw) {
        return ''
      }
      const watchMatch = raw.match(/^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^&?#]+)/i)
      if (watchMatch) {
        return `https://www.youtube.com/embed/${watchMatch[1]}`
      }
      const shortMatch = raw.match(/^https?:\/\/youtu\.be\/([^?&#]+)/i)
      if (shortMatch) {
        return `https://www.youtube.com/embed/${shortMatch[1]}`
      }
      return raw
    }
  }
}
</script>
