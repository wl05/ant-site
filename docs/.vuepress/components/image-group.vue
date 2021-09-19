<template>
  <div>
    <ul class="container">
      <li class="container-item" v-for="s in source" v-bind:key="s.src">
        <slot name="img" v-bind:s="s">
          <img :src="s.src" preview="0" />
        </slot>
      </li>
    </ul>
    <center class="title">{{desc}}</center>
  </div>
</template>
<script>
export default {
  name: 'image-description',
  props: {
    source: Array,
    desc: String
  }
}
</script>

<style rel="stylesheet/scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  line-height: 0;
}
.container-item {
  width: 33.1%;
}
.title {
  font-size: 14px;
  text-decoration: underline;
}
</style>
