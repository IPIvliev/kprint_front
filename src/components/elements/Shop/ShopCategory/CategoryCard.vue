<template>
  <div class="col-4 cmp-components-elements-shop-shop-category-categorycard" v-for="category in categories" :key="category.id">
        <router-link :to="{path: '/shop/categories/' + (category.slug || category.id) }" v-if="category.level !== 1">
            <div class="category_card" >
                <img :src="category.photo" class="category_card_img" width="100%" height="350">

                <div class="category_card_footer">
                    <span class="category_card_footer_title">{{ category.title }}</span>
                </div>

            </div>
        </router-link>
        <router-link :to="{path: '/shop/categories/' + (category.slug || category.id) + '/showcase'}" v-else>
            <div class="category_card" >
                <img :src="category.photo" class="category_card_img" width="100%" height="350">

                <div class="category_card_footer">
                    <span class="category_card_footer_title">{{ category.title }}</span>
                </div>

            </div>
        </router-link>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: ['categories'],
  computed: {

  }
}
</script>
