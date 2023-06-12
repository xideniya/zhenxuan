<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="一级分类：">
        <el-select
          v-model="categoryId.category_1_id"
          class="m-2"
          placeholder="Select"
          @change="cat_1_changeHandle"
          :disabled="flag"
        >
          <el-option
            v-for="item in categoryList.category_1_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类：">
        <el-select
          v-model="categoryId.category_2_id"
          class="m-2"
          placeholder="Select"
          @change="cat_2_changeHandle"
          :disabled="flag"
        >
          <el-option
            v-for="item in categoryList.category_2_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类：">
        <el-select
          v-model="categoryId.category_3_id"
          class="m-2"
          placeholder="Select"
          :disabled="flag"
          @change="cat_3_changeHandle"
        >
          <el-option
            v-for="item in categoryList.category_3_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import {
  reqGetCategory_1,
  reqGetCategory_2,
  reqGetCategory_3,
} from '@/api/product/attr'
import { ElMessage } from 'element-plus'
import { CategoryList, CategoryResponseData } from '@/api/product/attr/type.ts'
defineProps(['flag'])
const categoryList = reactive<CategoryList>({
  category_1_list: [],
  category_2_list: [],
  category_3_list: [],
})
const categoryId = reactive({
  category_1_id: undefined,
  category_2_id: undefined,
  category_3_id: undefined,
})
const $emit = defineEmits(['categoryChange'])
// 封装一个函数，生命周期尽量不写async
const getC3 = async () => {
  let result: CategoryResponseData = await reqGetCategory_1()
  if (result.code === 200) {
    categoryList.category_1_list = result.data
  } else {
    ElMessage.error('获取一级数据失败')
  }
}
onMounted(() => {
  getC3()
})
const cat_1_changeHandle = async (val) => {
  categoryId.category_2_id = undefined
  categoryId.category_3_id = undefined
  categoryList.category_2_list = []
  categoryList.category_3_list = []
  $emit('categoryChange', categoryId)
  let result: CategoryResponseData = await reqGetCategory_2(val)
  if (result.code === 200) {
    categoryList.category_2_list = result.data
  } else {
    ElMessage.error('获取二级数据失败')
  }
}
const cat_2_changeHandle = async (val) => {
  categoryId.category_3_id = undefined
  categoryList.category_3_list = []
  $emit('categoryChange', categoryId)
  let result: CategoryResponseData = await reqGetCategory_3(val)
  if (result.code === 200) {
    categoryList.category_3_list = result.data
  } else {
    ElMessage.error('获取三级数据失败')
  }
}

const cat_3_changeHandle = () => {
  $emit('categoryChange', categoryId)
}
</script>

<style scoped></style>
