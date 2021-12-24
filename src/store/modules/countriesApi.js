import api from '@/service/api'

const countriesModule = {
  state: {
    res: [],
    result:[],
    currentPage:1,
    total:0,
  },

  getters: {
    getResponse(state){
      return state.res
    },
    getResult(state){
      return state.result
    },
    getPagination(state){
      const currentData = {
        currentPage: state.currentPage,
        total: state.total
      }
      return currentData
    }
  },

  mutations: {
    SET_RES(state, payload){
      state.res = payload
      console.log('mutations SET_RES:', state.res)
    },
    SET_RESULT(state, payload){
      let paginationArr =[]
      const pageCount = 25
      for(let i = 0; i < payload.length; i = i + pageCount){
        paginationArr.push(payload.slice(i, i + pageCount))
      }
      state.result =[...paginationArr]
      console.log('mutations SET_RESULT:', state.result)
    },
    SET_PAGINATION(state, payload){
      state.currentPage = payload.currentPage
      state.total = payload.total
      console.log('SET_PAGINATION:', payload )
    }
  },

  actions: {
    async GET_API(context, payload){
      const apiUrl ="https://restcountries.com/v2/all"
      const res= await api.get(apiUrl)
      payload = res
      const currentData ={
        currentPage :1,
        total:res.length
      }
      context.commit('SET_RES', payload)
      context.commit('SET_RESULT', payload)
      context.commit('SET_PAGINATION', currentData)
      console.log( 'action:', res )
    }
  }
}

export default countriesModule