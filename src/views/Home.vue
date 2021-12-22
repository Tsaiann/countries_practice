<template>
  <div class="home">
    <div class="row horizontal space">
      <el-pagination
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  date(){

  },
  computed:{
    ...mapGetters([])
  },
  methods:{
    ...mapActions(['GET_API']),
    ...mapMutations(['SET_RES']),

    async callApi(){
      this.GET_API()
    }
  },
  created(){
    this.callApi()
  }
}
</script>
