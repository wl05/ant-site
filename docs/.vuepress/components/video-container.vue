<template>
  <div class="container">
    <video class="vedio-container" :width="width" controls>
      <slot></slot>
    </video>
  </div>
</template>
<script>
export default {
  name: 'vedio-container',
  props: ['width']
}
</script>

<style rel="stylesheet/scss" scoped>
.container {
  display: flex;
  justify-content: center;
  max-width: 654px;
}
.vedio-container {
  width: 100%;
}
</style>