<template>
  <h1 style="margin: 20px 0">{{ id ? "编辑" : "新建" }}分类</h1>
  <el-form
    :model="formData"
    :rules="rules"
    label-width="80px"
    style="width: 300px"
  >
    <el-form-item prop="tagName" label="分类名称">
      <el-input v-model="formData.name" v-focus></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="save"
        >保存</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent, ref, toRaw } from "vue";
import { useRouter } from 'vue-router'
import request from "./../../utils/request";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "CategoryCreate",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const formData = ref({
      name: "",
    });
    const loading = ref(false);
    const rules = ref();
    const checkTagName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("分类名称不能为空"));
      } else {
        callback();
      }
    };
    const { push } = useRouter() //成功跳转到list页面
    const save = async () => {
      if (formData.value.name === "") return;
      loading.value = true;

      try {
        let res;
        if (id) {//编辑分类请求
          res = await request.put(`/common/categories/${id}`, formData.value);
        } else {
          res = await request.post("/common/categories", formData.value);
        }

        if (res.data.status === "-1") {
          ElMessage.warning({
            message: res.data.message,
            type: "warning",
          });
        } else if (res.data.status === "1") {
          ElMessage.success({
            message: res.data.message,
            type: "success",
          });
          push('/categories/list')
        }
      } catch(e) {
        console.log(e)
      } finally {
        loading.value = false;
      }
    };

    const { id = "" } = toRaw(props); //编辑分类逻辑
    const getCategory = async () => {
      //编辑分类逻辑
      const res = await request.get(`/common/categories/${id}`);
      formData.value.name = res.data.data.name;
    };
    //编辑分类时执行
    id && getCategory();

    rules.value = {
      name: [{ validator: checkTagName, trigger: "blur" }],
    };

    return {
      formData,
      rules,
      save,
      loading,
    };
  },
  directives: {
    focus: {
      mounted(el) {
        el.getElementsByTagName("input")[0].focus();
      },
    },
  },
});
</script>
