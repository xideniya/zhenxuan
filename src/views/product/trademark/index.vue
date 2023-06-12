<template>
  <el-card class="box-card">
    <el-button type="primary" icon="Plus" @click="addTrademark">
      添加品牌
    </el-button>
    <!--    对话框组件-->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
      <el-form
        :model="tradeMarkParams"
        style="width: 80%"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            v-model="tradeMarkParams.tmName"
            autocomplete="off"
            placeholder="请输入品牌名称"
          />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="tradeMarkParams.logoUrl"
              :src="tradeMarkParams.logoUrl"
              class="avatar"
              :alt="tradeMarkParams.tmName"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!--      对话框底部-->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--    表格区域-->
    <el-table style="margin: 10px 0" border :data="hasTrademark">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌logo" prop="logoUrl">
        <template #default="{ row }">
          <img
            :src="row.logoUrl"
            :alt="row.tmName"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row, $index }">
          <!--          编辑按钮-->
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="editTrademark(row)"
          ></el-button>
          <!--          删除按钮-->
          <el-popconfirm
            width="200px"
            :title="`确定要删除${row.tmName}？`"
            confirm-button-text="是"
            cancel-button-text="否"
            @confirm="confirmEvent(row, $index)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页器-->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 10]"
      :background="true"
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  reqAddOrUpdateTrademark,
  reqHasTrademark,
  reqRemoveTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMark,
  TrademarkResponseData,
} from '@/api/product/trademark/type.ts'

// 表格数据初始获取和页码改变重新获取数据
const currentPage = ref(1)
const pageSize = ref(3)
let total = ref(0)
// ref重新赋值不丢失响应式
let hasTrademark = ref<Records>([])
// 获取对话框中表单组件实例，方便进行校验
let formRef = ref()

const getHasTrademark = async () => {
  let result: TrademarkResponseData = await reqHasTrademark(
    currentPage.value,
    pageSize.value,
  )
  if (result.code === 200) {
    hasTrademark.value = result.data.records
    // 解决数据改变el-table视图不更新问题
    total.value = result.data.total
  }
}
const handleSizeChange = () => {
  // 跳到第一页
  currentPage.value = 1
  getHasTrademark()
}
const handleCurrentChange = () => {
  getHasTrademark()
}

onMounted(() => {
  getHasTrademark()
})
// 添加品牌功能，对话弹窗
const dialogFormVisible = ref(false)
const dialogTitle = ref('')

const tradeMarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
  id: undefined,
})
// 添加品牌
const addTrademark = () => {
  dialogTitle.value = '添加品牌'
  dialogFormVisible.value = true
}
// 修改品牌
const editTrademark = (row) => {
  tradeMarkParams.tmName = row.tmName
  tradeMarkParams.logoUrl = row.logoUrl
  tradeMarkParams.id = row.id
  dialogTitle.value = '修改品牌'
  dialogFormVisible.value = true
}
// 图片上传
import { ElMessage, FormRules } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
// 图片上传后钩子
const handleAvatarSuccess = (response, uploadFile) => {
  if (response.code === 200) {
    tradeMarkParams.logoUrl = uploadFile.response.data
    // 图片校验成功，清理错误提示信息
    formRef.value.clearValidate('logoUrl')
  }
}
// 图片上传前的钩子
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/webp') {
    ElMessage.error('图片必须是JPG或者WEBP格式。')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('图片不能超过4MB。')
    return false
  }
  return true
}
// 新增和修改品牌操作
const handleConfirm = async () => {
  // 校验所有表单规则
  await formRef.value.validate()
  // 发起网络请求
  const result = await reqAddOrUpdateTrademark(tradeMarkParams)
  if (result.code === 200) {
    let message = tradeMarkParams.id ? '品牌修改成功' : '品牌添加成功'
    ElMessage.success(message)
    dialogFormVisible.value = false
    tradeMarkParams.logoUrl = ''
    tradeMarkParams.tmName = ''
    tradeMarkParams.id = undefined
    await getHasTrademark()
  } else {
    let message = tradeMarkParams.id ? '品牌修改失败' : '品牌添加失败'
    ElMessage.error(message)
  }
}
const handleCancel = () => {
  dialogFormVisible.value = false
  tradeMarkParams.logoUrl = ''
  tradeMarkParams.tmName = ''
  tradeMarkParams.id = undefined
  // 取消后清除错误提示
  formRef.value.clearValidate('logoUrl')
  formRef.value.clearValidate('tmName')
}

// 自定义校验规则
const validatorTmName = (rule, value, cb) => {
  if (value.trim().length >= 2) {
    cb()
  } else {
    cb(new Error('品牌名称需要大于等于2位'))
  }
}
const validatorLogoUrl = (rule, value, cb) => {
  if (value) {
    cb()
  } else {
    cb(new Error('需要上传图片'))
  }
}
// 表单数据校验 规则
const rules = reactive<FormRules>({
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
})
const confirmEvent = async (row, index) => {
  const result = await reqRemoveTrademark(row.id)
  if (result.code === 200) {
    if (index === 0 && hasTrademark.value.length === 1) {
      currentPage.value = currentPage.value - 1 ? currentPage.value - 1 : 1
    }
    ElMessage.success(`删除${row.tmName}成功！`)
    await getHasTrademark()
  } else {
    ElMessage.error(`删除${row.tmName}失败！`)
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
