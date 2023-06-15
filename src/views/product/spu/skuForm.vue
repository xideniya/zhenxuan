<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="sku名称">
        <el-input placeholder="spu名称" v-model="skuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input-number
          placeholder="spu价格"
          controls-position="right"
          v-model="skuParams.price"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="重量（g）">
        <el-input-number
          placeholder="spu重量"
          controls-position="right"
          v-model="skuParams.weight"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          placeholder="spu描述"
          type="textarea"
          v-model="skuParams.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form inline>
          <el-form-item
            :label="item.attrName"
            v-for="item in attrList"
            :key="item.id"
            style="margin-bottom: 10px"
          >
            <el-select v-model="item.inputValue">
              <el-option
                v-for="item2 in item.attrValueList"
                :key="item2.id"
                :value="item2.id"
                :label="item2.valueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline>
          <el-form-item
            :label="item.saleAttrName"
            v-for="item in saleAttrsList"
            :key="item.id"
          >
            <el-select v-model="item.inputValue">
              <el-option
                v-for="item1 in item.spuSaleAttrValueList"
                :key="item1.id"
                :label="item1.saleAttrValueName"
                :value="item1.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <!--        图片表格-->
        <el-table :data="imgList" border ref="tableComponent">
          <el-table-column type="selection" width="55px"></el-table-column>
          <el-table-column label="图片" prop="imgUrl">
            <template #default="{ row }">
              <img
                :src="row.imgUrl"
                style="width: 60px; height: 60px"
                :alt="row.imgName"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button
                type="primary"
                @click="SetDefaultPicture(row)"
                v-if="!row.selected"
              >
                设置默认
              </el-button>
              <el-button type="warning" v-else>默认图片</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reqGetAttrInfoList } from '@/api/product/attr'
import { ref } from 'vue'
import {
  reqGetSpuImageList,
  reqSpuSaleAttrList,
  saveSkuInfo,
} from '@/api/product/spu'
import { SkuData } from '@/api/product/spu/type.ts'
import { ElMessage } from 'element-plus'
let attrList = ref([]) //平台属性
let imgList = ref([]) // 图片列表
let saleAttrsList = ref([]) // 销售属性
let tableComponent = ref() // 图片表格的实例
// 数据收集
let skuParams = ref<SkuData>({
  category3Id: undefined,
  skuName: '',
  price: undefined,
  spuId: undefined,
  tmId: undefined,
  weight: undefined,
  skuDefaultImg: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
})
const initSku = async (categoryIdList, id, tmId) => {
  skuParams.value.spuId = id
  skuParams.value.tmId = tmId
  skuParams.value.category3Id = categoryIdList.category_3_id
  // 平台属性
  let result1 = await reqGetAttrInfoList(categoryIdList)
  if (result1.code === 200) {
    attrList.value = result1.data.map((item) => ({
      ...item,
      inputValue: undefined,
    }))
  }
  // 图片列表
  let result2 = await reqGetSpuImageList(id)
  if (result2.code === 200) {
    imgList.value = result2.data.map((item) => ({
      ...item,
      selected: false,
    }))
  }
  // 销售属性
  let result3 = await reqSpuSaleAttrList(id)
  if (result3.code === 200) {
    saleAttrsList.value = result3.data.map((item) => ({
      ...item,
      inputValue: undefined,
    }))
  }
}
defineExpose({ initSku })
const emit = defineEmits(['skuSceneChange'])

const SetDefaultPicture = (row) => {
  // 去掉所有勾选
  imgList.value.forEach((item) => {
    tableComponent.value.toggleRowSelection(item, false)
    item.selected = false
  })
  skuParams.value.skuDefaultImg = row.imgUrl
  row.selected = true
  tableComponent.value.toggleRowSelection(row, true)
}
const save = async () => {
  // 整理数据
  skuParams.value.skuAttrValueList = attrList.value
    .filter((item) => {
      return item.inputValue
    })
    .map((item) => {
      return {
        attrId: item.id,
        valueId: item.inputValue,
      }
    })
  skuParams.value.skuSaleAttrValueList = saleAttrsList.value
    .filter((item) => {
      return item.inputValue
    })
    .map((item) => {
      return {
        saleAttrId: item.id,
        saleAttrValueId: item.inputValue,
      }
    })
  let result = await saveSkuInfo(skuParams.value)
  if (result.code === 200) {
    ElMessage.success('添加sku成功')
    emit('skuSceneChange', 0)
  } else {
    ElMessage.error('添加sku失败')
  }
}
const cancel = () => {
  emit('skuSceneChange', 0)
}
</script>

<style scoped></style>
