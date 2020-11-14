<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
    name: 'app',
    data() {
        return {}
    },
    mounted() {}
}
</script>

<style lang="scss">
    @import 'node_modules/bootstrap/scss/bootstrap.scss';
    @import 'node_modules/bootstrap-vue/src/index.scss';

    body {
        height: 100%;
        #app {
          height: 100%;
        }
    }
</style>