<template>
  <nav class="navbar navbar-light navbar-expand bg-light navigation-clean fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">G͎C͎E͎ ͎R͎e͎s͎u͎l͎t͎s͎</router-link>
      <!--        <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1"></button>-->
      <div @click="toggleHelp" class="collapse navbar-collapse" id="navcol-1"><a
          class="btn btn-primary ms-auto" role="button" href="#"><i class="fa fa-info-circle"></i></a></div>
    </div>
  </nav>

</template>

<script setup>
const emit = defineEmits(['toggleHelp'])

const toggleHelp = () => {
  emit('toggleHelp')
}

</script>

<style scoped>

</style>