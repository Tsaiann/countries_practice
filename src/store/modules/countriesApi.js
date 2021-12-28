import api from '@/service/api'

const countriesModule = {
  state: {
    res: [],
    result:[],
    currentPage:1,
    total:0,
    search:'',
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
    },
    getSearch(state){
      return state.search
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
      console.log('mutations SET_PAGINATION:', payload )
    },
    SET_SEARCH(state, payload){
      state.search = payload
      console.log('mutations SET_SEARCH:', payload)
    },
    SET_SORT(state,payload){
      state.result.sort(() => { return payload })
    }
  },

  actions: {
    async GET_API(context, payload){
      let apiUrl = context.state.search !== '' ?`https://restcountries.com/v2/name/${context.state.search}` : 'https://restcountries.com/v2/all'
      const res= await api.get(apiUrl)
      payload = res
      const currentData ={
        currentPage :1,
        total:res.length
      }
      context.commit('SET_RES', payload)
      context.commit('SET_RESULT', payload)
      context.commit('SET_PAGINATION', currentData)
      context.commit('SET_SEARCH', '')
      console.log( 'action GET_API:', context )
    }
  }
}

export default countriesModule