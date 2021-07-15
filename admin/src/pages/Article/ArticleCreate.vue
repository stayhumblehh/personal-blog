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
            <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { quillEditor } from 'vue3-quill'
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
    setup() {
        const options = ref()
        const formData = reactive({
            title: '',
            categories: [],
            body: ''
        })
        const save = () => {
            request.post('/common/articles', formData)
        }
        const getCategories = async () => {
            const res = await request.get('/common/categories?count=all')
            options.value = res.data.data
        }

        getCategories()
        return {
            options,
            formData,
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