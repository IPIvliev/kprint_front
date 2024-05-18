<template>
    <div class="white_block" :class="background">
        <div class="container"> 
            <div class="row gy-1">
                <div class="col-12">
                    feedbacks
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['background', 'product'],
    }
</script>