<template>
  <Transition>
    <div class="overlay" v-if="showPopup">
      <ResultsDetails :result="details" @close="showPopup = false"/>
    </div>
  </Transition>
  <div class="container">
    <div class="form-group py-md-3 py-1 row justify-content-center">
      <div class="col-lg-6">
        <div class="input-group">
          <button @click="router.back()" type="button" class="btn btn-outline-secondary"><i class="fa fa-backward"></i>
            Go back
          </button>
          <input type="text" v-model="searchText" class="search form-control" @input="updateSearchText"
                 placeholder="Search name, school, center number ...">
          <button type="button" class="btn btn-outline-secondary">filters</button>
          <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#" @click.prevent="sortByNames">Sort Names</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="sortByPapers">Sort Papers</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="sortBySchool">Sort School</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" href="#" @click.prevent="clearFilters">Clear Filters</a></li>
          </ul>

        </div>

      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-bordered results">
        <thead class="text-nowrap">
        <tr>
          <th>#</th>
          <th class="col-md-5 col-xs-5">Name</th>
          <th class="col-md-4 col-xs-4">Papers Passed</th>
          <th class="col-md-3 col-xs-3">Grades</th>
        </tr>
        <tr class="warning no-result text-center" v-if="noResults">
          <td colspan="4"><i class="fa fa-warning"></i> No results match your query. <a @click="toggleHelp" href="#">Need
            help?</a></td>
        </tr>
        </thead>
        <tbody class="text-nowrap">
        <tr v-for="(result, index) in results" :key="result.record_id"
            @click="handlePopup(result)">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ result.student_name }}</td>
          <td>{{ result.papers_passed }}</td>
          <td>{{ result.student_grades }}</td>
          <td hidden> {{ result.center_name }}</td>
          <td hidden> {{ result.center_number }}</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import {useResultsStore} from "@/stores/ResultsStore";
import {computed, onBeforeMount, reactive, ref, watch, defineAsyncComponent} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const ResultsDetails = defineAsyncComponent(() => import('../components/ResultDetails.vue'))
const resultsStore = useResultsStore()
const results = ref(null)
let searchText = ref('')
let showPopup = ref(false)
let details = ref(null)

// onBeforeMount(() => {
//   console.log('results store')
//   console.log(resultsStore.results)
//   if (!resultsStore.results) {
//     //  navigate to the home page
//     router.push('/')
//   }
// })

const emit = defineEmits(['toggleHelp'])

onBeforeMount(() => {
  results.value = resultsStore.results
})

let filters = reactive({
  searchText: '',
  sortBy: ''
})

function handlePopup(result) {
  showPopup.value = true
  details.value = result
}

const toggleHelp = () => {
  emit('toggleHelp')
}


function sortByNames() {
  filters.sortBy = 'name';
}

function sortBySchool() {
  filters.sortBy = 'school'
}

function sortByPapers() {
  filters.sortBy = 'papers';
}

function clearFilters() {
  filters.sortBy = 'name';
  filters.searchText = '';
}

function updateSearchText(event) {
  filters.searchText = event.target.value;
}

let noResults = computed(() => {
  return results.value.length === 0
})

watch([() => {
  return {...filters}
}], () => {
  // console.log('filters changed')
  // console.log(filters)
  let filteredResults = resultsStore.results
  // console.log("filteredResults")
  // console.log(filteredResults)

  // Filter the results based on the search text
  if (filters.searchText) {
    filteredResults = filteredResults.filter(result => {
      return result.student_name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
          result.center_name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
          result.center_number.toLowerCase().includes(filters.searchText.toLowerCase())
    })
  }

  // Sort the filtered results based on the sort order
  if (filters.sortBy === 'name') {
    // console.log('sorting by name')
    // console.log(filteredResults)
    filteredResults.sort((a, b) => a.student_name.localeCompare(b.student_name))
  } else if (filters.sortBy === 'papers') {
    // console.log('sorting by points')
    // console.log(filteredResults)

    filteredResults.sort(function (a, b) {
      return Number(b.papers_passed) - Number(a.papers_passed)
    })

    // console.log('sorted by points')
    // console.log(filteredResults)
  } else if (filters.sortBy === 'school') {
    // console.log('sorting by school')
    // console.log(filteredResults)

    filteredResults.sort((a, b) => a.center_name.localeCompare(b.center_name))

    // console.log('sorted by school')
    // console.log(filteredResults)
  }

  // Return the filtered and sorted results
  results.value = filteredResults

}, {immediate: true})

</script>

<style scoped>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  min-width: 50%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}


.modal > div {
  background: #fff;
  border-radius: 10px;
  padding: 50px;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>