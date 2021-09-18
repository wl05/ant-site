<template>
  <ul class="container">
    <li class="container-item" v-for="s in source" v-bind:key="s.src">
      <slot name="img" v-bind:s="s">
        <img :src="s.src" preview="0" />
      </slot>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'image-description',
  props: {
    source: Array
  }
}
</script>

<style rel="stylesheet/scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: space-between;
  padding-left: 0;
}
.container-item {
  width: 33.1%;
}
</style>
