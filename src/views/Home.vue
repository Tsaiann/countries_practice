<template>
  <div class="home">
    <div class="container">
      <div class="row horizontal">
        <el-pagination
          layout="prev, pager, next"
          :total="250"
          :page-size="25"
          :current-page="dddd">
        </el-pagination>
      </div>
      <div class="row horizontal wrap stretch " data-row-count="5">
        <div v-for= "(item, i) in getResponse" :key="i" class="data_row">
          <div class="row vertical country_items">
            <span class="title">{{item.name}}</span>
            <div data-space-vertical="0.5rem">
              <span class="tags">{{ item.alpha2Code }}</span>
              <span class="tags">{{ item.alpha3Code }}</span>
            </div>
            <div class="row vertical inf">
              <span>{{ item.nativeName }}</span>
              <span>{{ item.altSpellings ? item.altSpellings.join(', ') : '' }}</span>
              <span>{{ item.callingCodes ? item.callingCodes.join(', ') : '' }}</span>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        title="詳細資料"
        :visible.sync="showDialog"
        width="40%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  date(){
    return{
      result: [],
      showDialog:false,
    }
  },
  computed:{
    ...mapGetters(['getResponse'])
  },
  methods:{
    ...mapActions(['GET_API']),
    ...mapMutations([]),

    async callApi(){
      await this.GET_API()
      this.result= [...this.getResponse]
      console.log('callApi:', this.result)
    }
  },
  created(){
    this.callApi()
  }
}
</script>
