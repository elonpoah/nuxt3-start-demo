<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <div>{{ counter.name }}</div>
    <div>{{ counter.times }}</div>
    <button @click="change">改变pinia中的数据</button>
  </div>
</template>
<script lang="ts" setup>
import { userCouter } from '~/stores/counter'
const counter = userCouter()

const change = async ()=>{
  counter.increment()
  
}
</script>