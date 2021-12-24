<template>
  <div class="home">
    <div class="container">
      <div class="row horizontal">
        <el-pagination
          layout="total, prev, pager, next"
          :total="getPagination.total"
          :page-size="25"
          :current-page="getPagination.currentPage"
          @current-change="handleCurrentChange"
          >
        </el-pagination>
      </div>
      <div class="row horizontal wrap stretch " data-row-count="5">
        <div v-for="(item, i) in result" :key="i" class="data_row">
          <div class="row vertical country_items">
            <span class="title" @click="openDialog(item)">{{item.name}}</span>
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
        <div>
          <el-form ref="form">
            <el-form-item label="Name:">{{formData.name}}</el-form-item>
            <el-form-item label="Top level domain:">{{formData.topLevelDomain? formData.topLevelDomain.join(', ') : ''}}</el-form-item>
            <el-form-item label="Alpha 2 code:">{{formData.alpha2Code}}</el-form-item>
            <el-form-item label="Alpha 3 code:">{{formData.alpha3Code}}</el-form-item>
            <el-form-item label="Calling codes:">{{formData.callingCodes}}</el-form-item>
            <el-form-item label="Capital:">{{formData.capital}}</el-form-item>
            <el-form-item label="Alt Spellings:">{{formData.altSpellings? formData.altSpellings.join(', ') : ''}}</el-form-item>
            <el-form-item label="Sub region:">{{formData.subRegion}}</el-form-item>
            <el-form-item label="Population:">{{formData.population}}</el-form-item>
            <el-form-item label="LatLng:">{{formData.latlng}}</el-form-item>
            <el-form-item label="Demonym:">{{formData.demonym}}</el-form-item>
            <el-form-item label="Area:">{{formData.area}}</el-form-item>
            <el-form-item label="Time zones:">{{formData.timeZones}}</el-form-item>
            <el-form-item label="Borders:">{{formData.borders}}</el-form-item>
            <el-form-item label="Native name:">{{formData.nativeName}}</el-form-item>
            <el-form-item label="Numeric code:">{{formData.numericCode}}</el-form-item>
            <el-form-item label="Currencies:">{{formData.currencies}}</el-form-item>
            <el-form-item label="Languages:">{{formData.languages}}</el-form-item>
            <el-form-item label="Translations:">{{formData.translations}}</el-form-item>
            <el-form-item label="Flag:">{{formData.flag}}</el-form-item>
            <el-form-item label="Cioc:">{{formData.cioc}}</el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">關閉</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',

  data() {
    return {
      result: [],
      showDialog: false,
      formData: {},
    }
  },

  computed:{
    ...mapGetters(['getResponse','getPagination','getResult'])
  },

  methods:{
    ...mapActions(['GET_API']),
    ...mapMutations(['SET_PAGINATION','SET_RESULT']),
    // 把資料丟進來
    async callApi(){
      await this.GET_API()
      //這裡若沒有加上getPagination資料會直接丟進10筆陣列資料
      this.result= [...this.getResult[this.getPagination.currentPage -1]]
      console.log('callApi result:', this.result)
    },
    // 打開資訊欄
    openDialog(obj){
      this.formData= JSON.parse(JSON.stringify(obj))
      this.showDialog= true
      console.log('dialog:', obj)
    },
    // 改變頁數時資料也要跟著轉變 
    handleCurrentChange(val){
      const currentData ={
        currentPage: val,
        total: this.getPagination.total
      }
      this.SET_PAGINATION(currentData)
      this.result = [...this.getResult[this.getPagination.currentPage -1]]
    }
  },
  created() {
    this.callApi()
  }
}
</script>
