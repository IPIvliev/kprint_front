<template>
    <div class="qty qty_text">
        <span class="minus bg-dark" @click="decrement">-</span>
        <input type="number" class="count gray_background" name="qty" :value="number">
        <span class="plus bg-dark" @click="increment">+</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                number: 0,
            }
        },
        methods: {
            increment() {
                this.number++
            },
            decrement() {
                if (this.number > 0) {
                    this.number--
                }
            }
        }
    }
</script>
<style scoped>
.qty {
    display: block;
    position: relative;
}

.qty .count {
    color: #000;
    display: inline-block;
    vertical-align: top;
    font-size: 25px;
    font-weight: 700;
    line-height: 30px;
    padding: 0 2px;
    min-width: 60px;
    text-align: center;
}
.qty .plus {
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    color: white;
    width: 30px;
    height: 30px;
    font: 30px/1 Arial,sans-serif;
    text-align: center;
    border-radius: 50%;
    }
.qty .minus {
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    color: white;
    width: 30px;
    height: 30px;
    font: 30px/1 Arial,sans-serif;
    text-align: center;
    border-radius: 50%;
    background-clip: padding-box;
}
.qty_text {
    text-align: center;
}
.minus:hover{
    background-color: #D83A56 !important;
}
.plus:hover{
    background-color: #D83A56 !important;
}
/*Prevent text selection*/
span{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
.count {  
    border: 0;
    width: 2%;
}
.count::-webkit-outer-spin-button,
.count::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.count:disabled{
    background-color:var(--fillssecondary);
}
</style>