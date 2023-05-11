<template>
  <header class="text-center text-white masthead"
          style="background: radial-gradient(circle at 0.7% 1%, rgb(215, 248, 247) 0%, rgb(102, 188, 239) 100.2%)
             no-repeat center center;background-size: cover;"
  >
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
          <h1 class="mb-5">Search for
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
              <div class="col-12 col-md-6 mb-4 ">

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
              <div v-if="activeTab === 'name'" class="col-12 col-md-9 mb-4"><input class="form-control form-control-lg"
                                                                                   required
                                                                                   v-model="student_name"
                                                                                   type="text"
                                                                                   id="student-name"
                                                                                   name="student_name"
                                                                                   placeholder="Enter a Name..."></div>
              <div v-else-if="activeTab === 'number'" class="col-12 col-md-9 mb-4"><input
                  class="form-control form-control-lg"
                  v-model="center_number"
                  required
                  maxlength="5"
                  minlength="5"
                  type="text"
                  name="center_number"
                  placeholder="Enter a Center Number..."></div>
              <div v-else class="col-12 col-md-9 mb-4"><input class="form-control form-control-lg"
                                                              required
                                                              type="text"
                                                              minlength="4"
                                                              maxlength="100"
                                                              v-model="center_name"
                                                              name="center_name"
                                                              placeholder="Enter a School Name"></div>
              <div class="col-12 col-md-3">
                <button v-if="loading" class="btn btn-primary btn-lg .text-light" type="button" disabled>
                  <span class="spinner-grow spinner-grow-sm text-light" role="status" aria-hidden="true"></span>
                </button>
                <button v-else class="btn btn-primary btn-lg" type="submit"><i
                    class="fa fa-search pe-2"></i>
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import {reactive, ref} from 'vue'
import axios from "axios";

let formData = reactive({
  level: '',
  year: '',
})

let results = ref([])

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
  axios
      .postForm('/api', formDataCopy)
      .then((response) => {
        // console.log(response)
        results.value = response.data.data
        // console.log(results.value)

      })
      .catch((error) => {
        console.log(error)

      })

  loading.value = false


}


</script>
