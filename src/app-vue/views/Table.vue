<template>
  <div style="padding: 24px 20px 48px 20px">
    <el-row>
      <el-col :span="24">
        <el-card shadow="always" title="title">
          <el-table :data="dataSource" border style="width: 100%; margin: 0 auto">
            <el-table-column prop="label1" label="一级标签" width="249" fixed="left"/> 
            <el-table-column prop="label2" label="一级标签" width="249" fixed="left"/> 
            <el-table-column 
              v-for="item in itemSet"
              :key="item.value"
              :prop="item.value"
              :label="item.name"
              width="120"
            /> 
            <el-table-column prop="num1" label="num1" width="100" fixed="right"/> 
            <el-table-column prop="num2" label="num2" width="100" fixed="right"/> 
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { labelDataSource, labelLevelTwoDataSource} from './tableData'
export default {
  name: 'Table',
  methods: {
    createDataSource(){
      let tempDateSource = [];
      for(let i = 0; i < labelDataSource.length; i++){
        tempDateSource.push({
          label1:labelDataSource[i].label,
          label2:labelLevelTwoDataSource[i].label,
          c1:'c1',
          c2:'c2',
          num:i,
          num2:'num2'
        })
      }
      this.dataSource = tempDateSource;
      return true;
    },
    createItemSet(){
      let tempArray = [];
      let tempId = [];
      for(let i = 1; i <= 20; i++){
        tempArray.push({value:'c'+i,name:'item'+i});
        tempId.push("c"+i)
      }
      this.itemSet = tempArray;
      this.itemAllSet = tempArray;
      this.checkedItem = tempId;
      return true;
    },
    onSubmit(){

    },
  },
  created(){
    this.createItemSet();
  },
  mounted(){
    this.createDataSource();
  },
  data(){
    return {
      dataSource:[],
      itemSet:[],
      itemAllSet: [],
      checkedItem: [],
      formBox:{
        id:'',
        date: '',
      }
    }
  }
}
</script>