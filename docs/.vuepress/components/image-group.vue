<template>
  <el-card>
    <el-row :gutter="10" class="container">
      <el-col style="margin-bottom: 10px" :lg="{span: 8}" :sm="{span:12}" :xs="{span:12}" v-for="s in source" v-bind:key="s.src">
        <el-card class="card" :body-style="{ padding: '5px',height: '260px',
  overflow: 'hidden',position: 'relative' }" shadow="hover">
          <slot name="img" v-bind:s="s">
            <div class="image-container">
              <img class="image" :src="s.src" preview="0" object-fit="cover" />
            </div>
          </slot>
        </el-card>
      </el-col>
    </el-row>
    <center class="title">{{desc}}</center>
  </el-card>
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
.title {
  font-size: 14px;
  text-decoration: underline;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

.image-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
