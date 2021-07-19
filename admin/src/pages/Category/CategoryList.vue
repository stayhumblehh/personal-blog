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
  <el-pagination
      :hide-on-single-page="visible"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 2, 3, 4, 5]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
  </el-pagination>
</template>
<script>
import { defineComponent, ref, computed } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import request from './../../utils/request'


export default defineComponent({
    name: 'CategoryList',
    setup() {
        const tableData = ref([])
        const { push }  = useRouter()
        //pagination
        const page = ref(1)
        const limit = ref(10)
        const total = ref(0)

        const getList = async () => {
            const res =  await request.get(`/common/categories?page=${page.value}&limit=${limit.value}`)
            tableData.value = res.data.data
            total.value = res.data.count
        }
        const handleEdit = (idx, val) => {
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
        const handleSizeChange = async (val) => {
           limit.value = val
           await getList()
        }
        const handleCurrentChange = async (val) => {
            page.value = val
            await getList()
        }
        const visible = computed(() => (limit.value >= total.value) )
        getList()
        
        return {
            tableData,
            handleEdit,
            handleDelete,
            page,
            limit,
            total,
            visible,
            handleSizeChange,
            handleCurrentChange
        }
    },
})
</script>
