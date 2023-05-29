<template>
  <div id="container">
    <el-row>
      <el-col :span="24">
        <div id="query-box" class="grid-content">
          <el-autocomplete
            v-model="querymodel"
            :fetch-suggestions="querySearchAsync"
            :trigger-on-focus="false"
            placeholder="输入关键词/型号进行查询"
            @select="handleSelect"
            style="width:80%; margin: 20px 0;"
          >
          <template #default="{ item }">
            <div class="choices">
              <span class="manufacturer">{{ item.DisplayManufacturerName }}</span>
              <p>
                <span class="model">{{ item.DisplayName }}</span>
                <span class="count">({{ item.Count }}个固件)</span>
              </p>
            </div>
          </template>
          </el-autocomplete>
        </div>
      </el-col>
    </el-row>
    <el-table 
      :data="tableData" 
      v-loading="isTableLoading"
      style="width: 100%"
    >
      <el-table-column prop="Manufacturer" label="厂家" width="180" />
      <el-table-column prop="Model" label="型号" width="180" />
      <el-table-column prop="Version" label="版本" width="180" />
      <el-table-column prop="Action" label="操作" />
    </el-table>
  </div>
</template>

<script>
import { Edit } from '@element-plus/icons-vue'
import { firmwareQueryByKeyword, firmwareQueryByModelID } from '@/api/public'
export default {
  name: "index",
  data() {
    return {
      querymodel: undefined,
      suggestions: null,
      tableData: [],
      isTableLoading: false
    }
  },
  created() {
    this.isTableLoading = false;
  },
  methods: {
    querySearchAsync(queryString, cb) {
      firmwareQueryByKeyword({query: queryString}).then(res => {
        cb(res)
      })
    },
    createFilter: (queryString) => {
      return (o) => {
        return (o.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.querymodel = item.model
      this.isTableLoading = true
      firmwareQueryByModelID(item.Model).then(res => {
        this.tableData = res
        this.isTableLoading = false
      })
    }
  }
}
</script>

<style scoped>
#query-box {
  margin: 15px 0;
}
.choices {
  margin: 2px 0;
}
.choices .manufacturer {
  color: #409EFF;
  font-weight: bold;
  font-size: 0.7em;
  padding: 0;
  margin: 0;
  line-height: 5px;
}
.choices .model {
  display: inline-block;
  color: #606266;
  padding-top: 0;
}
.choices .count {
  display: inline-block;
  color: #ccc;
  float: right;
}
</style>