<template>
  <div class="py-3 text-center text-white masthead d-flex align-items-center justify-content-center flex-grow-1">
    <div class="container mx-auto">

      <div class="row py-2">
        <transition name="slide-fade">
          <div v-show="errorMessage" @click="errorMessage = false"
               class="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative ">
            <div class="alert alert-danger" role="alert">
              {{ error_text }}
            </div>
          </div>
        </transition>
        <div class="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative ">
          <h1 class="mb-5 opt-title">Search for
            <select class="form-select" @change="changeTab">
              <option value="name">Student Name</option>
              <option value="number">Center number</option>
              <option value="school">Center Name</option>
            </select>
          </h1>
        </div>
        <div class="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
          <form @submit.prevent="getResults" id="search-form">
            <!--            <input type="hidden" name="opt" value="7">-->
            <div class="row">

              <div v-if="activeTab === 'name'" class="col-12  mb-4"><input class="form-control"
                                                                           required
                                                                           v-model="student_name"
                                                                           type="text"
                                                                           minlength="3"
                                                                           maxlength="50"
                                                                           id="student-name"
                                                                           name="student_name"
                                                                           placeholder="Enter a Name..."></div>
              <div v-else-if="activeTab === 'number'" class="col-12  mb-4"><input
                  class="form-control"
                  v-model="center_number"
                  required
                  maxlength="5"
                  minlength="5"
                  type="text"
                  name="center_number"
                  placeholder="Enter a Center Number..."></div>
              <div v-else class="col-12  mb-4"><input class="form-control"
                                                      required
                                                      type="text"
                                                      minlength="4"
                                                      maxlength="100"
                                                      v-model="center_name"
                                                      name="center_name"
                                                      placeholder="Enter a School Name"></div>
            </div>
            <div class="row">
              <div class="col-12 col-md-6 mb-4">

                <select name="level" id="level-options" class="form-select" required v-model="formData.level">
                  <option value="" disabled>Select a level...</option>
                  <option value="ALG">A-LEVEL GENERAL</option>
                  <option value="ALT">A-LEVEL TECHNICAL</option>
                  <option value="OLG">O-LEVEL GENERAL</option>
                  <option value="OLT">O-LEVEL TECHNICAL</option>
                </select>
              </div>

              <div class="col-12 col-md-6 mb-4 ">

                <input type="text" name="year" id="year-options" class="form-select"
                       v-model="formData.year"
                       maxlength="4"
                       minlength="4"
                       min="2019"
                       list="year-options-list"
                       required
                       placeholder="Enter a year...">
                <datalist id="year-options-list">
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                </datalist>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button v-if="loading" class="btn btn-primary text-light" type="button" disabled>
                  <span class="spinner-grow spinner-grow-sm text-light" role="status" aria-hidden="true"></span>
                </button>
                <button v-else class="btn btn-primary" type="submit"><i
                    class="fa fa-search pe-2"></i>
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import axios from "axios";
import router from "@/router";
import {useResultsStore} from "@/stores/ResultsStore";

const resultsStore = useResultsStore()


let formData = reactive({
  level: '',
  year: '',
})

let results = ref([])
let errorMessage = ref(false)
let error_text = ref('')

let student_name = ref('')
let center_name = ref('')
let center_number = ref('')

let loading = ref(false)
let activeTab = ref('name')

const changeTab = (e) => {
  activeTab.value = e.target.value
}

function getResults() {
  const formDataCopy = Object.assign({}, formData)
  loading.value = true
  if (activeTab.value === 'name') {
    formDataCopy.student_name = student_name.value
    formDataCopy.opt = "7"
    // console.log("opt name", formDataCopy)
  } else if (activeTab.value === 'number') {
    formDataCopy.center_number = center_number.value
    formDataCopy.opt = "2"
    // console.log("opt number", formDataCopy)
  } else {
    formDataCopy.center_name = center_name.value
    formDataCopy.opt = "8"
    // console.log("opt school", formDataCopy)
  }
  // if year is greater than 2022, or less than 2019, we do not yet have results for that year. display a warning
  if (formDataCopy.year > 2022 || formDataCopy.year < 2019) {
    loading.value = false
    errorMessage.value = true
    error_text.value = `Oops!! results for the year ${formDataCopy.year} are on the way. Available years: 2019-2022`
    setTimeout(() => {
      errorMessage.value = false
    }, 9000)
    return
  }
  axios
      .postForm('https://jean.tdev-hub.space/fetch-result.php', formDataCopy)
      .then((response) => {
        results.value = response.data.data

        resultsStore.setResults(results.value)
        loading.value = false
        // console.log("results", response.data)

        localStorage.setItem("searchResults", JSON.stringify(results.value));

        router.push({
          name: 'results',
        })


      })
      .catch((error) => {
        console.log(error)
        loading.value = false
        errorMessage.value = true
        error_text.value = "We encountered an error. Please try again, check your network or retry later."
        setTimeout(() => {
          errorMessage.value = false
        }, 9000)
      })


}
</script>

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

.opt-title {
  color: #333333;
}
</style>