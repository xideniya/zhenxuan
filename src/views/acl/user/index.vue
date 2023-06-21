<template>
  <div>
    <el-card style="height: 80px">
      <el-form inline class="form">
        <el-form-item label="用户名">
          <el-input
            placeholder="输入需要搜素的用户名"
            v-model="keyword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜素</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 15px 0">
      <!--      两个按钮-->
      <el-button type="primary" @click="addData">添加数据</el-button>
      <el-button type="danger" @click="deleteSome">批量删除</el-button>
      <!--      用户列表-->
      <el-table
        border
        style="margin: 15px 0"
        :data="user"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          label="#"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="用户名字" prop="username"></el-table-column>
        <el-table-column label="用户名称" prop="name"></el-table-column>
        <el-table-column label="用户角色" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作" width="300px">
          <!--            三个按钮-->
          <template #default="{ row }">
            <el-button
              type="primary"
              icon="User"
              size="small"
              @click="assignRoles(row)"
            >
              分配角色
            </el-button>
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="editUser(row)"
            >
              编辑
            </el-button>

            <el-popconfirm
              :title="`确定删除${row.username}`"
              @confirm="removeUserSingal(row)"
            >
              <template #reference>
                <el-button type="primary" icon="Delete" size="small">
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
    <!--    抽屉结构，用于更新或者新增用户-->
    <el-drawer
      @close="drawerClose"
      v-model="drawer"
      :title="userParams.id ? '修改用户信息' : '新增用户信息'"
      :with-header="true"
      :show-close="true"
    >
      <template #default>
        <el-form
          label-width="100px"
          :model="userParams"
          :rules="rules"
          ref="formRef"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              placeholder="输入用户名称"
              v-model="userParams.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input
              placeholder="输入用户昵称"
              v-model="userParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
            <el-input
              placeholder="输入用户密码"
              v-model="userParams.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
        <el-button type="info" @click="drawerCancel">取消</el-button>
      </template>
    </el-drawer>
    <!--    抽屉结构，用于分配用户的角色-->
    <el-drawer
      v-model="drawerRole"
      title="分配用户角色"
      :with-header="true"
      show-close
    >
      <template #default>
        <el-form>
          <el-form-item label="用户名称">
            <el-input disabled v-model="userParams.username"></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <!--            角色列表复选框-->
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="checkedRoles"
              @change="handleCheckedRolesChange"
            >
              <el-checkbox v-for="role in roles" :key="role.id" :label="role">
                {{ role['roleName'] }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="RoleCancellation">取消</el-button>
        <el-button type="primary" @click="RoleDetermination">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Role, User, UserParams } from '@/api/acl/user/type.ts'
import {
  reqAssignRole,
  reqNewUser,
  reqRemoveUserByID,
  reqRemoveUserGroup,
  reqRole,
  reqUser,
} from '@/api/acl/user'
import { ElMessage } from 'element-plus'
import useSettingStore from '@/store/modules/setting.ts'

