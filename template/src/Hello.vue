<template>
  <div class="hello">
    <h1 class="hello__title">{{ msg }}</h1>
    <span>Count: {{ n }}</span>
    <button @click="n++">Add</button>
    <ul>
      <li>{{n}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello World!',
      n: 0
    }
  }
}
</script>

<style>
.hello__title {
  color: #42b983;
}
</style>

<!-- <style lang="stylus"> -->
<!-- .hello { -->
<!-- &__title { -->
<!-- color: #42b983; -->
<!-- } -->
<!-- } -->
<!-- </style> -->
