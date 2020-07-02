<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ msg }}</h2>
  </div>
</template>
<script>
export default {
  name: 'about',
  data () {
    return {
      msg: '信息'
    }
  }
}
</script>
<style>
</style>
