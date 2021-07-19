<template>
    <h1 style="margin: 20px 0;">{{id ? '编辑' : '新建'}}文章</h1>
    <el-form v-model="formData" style="width:600px">
        <el-form-item label="标题" class="d-column">
            <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="选择分类" class="d-column">
            <el-select v-model="formData.categories" multiple placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :label="item.name"
                    :value="item._id"
                    :key="item._id"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="文章正文" class="d-column">
            <quill-editor v-model:value="formData.body" class="article-editor"></quill-editor>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :loading="loading" @click="save">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { quillEditor } from 'vue3-quill'
import { ElMessage } from 'element-plus'
// import customQuillModule  from 'customQuillModule'
// Quill.register('module/customQuillModule', customQuillModule)
import request from './../../utils/request.js'

export default defineComponent({
    name: 'ArticleCreate',
    components: {
        quillEditor
    },
    props: {
        id: {
            type: String
        }
    },
    setup(props) {
        const options = ref()
        const formData = reactive({
            title: '',
            categories: [],
            body: ''
        })
        const { push } = useRouter()
        const loading = ref(false)
        const save = async () => {
            if(formData.title === '' || formData.categories.length === 0 || formData.body === '') return
            loading.value = true

            try{
                let res 
                if(id) { //编辑文章时的接口
                    res = await request.put(`/common/articles/${id}`, formData)
                } else {
                    res = await request.post('/common/articles', formData)
                }
                
                if(res.data.status === '1') {
                    ElMessage.success({
                        message: res.data.message,
                        type: "success",
                    })
                    push('/articles/list')
                }
            } catch(e) {
                console.log(e)
            } finally {
                loading.value = false
            }
        }
        const getCategories = async () => {
            const res = await request.get('/common/categories?count=all')
            options.value = res.data.data
        }
        //编辑文章
        const getArticleDetail = async () => {
            const res = await request.get(`/common/articles/${id}`)
            
            formData.title = res.data.data.title
            formData.body = res.data.data.body
            formData.categories = res.data.data.categories.map( obj => obj._id)
        }
        const { id } = toRaw(props)
        //编辑文章时执行
        id && getArticleDetail()
        getCategories()
        return {
            options,
            formData,
            loading,
            save
        }
    },
})
</script>

<style>
.article-editor {
    min-height: 500px;
}

/* reset element-plus's style*/
.el-form-item.d-column {
    flex-direction: column;
}

.d-column .el-form-item__label {
    text-align: left;
}
</style>