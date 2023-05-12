<template>

  <div class="col-md-8 table-responsive results text-center min-vw-70" style="z-index: 20">
    <table class="table table-bordered ">
      <tbody>
      <tr>
        <td class="table-primary py-3 font-weight-bold" colspan="2">{{ result.student_name }}</td>
      </tr>
      <tr>
        <td>Canter Name</td>
        <td>{{ result.center_name }}</td>
      </tr>
      <tr>
        <td>Canter No.</td>
        <td>{{ result.center_number }}</td>
      </tr>
      <tr>
        <td>Level</td>
        <td>{{ getCenterName }}</td>
      </tr>
      <tr>
        <td>Papers Passed</td>
        <td>{{ result.papers_passed }}</td>
      </tr>
      <tr>
        <td>Grades</td>
        <td>{{ result.student_grades }}</td>
      </tr>

      </tbody>

    </table>
    <button class="btn btn-outline-primary mb-3 btn-close btn-lg" @click="closeDetails"></button>

  </div>

</template>

<script setup>
import {computed} from "vue";

const props = defineProps(['result'])
const emit = defineEmits(['close'])

const closeDetails = () => {
  emit('close')
}

let getCenterName = computed(() => {
  switch (props.result.level) {
    case 'ALG':
      return 'Advanced Level General'
    case 'ALT':
      return 'Advanced Level Technical'
    case 'OLG':
      return 'Ordinary Level General'
    case 'OLT':
      return 'Ordinary Level Technical'

    default:
      return props.result.level

  }
})

</script>

<style scoped>
.results {
  background: #E6F7FF;

}
</style>