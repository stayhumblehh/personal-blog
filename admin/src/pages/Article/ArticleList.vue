<template>
  <h1>分类列表</h1>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="id" prop="_id"> </el-table-column>
    <el-table-column label="标题" prop="title"> </el-table-column>
    <el-table-column align="right">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row._id)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row._id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { ref } from 'vue'
import request from './../../utils/request'

export default {
  name: "ArticleList",
  setup() {
    const tableData = ref()
    const getList = async () => {
        const res = await request.get('/common/articles')
        
        tableData.value = res.data.data        
    }
    getList()
    return {
        tableData
    }
  }
}
</script>