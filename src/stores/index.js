import { defineStore } from 'pinia'

export const useAssessmentStore = defineStore('assessment', {
  state: () => ({
    clientId: null,
    clientData: null,
    answers: {},
    results: null
  }),
  actions: {
    setClientData(data) {
      this.clientData = data
    },
    saveAnswer(questionId, value) {
      this.answers[questionId] = value
    },
    setResults(results) {
      this.results = results
    }
  }
})
