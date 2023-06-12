<template>
  <div>
    <el-card>
      <!--      三级分类全局组件-->
      <Category
        @categoryChange="categoryChangeHandler"
        :flag="!flag"
      ></Category>
    </el-card>
    <el-card style="margin: 10px 0">
      <!--      静态展示属性值页面-->
      <div v-if="flag">
        <el-button
          type="primary"
          icon="Plus"
          style="margin-bottom: 10px"
          :disabled="!obj.category_3_id"
          @click="handleAdd"
        >
          添加属性
        </el-button>
        <el-table border :data="attrInfoList">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称" prop="attrValueList">
            <template #default="{ row }">
              <el-tag
                v-for="item in row['attrValueList']"
                :key="item['attrId']"
                style="margin: 0 5px 5px 0"
              >
                {{ item['valueName'] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="{ row }">
              <el-button
                size="small"
                icon="Edit"
                type="primary"
                @click="handleEdit(row)"
              ></el-button>
              <!--              删除属性按钮-->
              <el-popconfirm
                :title="`确定删除${row.attrName}?`"
                width="200px"
                @confirm="handleDeleteAttr(row)"
              >
                <template #reference>
                  <el-button
                    size="small"
                    icon="Delete"
                    type="danger"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--      修改属性值页面-->
      <div v-else>
        <el-form>
          <el-form-item label="属性名称：" style="width: 40%">
            <el-input
              placeholder="输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-row>
          <el-button
            type="primary"
            icon="Plus"
            :disabled="!attrParams.attrName"
            @click="addAttr"
          >
            添加属性值
          </el-button>
          <el-button>取消</el-button>
        </el-row>
        <el-table
          style="margin: 15px 0"
          border
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column label="属性值">
            <template #default="{ row, $index }">
              <el-input
                v-if="row.flag"
                placeholder="输入属性值名称"
                v-model="row.valueName"
                :ref="
                  (vc) => {
                    inputList[$index] = vc
                  }
                "
                @blur="handleBlur(row, $index)"
              ></el-input>
              <span v-else @click="handelChangeToInput(row, $index)">
                {{ row['valueName'] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ $index }">
              <el-button
                type="danger"
                icon="Delete"
                size="small"
                @click="handleDelete($index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-button
            type="primary"
            @click="handleSave"
            :disabled="!attrParams.attrValueList.length > 0"
          >
            保存
          </el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrEditAttr,
  reqGetAttrInfoList,
  reqRemoveAttr,
} from '@/api/product/attr'
import { Attr, CategoryId } from '@/api/product/attr/type.ts'
import { nextTick, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
let attrInfoList = ref([])
let flag = ref(true)
let obj = reactive<CategoryId>({
  category_1_id: undefined,
  category_2_id: undefined,
  category_3_id: undefined,
})
// 收集需要提交的数据
let attrParams = reactive<Attr>({
  id: undefined,
  attrName: '',
  categoryId: undefined,
  categoryLevel: 3,
  attrValueList: [],
})
// 存储input组件实例
const inputList = reactive([])
// 根据三级ID获取属性列表
const getAttrInfoList = async (categoryId) => {
  const result = await reqGetAttrInfoList(categoryId)
  if (result.code === 200) {
    attrInfoList.value = result.data
  } else {
    ElMessage.error('获取属性失败')
  }
}
// 三级分类改变时触发回调
const categoryChangeHandler = async (categoryId: CategoryId) => {
  obj = categoryId
  if (
    !(
      categoryId.category_1_id &&
      categoryId.category_2_id &&
      categoryId.category_3_id
    )
  ) {
    // 有一个id不存在就清空数据
    attrInfoList.value = []
    return undefined
  }
  await getAttrInfoList(categoryId)
}
// 修改属性
const handleEdit = (row) => {
  flag.value = false
  // 深拷贝，不能直接赋值，防止丢失响应式
  Object.assign(attrParams, cloneDeep(row))
}
// 添加属性
const handleAdd = () => {
  // 清除掉已收集的数据
  Object.assign(attrParams, {
    id: undefined,
    attrName: '',
    categoryId: undefined,
    categoryLevel: 3,
    attrValueList: [],
  })
  flag.value = false
  attrParams.categoryId = obj.category_3_id
}
const handleCancel = () => {
  flag.value = true
}
// 添加属性值
const addAttr = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制编辑模式
  })
  // 等dom结构更新完成，自动获取焦点
  nextTick(() => {
    inputList[attrParams.attrValueList.length - 1].focus()
  })
}
const handleSave = async () => {
  let result = await reqAddOrEditAttr(attrParams)
  if (result.code === 200) {
    flag.value = true
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改属性成功' : '添加属性成功',
    })
    await getAttrInfoList(obj)
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改属性失败' : '添加属性失败',
    })
  }
}
// 输入框失去焦点
const handleBlur = (row, index) => {
  // 属性值不能为空
  if (row.valueName.trim() === '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    // 删除数组中空的对象
    attrParams.attrValueList.splice(index, 1)
    return
  }
  // 属性值不能重复
  const repeat = attrParams.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    // 删除数组中空的对象
    attrParams.attrValueList.splice(index, 1)
    return
  }
  row.flag = false
}
// 静态展示切换为input框
const handelChangeToInput = (row, index) => {
  row.flag = true
  // 等dom结构更新完成，自动获取焦点
  nextTick(() => {
    inputList[index].focus()
  })
}
const handleDelete = (index) => {
  attrParams.attrValueList.splice(index, 1)
}
const handleDeleteAttr = async (row) => {
  let result = await reqRemoveAttr(row.id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: `删除属性${row.attrName}成功`,
    })
    await getAttrInfoList(obj)
  } else {
    ElMessage({
      type: 'error',
      message: `删除属性${row.attrName}失败`,
    })
  }
}
</script>

<style scoped></style>
