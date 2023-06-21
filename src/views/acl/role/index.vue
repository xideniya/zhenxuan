<template>
  <div>
    <el-card>
      <el-form class="form">
        <el-form-item label="职位搜索">
          <el-input placeholder="输入职位" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 15px">
      <el-button type="primary" icon="Plus" @click="newRole">
        添加职位
      </el-button>
      <el-table border style="margin: 10px 0" :data="roleList">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          label="id"
          align="center"
          prop="id"
          width="80px"
        ></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="assignAuthority(row)"
            >
              分配权限
            </el-button>
            <el-button
              type="warning"
              icon="Edit"
              size="small"
              @click="editRole(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              width="250px"
              :title="`确定删除职位：${row.roleName}？`"
              @confirm="deleteRole(row)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页器-->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!--    新增或者修改职位对话框-->
    <el-dialog
      v-model="centerDialogVisible"
      :title="role.id ? '修改职位' : '新增职位'"
      width="30%"
      align-center
    >
      <template #default>
        <el-form :model="role" :rules="rules" ref="formVc">
          <el-form-item label="职位名称" prop="roleName">
            <el-input
              placeholder="输入职位名称"
              v-model="role.roleName"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleNewRoleCancel">取消</el-button>
          <el-button
            type="primary"
            @click="handleNewRoleConfirm"
            :disabled="!role.roleName.trim()"
          >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!--    抽屉组件-->
    <el-drawer
      v-model="drawer"
      title="分配权限"
      :with-header="true"
      show-close
      @close="handleCancel"
    >
      <template #default>
        <el-tree
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-checked-keys="treeDefault"
          :props="defaultProps"
          :default-expand-all="true"
          ref="tree"
        />
      </template>
      <template #footer>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="info" @click="handleCancel">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  reqAllPermission,
  reqDeleteRole,
  reqDoAssign,
  reqGetRoleList,
  reqNewOrUpdateRole,
} from '@/api/acl/role'
import { ElMessage, FormRules } from 'element-plus'
import { RoleData } from '@/api/acl/role/type.ts'
const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
let roleList = ref<any>([])
let keyword = ref<string>('')
let total = ref<number>(0)
let centerDialogVisible = ref<boolean>(false)
let role = ref<RoleData>({
  id: undefined,
  roleName: '',
})
let formVc = ref<any>()
let drawer = ref<boolean>(false)
const treeData = ref<any>([])
let treeDefault = ref<any>([])
let tree = ref<any>()
const handleSizeChange = () => {
  initRoleList()
}
const handleCurrentChange = () => {
  initRoleList()
}
const initRoleList = async () => {
  let result = await reqGetRoleList(
    currentPage.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code === 200) {
    roleList.value = result.data.records
    total.value = result.data.total
  }
}
const search = () => {
  initRoleList()
  keyword.value = ''
}
onMounted(() => {
  initRoleList()
})
const newRole = () => {
  centerDialogVisible.value = true
}
// 新增职位确定按钮
const handleNewRoleConfirm = async () => {
  try {
    // 通过表单验证
    await formVc.value.validate()
    let result = await reqNewOrUpdateRole(role.value)
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: role.value.id ? '修改职位成功' : '新增职位成功',
      })
      // 清除验证信息
      formVc.value.clearValidate()
      if (!role.value.id) {
        currentPage.value = 1
      }
      centerDialogVisible.value = false
      Object.assign(role.value, {
        id: undefined,
        roleName: '',
        createTime: '',
        updateTime: '',
      })
      await initRoleList()
    } else {
      ElMessage({
        type: 'error',
        message: role.value.id ? '修改职位失败' : '新增职位失败',
      })
    }
  } catch (e) {
    console.log(e)
  }
}
// 新增职位取消按钮
const handleNewRoleCancel = () => {
  // 清除验证信息
  formVc.value.clearValidate()
  Object.assign(role.value, {
    id: undefined,
    roleName: '',
    createTime: '',
    updateTime: '',
  })
  centerDialogVisible.value = false
}
//编辑角色
const editRole = (row: any) => {
  Object.assign(role.value, row)
  centerDialogVisible.value = true
}
// 删除角色
const deleteRole = async (row: any) => {
  let result = await reqDeleteRole(row.id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: `删除职位：${row.roleName}成功`,
    })
    if (roleList.value.length === 1) {
      currentPage.value = currentPage.value - 1 ? currentPage.value - 1 : 1
    }
    await initRoleList()
  }
}
const rules = reactive<FormRules>({
  roleName: [
    { required: true, message: '输入职位名', trigger: 'blur' },
    { min: 2, max: 5, message: '职位名2到5位', trigger: 'blur' },
  ],
})
//分配权限
const assignAuthority = async (row: any) => {
  drawer.value = true
  Object.assign(role.value, row)
  let result = await reqAllPermission(row.id)
  if (result.code === 200) {
    treeData.value = result.data
    filterSelected(result.data)
  }
}
const defaultProps = {
  children: 'children',
  label: 'name',
}

const filterSelected: any = (arr: any) => {
  arr.forEach((item: any) => {
    if (item.children && item.children.length >= 1) {
      filterSelected(item.children)
    }
    if (item.level === 4 && item.select === true) {
      treeDefault.value.push(item.id)
    }
  })
}
const handleCancel = () => {
  drawer.value = false
  treeDefault.value = []
  Object.assign(role.value, {
    id: undefined,
    roleName: '',
    createTime: '',
    updateTime: '',
  })
}
const save = async () => {
  let arr = tree.value.getCheckedKeys().concat(tree.value.getHalfCheckedKeys())
  let result = await reqDoAssign(role.value.id as number, arr)
  if (result.code === 200) {
    ElMessage.success('分配角色成功')
    drawer.value = false
    // 刷新页面，根据权限变化调整页面结构
    window.location.reload()
  }
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
}
.el-form-item {
  margin-bottom: 0;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
