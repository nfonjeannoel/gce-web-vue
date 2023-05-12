import {defineStore} from 'pinia'

export const useResultsStore = defineStore('ResultsStore', {
    state: () => {
        return {
            results: null
        }
    },

    actions: {
        setResults(resultData) {
            this.results = resultData
        }
    },

    getters: {
        getResults(state) {
            return state.results
        },

    },


})