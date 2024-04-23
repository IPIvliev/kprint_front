<template>
    <div class="col-4" v-for="category in categories">
        <router-link :to="{path: 'shop/categories/' + category.id }" v-if="category.level != 1">
            <div class="category_card" >
                <img :src="category.photo" class="category_card_img" width="100%" height="350">
                
                <div class="category_card_footer">
                    <span class="category_card_footer_title">{{ category.title }}</span>
                </div>
            
            </div>
        </router-link>
        <router-link :to="{path: '/shop/categories/' + category.id + '/showcase'}" v-else>
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
    data() {
        return {

        }
    },
    props: ['categories'],
    computed: {

    }
}
</script>
<style scoped>
.category_card {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 400px;
    background-color: var(--fillsprimary);
    border-radius: 24px;
    margin: 30px 20px 10px 20px;
}

.category_card:hover {
    -moz-box-shadow: 0 0 10px #000;
    -webkit-box-shadow: 0 0 10px #000;
    box-shadow:0 0 10px var(--bs-gray-dark); 
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    transition: all 0.5s ease;
    cursor: pointer;
  }

.category_card_img {
    border-radius: 24px 24px 0 0;
    object-fit: cover;
    object-position: 50% 50%;
}

.category_card_footer {
    width:100%;
    text-align: center;

}

.category_card_footer_title {
  font-size: 1.5em;
  font-weight: 800;

}

</style>