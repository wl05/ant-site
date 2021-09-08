<template>
  <div class="container">
    <div class="img-container" :width="width">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'image-container',
  props: ['width']
}
</script>

<style rel="stylesheet/scss" scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.img-container {
  width: 100%;
  cursor: zoom-in;
}
</style>