<template>
  <div class="container">
    <div ref="imgContainer" class="img-container" :width="width">
      <slot></slot>
      <center class="title">{{desc}}</center>
    </div>
  </div>
</template>
<script>
export default {
  name: 'image-container',
  props: ['width', 'desc'],
  mounted: function () {
    this.$refs.imgContainer.children[0].setAttribute('preview', '1')
    this.$refs.imgContainer.children[0].setAttribute('width', '100%')
  }
}
</script>

<style rel="stylesheet/scss" scoped>
.container {
  display: flex;
  justify-content: center;
  max-width: 660px;
}
.img-container {
  width: 100%;
  cursor: zoom-in;
}
.title {
  font-size: 14px;
  text-decoration: underline;
}
</style>