<template>
  <footer class="bg-light px-2 px-md-5 py-2 py-md-3">
    <div class="row">
      <div class="col-lg-6 text-center text-lg-start my-auto h-100">
        <ul class="list-inline mb-2">
          <li class="list-inline-item">
            <router-link active-class="active" to="/about">About</router-link>
          </li>
          <li class="list-inline-item"><span>⋅</span></li>
          <li class="list-inline-item">
            <router-link active-class="active" to="/contact">Contact</router-link>
          </li>
          <li class="list-inline-item"><span>⋅</span></li>
          <li class="list-inline-item">
            <router-link active-class="active" to="/terms-of-use">Terms of &nbsp;Use</router-link>
          </li>
          <li class="list-inline-item"><span>⋅</span></li>
          <li class="list-inline-item">
            <router-link active-class="active" to="/privacy-policy">Privacy Policy</router-link>
          </li>
        </ul>
        <p class="text-muted small mb-4 mb-lg-0">© 2023. All Rights Reserved.</p>
      </div>
      <div class="col-lg-6 text-center text-lg-end my-auto h-100">
        <ul class="list-inline mb-0">
          <li class="list-inline-item"><a target="_blank" href="https://www.facebook.com/gceresultsapp"><i
              class="fa fa-facebook fa-2x fa-fw"></i></a></li>
          <li class="list-inline-item"><a target="_blank" href="#"><i class="fa fa-twitter fa-2x fa-fw"></i></a></li>
          <li class="list-inline-item"><a target="_blank" href="#"><i class="fa fa-instagram fa-2x fa-fw"></i></a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.active {
  color: #0d6efd;
  font-weight: bold;
}

.list-inline-item > a{
  text-decoration: none;
}

footer{
  background: #dcedf5 !important;
}

</style>