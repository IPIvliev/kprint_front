<template>
    <div class="page">
        <header-block />
        <div class="content">
            <div class="white_block gray_background">
                <div class="container">
                    <h1 class="title">Корзина</h1>
                    <p class="news__text">Ваши покупки.</p>

                    <div class="row gy-1 cart_block">
                        <div class="col-md-3 col-sm-12">
                            f
                        </div>
                        <div class="col-md-9 col-sm-12">
                            df
                        </div>                
                    </div>
                </div>
            </div>
            <!--	/news-->
            <!-- callback-->
            <!--	/callback-->
            <WhiteWelcome/>
        </div>

        <footer-block />
    </div>
</template>

<script>
import HeaderBlock from '../../components/HeaderBlock.vue'
import WhiteWelcome from "../../components/elements/WhiteWelcome.vue"
import FooterBlock from '../../components/FooterBlock.vue'

export default {
    components: { HeaderBlock, WhiteWelcome, FooterBlock }
}
</script>

<style>
.cart_block {
    margin: 50px 0;
    padding: 40px;
    border-radius: 24px;
    background-color: var(--fillssecondary);
}
</style>