let currentPage = ref(1)
let pageSize = ref(5)
let user = ref<User[]>([])
let total = ref(0)
let drawer = ref(false)
let userParams = ref<UserParams>({
  name: '',
  username: '',
  id: undefined,
  password: '',
})
let formRef = ref() //表单组件实例
let drawerRole = ref(false)
const handleSizeChange = () => {
  initUser()
}
const handleCurrentChange = () => {
  initUser()
}
const initUser = async () => {
  let result = await reqUser(currentPage.value, pageSize.value, keyword.value)
  if (result.code === 200) {
    user.value = result.data.records
    total.value = result.data.total
  }
}
onMounted(() => {
  initUser()
})
// 新增用户
const addData = async () => {
  drawer.value = true
  let result = await reqNewUser(userParams.value)
  if (result.code === 200) {
    await initUser()
  }
}
// 编辑用户
const editUser = (row: any) => {
  userParams.value.id = row.id
  userParams.value.name = row.name
  userParams.value.username = row.username
  drawer.value = true
}
// 抽屉的取消按钮
const drawerCancel = () => {
  drawer.value = false
  Object.assign(userParams.value, {
    name: '',
    username: '',
    id: undefined,
    password: '',
  })
  // 清除校验结果
  formRef.value.clearValidate()
}
// 编辑用户抽屉的确定按钮
const handleConfirm = async () => {
  // 表单校验成功后发请求
  await formRef.value.validate()
  // 更新或者新建用户
  let result = await reqNewUser(userParams.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: userParams.value.id ? '修改用户信息成功' : '新增用户成功',
    })
    drawer.value = false
    await initUser()
    // 浏览器自动刷新一次，防止自己改自己,如果没有获取用户信息，跳转到登录
    window.location.reload()
    Object.assign(userParams.value, {
      name: '',
      username: '',
      id: undefined,
      password: '',
    })
    formRef.value.clearValidate()
  } else {
    ElMessage({
      type: 'error',
      message: userParams.value.id ? '修改用户信息失败' : '新增用户失败',
    })
  }
}
const drawerClose = () => {
  drawer.value = false
  Object.assign(userParams.value, {
    name: '',
    username: '',
    id: undefined,
    password: '',
  })
  formRef.value.clearValidate()
}
// 表单校验规则
const validatorUsername = (...arg: any) => {
  if (arg[1].trim().length >= 5) {
    arg[2]()
  } else {
    arg[2](new Error('用户名字至少5位'))
  }
}
const validatorName = (...arg: any) => {
  if (arg[0].trim().length >= 5) {
    arg[2]()
  } else {
    arg[2]()(new Error('昵称至少5位'))
  }
}
const validatorPassword = (...arg: any) => {
  if (arg[0].trim().length >= 6) {
    arg[2]()
  } else {
    arg[2](new Error('密码至少6位'))
  }
}
const rules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorUsername,
    },
  ],
  name: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorName,
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorPassword,
    },
  ],
}
// 分配角色按钮
const assignRoles = async (row: UserParams) => {
  userParams.value.id = row.id
  userParams.value.name = row.name
  userParams.value.username = row.username
  drawerRole.value = true
  let result = await reqRole(row.id as number)
  if (result.code === 200) {
    roles.value = result.data.allRolesList
    checkedRoles.value = result.data.assignRoles
  }
}
// 角色复选框
const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(false)
const checkedRoles = ref<Role[]>([])
const roles = ref<Role[]>([])

const handleCheckAllChange = (val: boolean) => {
  checkedRoles.value = val ? roles.value : []
  isIndeterminate.value = false
}
const handleCheckedRolesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === roles.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < roles.value.length
}
const RoleCancellation = () => {
  drawerRole.value = false
}
// 编辑用户确认按钮
const RoleDetermination = async () => {
  const arr: number[] = checkedRoles.value.map((item) => {
    return item.id
  })
  let result = await reqAssignRole({
    roleIdList: arr,
    userId: userParams.value.id as number,
  })
  if (result.code === 200) {
    ElMessage.success('分配角色成功')
    drawerRole.value = false
    await initUser()
  } else {
    ElMessage.error('分配角色失败')
  }
}
const removeUserSingal = async (row: UserParams) => {
  let result = await reqRemoveUserByID(row.id as number)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: `删除${row.username}成功`,
    })
    if (user.value.length === 1) {
      currentPage.value = currentPage.value - 1 ? currentPage.value - 1 : 1
    }
    await initUser()
  } else {
    ElMessage({
      type: 'error',
      message: `删除${row.username}失败`,
    })
  }
}
let deleteGroup = ref([])
const handleSelectionChange = async (e: any) => {
  deleteGroup.value = e.map((item: any) => {
    return item.id
  })
}
const deleteSome = async () => {
  if (deleteGroup.value.length < 1) {
    ElMessage.error('至少选一个用户')
    return
  }
  let result = await reqRemoveUserGroup(deleteGroup.value)
  if (result.code === 200) {
    ElMessage.success('批量删除成功')
    if (user.value.length === deleteGroup.value.length) {
      currentPage.value = currentPage.value - 1 ? currentPage.value - 1 : 1
    }
    await initUser()
  }
}
// 搜素功能
let keyword = ref<string>('')
const search = () => {
  initUser()
  keyword.value = ''
}
const settingStore = useSettingStore()
// 重置按钮
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
