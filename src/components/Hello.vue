<template>
  <div class="hello">
    <h1 class="hello__title">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
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
