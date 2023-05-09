<script setup>
</script>
<template>
  <div>
    <p>v-focus 指令</p>
    <input type="text" v-focus>
    <p>v-lazy指令</p>
   <img class="img" v-for="i in 10" v-lazy="`https://images.ctfassets.net/hrltx12pl8hq/wF4ZyNhpDjvmW4QhyxPSc/7a60c04b72301319dbf2aa10c4ca8ce3/shutterstock_2237579543.jpeg?fit=fill&w=500&h=500&q=90`" :key="i" alt="">
   <img v-lazy />
  </div>
</template>
<style lang="less" scoped>
.img {
  width: 300px;
  height: 300px;
}
</style>
