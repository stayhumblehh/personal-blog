<template>
  <h1>分类列表</h1>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="id" prop="_id"> </el-table-column>
    <el-table-column label="标签名" prop="name"> </el-table-column>
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
import { defineComponent, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import request from './../../utils/request'


export default defineComponent({
    name: 'CategoryList',
    setup() {
        const tableData = ref([])
        const { push }  = useRouter()
        const getList = async () => {
            const res =  await request.get('/common/categories')
            tableData.value = res.data.data
        }
        const handleEdit = (idx, val) => {
            console.log('edit')
            console.log(`idx: ${idx}`)
            console.log(`val: ${val}`)
            push(`/categories/edit/${val}`)
        }
        const handleDelete = (idx, id) => {
            ElMessageBox.confirm('此操作将删除该分类，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then( async () => {
                try {
                    await request.delete(`/common/categories/${id}`)
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
    },
})
</script>
