<template>
  <nav class="navbar navbar-expand navigation-clean fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">G͓̽C͓̽E͓̽ ͓̽R͓̽e͓̽s͓̽u͓̽l͓̽t͓̽s͓͎̽</router-link>
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
nav{
  background: #b4c4cc;
}
</style>