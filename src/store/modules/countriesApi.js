import api from '@/service/api'

const countriesModule = {
  state: {
    res: []
  },

  getters: {
    getResponse(state){
      return state.res
    }
  },

  mutations: {
    SET_RES(state, payload){
      state.res = payload
      console.log('mutations SET_RES:', state.res)
    }
  },

  actions: {
    async GET_API(context, payload){
      const apiUrl ="https://restcountries.com/v2/all"
      const res= await api.get(apiUrl)
      payload = res
      context.commit('SET_RES', payload)
      console.log( 'action:', res )
    }
  }
}

export default countriesModule