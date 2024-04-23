<template>
    <div class="row">
        <div class="filter_item" v-for="filter in filters">
            <p>
                {{ filter.name }}: {{ filter.attr }}
                <!-- <span class="close" @click="$emit('selectFilter', filter.name, filter.attr)">X</span> -->
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props: ['filters'],
    emits: ['selectFilter']
}
</script>
<style scoped>
.filter_item {
    padding: 0 20px;
    margin: 0 0 10px 20px;
    background-color: var(--textprimary);
    border-radius: 60px;
    width: max-content;
    height: 50px;

    display: flex;
    align-items: center
}

.filter_item p {
  margin: 0;
  color: white;
}

.close {
    margin: 0 0 0 10px;
    cursor: pointer;
}

</style>