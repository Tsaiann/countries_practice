<template>
  <div class="container">
    <div class="row horizontal v_center seach_input">
      <span>Country: </span>
      <el-input v-model="search" placeholder="請輸入關鍵字"></el-input>
      <el-button type="primary" @click="handleSearch">Search</el-button>
    </div>
      <div class="row horizontal space_between">
        <el-pagination
          layout="total, prev, pager, next"
          :total="getPagination.total"
          :page-size="25"
          :current-page="getPagination.currentPage"
          @current-change="handleCurrentChange"
          >
        </el-pagination>
        <div class="sort" @click="handleSort(-1)">Sort: a-z</div>
      </div>
      <div class="row horizontal wrap stretch " data-row-count="5">
        <div v-for="(item, i) in result" :key="i" class="data_row">
          <div class="row vertical country_items">
            <span class="title" @click="openDialog(item)">{{item.name}}</span>
            <div class="row horizontal">
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
        :title="formData.name"
        :visible.sync="showDialog"
        width="40%"
        class="el_dialog_change">
        <div class="row horizontal">
          <span class="tags">{{formData.alpha2Code}}</span>
          <span class="tags">{{formData.alpha3Code}}</span>
        </div>
        <div class= "dialogForm">
          <el-form ref="form">
            <el-form-item label="Name:">{{formData.name}}</el-form-item>
            <el-form-item label="Top level domain:">{{formData.topLevelDomain? formData.topLevelDomain.join(', ') : ''}}</el-form-item>
            <el-form-item label="Alpha 2 code:">{{formData.alpha2Code}}</el-form-item>
            <el-form-item label="Alpha 3 code:">{{formData.alpha3Code}}</el-form-item>
            <el-form-item label="Calling codes:">{{formData.callingCodes? formData.callingCodes.join(', ') : ''}}</el-form-item>
            <el-form-item label="Capital:">{{formData.capital}}</el-form-item>
            <el-form-item label="Alt Spellings:">{{formData.altSpellings? formData.altSpellings.join(', ') : ''}}</el-form-item>
            <el-form-item label="Region:">{{formData.region}}</el-form-item>
            <el-form-item label="Sub region:">{{formData.subregion}}</el-form-item>
            <el-form-item label="Population:">{{formData.population}}</el-form-item>
            <el-form-item label="LatLng:">{{formData.latlng? formData.latlng.join(', ') : ''}}</el-form-item>
            <el-form-item label="Demonym:">{{formData.demonym}}</el-form-item>
            <el-form-item label="Area:">{{formData.area}}</el-form-item>
            <el-form-item label="Time zones:">{{formData.timezones? formData.timezones.join(', ') : ''}}</el-form-item>
            <el-form-item label="Borders:">{{formData.borders? formData.borders.join(', ') : ''}}</el-form-item>
            <el-form-item label="Native name:">{{formData.nativeName}}</el-form-item>
            <el-form-item label="Numeric code:">{{formData.numericCode}}</el-form-item>
            <el-form-item label="Currencies:">
              <div v-for="(item, i) in formData.currencies" :key="i">{{`${item.name}(Code:${item.code}, ${item.symbol})`}}</div>
            </el-form-item>
            <el-form-item label="Languages:">
              <div v-for="(item, i) in formData.languages" :key="i">{{`${item.name}(Native name:${item.nativeName},ISO 639:${item.iso639_1}, ${item.iso639_2})`}}</div>
            </el-form-item>
            <el-form-item label="Translations:">
              <div v-for="(item, i) in formData.translations" :key="i">{{`${item}(${i})`}}</div>
              </el-form-item>
            <el-form-item label="Flag:">
              <img :src="formData.flag" alt="img" width="60px">
            </el-form-item>
            <el-form-item label="Cioc:">{{formData.cioc}}</el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">關閉</el-button>
        </span>
      </el-dialog>
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
      search:''
    }
  },

  computed:{
    ...mapGetters(['getResponse','getPagination','getResult'])
  },

  methods:{
    ...mapActions(['GET_API']),
    ...mapMutations([
      'SET_PAGINATION',
      'SET_RESULT',
      'SET_SEARCH',
      'SET_SORT'
      ]),

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
    },
    //點擊時用關鍵字搜尋連上新的api資料
    async handleSearch(){
      await this.SET_SEARCH(this.search)
      await this.GET_API()
      this.result =[...this.getResult[this.getPagination.currentPage -1]]
    },
    closeDialog(){
      this.showDialog = false
    },
    //按照字母排列
    handleSort(val){
      //https://ithelp.ithome.com.tw/articles/10225733 正數與負數排列
      this.SET_SORT(val)
      this.result=[...this.getResult[this.getPagination.currentPage -1]]
    }
  },
  created() {
    this.callApi()
  }
}
</script>
