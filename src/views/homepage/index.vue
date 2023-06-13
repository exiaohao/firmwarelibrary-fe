<template>
  <div id="container">
    <el-row>
      <el-col :span="24">
        <div id="query-box" class="grid-content">
          <el-autocomplete v-model="querymodel" :fetch-suggestions="querySearchAsync" :trigger-on-focus="false"
            placeholder="输入关键词/型号进行查询" @select="handleSelect" style="width:50%; margin: 20px 0;">
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
      <el-table-column prop="ManufacturerDisplayName" label="厂家" width="180" />
      <el-table-column prop="ModelDisplayName" label="型号" width="180" />
      <el-table-column prop="Version" label="版本" width="180" />
      <el-table-column prop="FileExtraJson.size" label="文件大小" width="180" />
      <el-table-column prop="Action" label="操作">
        <template #default="scope">
          <el-popover placement="top-start" :width="350" trigger="hover" :content="`MD5:` + scope.row.FileExtraJson.hash">
            <template #reference>
              <el-button link type="primary" size="small">校验信息</el-button>
            </template>
          </el-popover>
          <el-button @click="downloadFile(scope.row)" link type="primary" size="small">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Edit } from '@element-plus/icons-vue'
import { firmwareQueryByKeyword, firmwareQueryByModelID, createDownloadLink } from '@/api/public'
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
      firmwareQueryByKeyword({ query: queryString }).then(res => {
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
    },
    downloadFile(idx) {
      window.open(`/api/download/firmware/` + idx.ID)
    },
    formatFileSize(bytes, decimalPoint=2) {
      console.log(bytes)
      if (bytes == 0) return '0 Bytes';
      var k = 1000,
        dm = decimalPoint || 2,
        sizes = ['B', 'KB', 'MB', 'GB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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