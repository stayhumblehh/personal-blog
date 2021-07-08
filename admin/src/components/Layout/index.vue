
<template>
    <el-container>
        <el-aside class="aside" width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-active="$route.path" router :default-openeds="['1']">
                <el-submenu index="1">
                    <template #title>
                        <i class="el-icon-reading"></i>文章
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">文章列表</el-menu-item>
                        <el-menu-item index="1-2">写文章</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template #title>
                        <i class="el-icon-collection-tag"></i>分类
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/categories/list">分类列表</el-menu-item>
                        <el-menu-item index="/categories/create">新建分类</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template #title>
                        <i class="el-icon-setting"></i>导航三
                    </template>
                    <el-menu-item-group>
                        <template #title>分组一</template>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <template #title>选项4</template>
                        <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>查看</el-dropdown-item>
                            <el-dropdown-item>新增</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
    }
})
</script>

<style>
.el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
    height: 100vh;
}
</style>