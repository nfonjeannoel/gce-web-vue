<script setup>
import {RouterView} from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from "./components/Footer.vue";
import {ref} from "vue";

let showHelp = ref(false)
const toggleHelp = () => {
  showHelp.value = !showHelp.value
}
</script>

<template>
  <Navbar @toggleHelp="toggleHelp"/>
  <Transition name="slide-fade">
    <section v-show="showHelp" class="bg-light pb-3">
      <h1 class="text-center text-success" style="padding-top: 15px;padding-bottom: 15px;color: #1b6ce5!important;">
        FAQ</h1>
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div style="overflow: auto;">
              <div id="faqlist" class="accordion accordion-flush">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="btn accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#content-accordion-1">How can I check my GCE results?
                    </button>
                  </h2>
                  <div id="content-accordion-1" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                    <p class="accordion-body"> The best option is to search for one of your names on the GCE results
                      site.
                      If you know the center number, then this should be your second choice.</p>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="btn accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#content-accordion-2">Can I trust the results displayed on the GCE results
                      app
                      100%?
                    </button>
                  </h2>
                  <div id="content-accordion-2" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                    <p class="accordion-body">The results are mostly correct, but in rare cases, there might be errors,
                      so the results should not be trusted 100%.</p>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="btn accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#content-accordion-3">What should I do if I can't find my result on the GCE
                      results app?
                    </button>
                  </h2>
                  <div id="content-accordion-3" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                    <p class="accordion-body">If you can't find your result, maybe you misspelled something or added or
                      removed a special symbol from your name. If you still can't find, then you should consult with the
                      school you wrote at</p>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="btn accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#content-accordion-4">Do the center names, student names, and center number
                      need to be the same as registered during the GCE?
                    </button>
                  </h2>
                  <div id="content-accordion-4" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                    <p class="accordion-body">Yes, the center names, student names, and center number should be the same
                      as registered during the GCE.</p>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="btn accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#content-accordion-5">Is the GCE results app an official project of the GCE
                      board?
                    </button>
                  </h2>
                  <div id="content-accordion-5" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                    <p class="accordion-body">No, the GCE results app is not related to the GCE board or any official
                      project. It is just a side project created by an individual who does not work with the GCE
                      board. See about us page</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Transition>

  <RouterView @toggleHelp="toggleHelp"/>
  <Footer/>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
