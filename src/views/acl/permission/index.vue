<template>
  <div>
    <el-card>
      <el-table
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :data="allMenu"
        :tree-props="{ children: 'children' }"
        v-loading="isLoading"
      >
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column prop="address" label="操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Plus"
              :disabled="row.level === 4"
              @click="addMenu(row)"
            >
              {{ row['level'] === 3 ? '添加功能' : '添加菜单' }}
            </el-button>
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              :disabled="row.level === 1"
              @click="updateMenu(row)"
            >
              编辑
            </el-button>

            <el-popconfirm
              :title="`确定删除${row.name}？`"
              @confirm="deleteMenu(row)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                  :disabled="row.level === 1"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :align-center="true"
    >
      <template #default>
        <el-form label-width="80px">
          <el-form-item label="名称：">
            <el-input
              placeholder="输入名称"
              v-model="menuParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限值：">
            <el-input
              placeholder="输入权限值"
              v-model="menuParams.code"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqALlMenu, reqDeleteMenu, reqNewORUpdateMenu } from '@/api/acl/menu'
import { MenuData, MenuParams } from '@/api/acl/menu/type.ts'
import { ElMessage } from 'element-plus'

let allMenu = ref<MenuData[]>([])
let dialogVisible = ref<boolean>(false)
let menuParams = ref<MenuParams>({
  code: '',
  id: undefined,
  level: 0,
  name: '',
  pid: 0,
})
let isLoading = ref<boolean>(true)
const initAllMenu = async () => {
  let result = await reqALlMenu()
  if (result.code === 200) {
    allMenu.value = result.data
    isLoading.value = false
  }
}
onMounted(() => {
  initAllMenu()
})
// 新增菜单
const addMenu = (row: any) => {
  //4级时添加按钮禁用了，无需判断4级时的情况
  dialogVisible.value = true
  menuParams.value.pid = row.id
  menuParams.value.level = row.level + 1
}
// 编辑菜单
const updateMenu = (row: MenuParams) => {
  dialogVisible.value = true
  menuParams.value.id = row.id
  menuParams.value.pid = row.pid
  menuParams.value.level = row.level
  menuParams.value.code = row.code
  menuParams.value.name = row.name
}
// 对话框确定按钮
const handleConfirm = async () => {
  let result = await reqNewORUpdateMenu(menuParams.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: menuParams.value.id ? '修改成功' : '新增成功',
    })
    dialogVisible.value = false
    Object.assign(menuParams.value, {
      code: '',
      id: undefined,
      level: 0,
      name: '',
      pid: 0,
    })
    await initAllMenu()
  }
}
const handleCancel = () => {
  Object.assign(menuParams.value, {
    code: '',
    id: undefined,
    level: 0,
    name: '',
    pid: 0,
  })
  dialogVisible.value = false
}
const deleteMenu = async (row: any) => {
  let result = await reqDeleteMenu(row.id as number)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: `删除${row.name}成功`,
    })
    await initAllMenu()
  }
}
</script>

<style scoped></style>
