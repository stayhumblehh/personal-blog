<template>
  <div id="login">
    <el-form class="login-body">
        <el-form-item>
            <h1 class="login-title">个人博客管理后台</h1>
        </el-form-item>
        <el-form-item>
            <span class="login-label">账号：</span>
            <el-input v-model="username" placeholder="请输入登录账号" class="d-ib login-input"></el-input>
        </el-form-item>
        <el-form-item>
            <span class="login-label">密码：</span>
            <el-input type="password" placeholder="请输入登录密码" v-model="password" class="d-ib login-input"></el-input>
        </el-form-item>
        <el-form-item>
            <button class="login-btn" @click="checkAndLogin">登录 <i class="el-icon-s-promotion"></i></button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter} from 'vue-router'
import request from './../../utils/request'

export default {
    name: "Login",
    setup() {
        const formData = reactive({
            username: '',
            password: ''
        })
        const { push } = useRouter() 
        const checkAndLogin = async () => {
            if(formData.username === '') {
                ElMessage.warning({
                    message: '请输入登录账号',
                    type: 'warning'
                })
                return
            }

            if(formData.password === '') {
                ElMessage.warning({
                    message: '请输入登录密码',
                    type: 'warning'
                })
                return
            }

            try{
                const res = await request.post('/login', formData)
                
                if(res.data.status !== '1') {
                    ElMessage.error({
                        message: res.data.message,
                        type: 'error'
                    })
                } else {
                    ElMessage.success({
                        message: res.data.message,
                        type: 'success'
                    })
                    localStorage.personalBlogToken = res.data.token
                    push('/')
                }
            } catch(e) {
                console.log(`login error: ${e}`)
            }
            
        }

        return {...toRefs(formData), checkAndLogin}
    }
};
</script>

<style lang="less" scoped>
#login {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-image: url(http://qn.elleng.cn/mita_500465308_banner.jpg);
    background-size: cover;
    
    .login-title {
        color: #fff;
        padding: 30px 0;
        text-align: center;
        font-weight: 400;
    }
    .login-body{
        position: absolute;
        width: 550px;
        height: 330px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, .5);
    }
    .login-label {
        display: inline-block;
        position: relative;
        width: 100px;
        text-align: center;
        color: #005377;
        background-color: #b3c0d1;
        font-size: 16px;
        font-weight: bold;
        vertical-align: bottom;
        margin-left: 70px;
        &::after {
            content: '';
            position: absolute;
            z-index: 50;
            right: -11px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-left: 11px solid #b3c0d1;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
        }
    }
    .login-input {
        width: 260px;
    }
    .login-btn {
        display: inline-block;
        vertical-align: middle;
        background-color: #005377;
        color: #fff;
        padding: 0 18px;
        height: 40px;
        line-height: 40px;
        border: 0;
        transition: opacity .5s;
        margin-left: 380px;
        &:hover{
            opacity: .8;
        }
    }
    /deep/ .el-input__inner {
        border-radius: 0  !important;
    } 
}
.d-ib {
    display: inline-block;
}
</style>
