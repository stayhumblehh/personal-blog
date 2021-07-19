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
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default {
  name: "ArticleList",
  setup() {
    const tableData = ref()
    const { push } = useRouter()
    const getList = async () => {
        const res = await request.get('/common/articles')
        
        tableData.value = res.data.data        
    }
    const handleEdit = (idx, val) => {
        push(`/articles/edit/${val}`)
    }
    const handleDelete = (idx, id) => {
        ElMessageBox.confirm('此操作将删除该文章，是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then( async () => {
            try {
                await request.delete(`/common/articles/${id}`)
            } finally {
                ElMessage({
                    type: 'success',
                    message: '删除成功！'
                })
                getList()
            }
        })
        .catch( () => {
            ElMessage({
                type: 'info',
                message: '已取消删除'
            })
        })   
    }
    getList()
    return {
        tableData,
        handleEdit,
        handleDelete
    }
  }
}
</script>