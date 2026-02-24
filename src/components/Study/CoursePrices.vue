<template>
  <div class="white_block cmp-components-study-courseprices" :class="background">
      <div class="container">
        <div class="row gy-1">
          <div class="col-lg-12">
            <h2 class="title">Стоимость обучения</h2>
            <div class="price_cards">
              <div class="price_card" v-for="price in prices" :key="price.id">
                    <h3 class="price_card_name">{{ price.name }}</h3>
                    <p class="price_card_short_description">{{ price.short_description }}</p>
                    <hr class="price_card_hr">
                    <p class="price_card_description" v-html="price.description"></p>
                    <div class="price_card_footer">
                      <span class="price_card_footer_price">{{ Change(price.price) }}</span>
                      <button class="btn btn--red btn--small price_card_footer_button" @click="buyCourse(price)">Купить</button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['background', 'prices', 'course'],
  methods: {
    Change (number) {
      number = Math.trunc(number)
      return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' руб.'
    },
    buildStudyPanelTarget (courseId, priceId) {
      if (!courseId || !priceId) {
        return '/panel/study'
      }
      const query = new URLSearchParams({
        study_course_id: String(courseId),
        study_price_id: String(priceId)
      }).toString()
      return `/panel/study?${query}`
    },
    buyCourse (price) {
      if (!this.course || !price) {
        return
      }

      const courseId = Number(this.course.id || 0)
      const priceId = Number(price.id || 0)
      const panelStudyTarget = this.buildStudyPanelTarget(courseId, priceId)

      const isLoggedIn = this.$store?.state?.auth?.status?.loggedIn === true
      if (!isLoggedIn) {
        const goToLogin = typeof window === 'undefined'
          ? true
          : window.confirm(
            'Для покупки обучения войдите в аккаунт. Нажмите OK для входа или Отмена для регистрации.'
          )
        const targetPath = goToLogin ? '/login' : '/registration'
        this.$router.push({
          path: targetPath,
          query: { next: panelStudyTarget }
        })
        return
      }

      this.$router.push({
        path: '/panel/study',
        query: {
          study_course_id: String(courseId),
          study_price_id: String(priceId)
        }
      })
    }
  }
}
</script>
