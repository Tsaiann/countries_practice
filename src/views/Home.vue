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
          <el-form>
            <el-form-item label="Name:"></el-form-item>
            <el-form-item label="Top level domain:"></el-form-item>
            <el-form-item label="Alpha 2 code:"></el-form-item>
            <el-form-item label="Alpha 3 code:"></el-form-item>
            <el-form-item label="Calling codes:"></el-form-item>
            <el-form-item label="Capital:"></el-form-item>
            <el-form-item label="Alt Spellings:"></el-form-item>
            <el-form-item label="Sub region:"></el-form-item>
            <el-form-item label="Population:"></el-form-item>
            <el-form-item label="LatLng:"></el-form-item>
            <el-form-item label="Demonym:"></el-form-item>
            <el-form-item label="Area:"></el-form-item>
            <el-form-item label="Time zones:"></el-form-item>
            <el-form-item label="Borders:"></el-form-item>
            <el-form-item label="Native name:"></el-form-item>
            <el-form-item label="Numeric code:"></el-form-item>
            <el-form-item label="Currencies:"></el-form-item>
            <el-form-item label="Languages:"></el-form-item>
            <el-form-item label="Translations:"></el-form-item>
            <el-form-item label="Flag:"></el-form-item>
            <el-form-item label="Cioc:"></el-form-item>
          </el-form>
        </div>
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
      showDialog:true,
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
    },
  },
  created(){
    this.callApi()
  }
}
</script>
