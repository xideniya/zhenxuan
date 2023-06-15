<template>
  <div>
    <!--    三级分类组件-->
    <Category :flag="scene === 1" @categoryChange="handleC3Change"></Category>
    <el-card>
      <!--      添加SPU按钮-->
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryIdList.category_3_id"
          @click="handelAddSPU"
        >
          添加spu
        </el-button>
        <el-table :data="spuList" border style="margin: 15px 0">
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <!--        四个按钮-->
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button
                icon="Edit"
                type="warning"
                size="small"
                title="编辑spu"
                @click="updateSPU(row)"
              ></el-button>
              <el-button
                icon="InfoFilled"
                type="info"
                size="small"
                title="查看sku"
                @click="viewSKU(row)"
              ></el-button>
              <el-popconfirm
                width="200"
                :title="`确定删除${row.spuName}吗？`"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    icon="Delete"
                    type="danger"
                    size="small"
                    title="删除spu"
                  ></el-button>
                </template>
              </el-popconfirm>
              <el-button
                icon="Plus"
                type="primary"
                size="small"
                title="添加sku"
                @click="newSKU(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--      分页器区域-->
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
      </div>
      <div v-show="scene === 1">
        <!--        添加修改spu-->
        <spu-form
          ref="spuFormComponent"
          @sceneChange="handleSceneChange"
        ></spu-form>
      </div>
      <div v-show="scene === 2">
        <!--        添加sku-->
        <sku-form ref="skuFormComponent" @skuSceneChange="skuScene"></sku-form>
      </div>
      <el-dialog v-model="dialogVisible" title="Tips" width="30%">
        <el-table :data="skuInfo" border>
          <el-table-column label="名称" prop="skuName"></el-table-column>
          <el-table-column label="描述" prop="skuDesc"></el-table-column>
          <el-table-column label="图片">
            <template #default="{ row }">
              <img
                :src="row.skuDefaultImg"
                :alt="row.skuName"
                style="width: 60px; height: 60px"
              />
            </template>
          </el-table-column>
          <el-table-column label="价格" prop="price"></el-table-column>
        </el-table>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  deleteSPU,
  productFindBySpuId,
  reqGetProduct,
} from '@/api/product/spu/index.ts'
import SpuForm from '@/views/product/spu/spuForm.vue'
import SkuForm from '@/views/product/spu/skuForm.vue'
import { ElMessage } from 'element-plus'
let currentPage = ref(1)
let pageSize = ref(5)
let total = ref(0)
let categoryIdList = ref({})
let spuList = ref([])
// 切换展示结构
let scene = ref(0)
// 获取子组件实例
let spuFormComponent = ref()
// 控制对话框
let dialogVisible = ref(false)
// sku列表
let skuInfo = ref([])
const handleSizeChange = () => {
  currentPage.value = 1
  getProduct()
}
const handleCurrentChange = () => {
  getProduct()
}
//获取产品列表
const getProduct = async () => {
  let result = await reqGetProduct(
    currentPage.value,
    pageSize.value,
    categoryIdList.value.category_3_id,
  )
  total.value = result.data.total
  spuList.value = result.data.records
}
const handleC3Change = (id) => {
  categoryIdList.value = id
  if (id.category_3_id) {
    getProduct()
  } else {
    spuList.value = []
  }
}
// 新增spu
const handelAddSPU = () => {
  scene.value = 1
  spuFormComponent.value.addedPropertyInitialization(
    categoryIdList.value.category_3_id,
  )
}

const handleSceneChange = (obj) => {
  const { sceneFromSPU, isSave } = obj
  // 新增跳转第一页
  if (!isSave) {
    currentPage.value = 1
  }
  scene.value = sceneFromSPU
  getProduct()
}
const updateSPU = (row) => {
  spuFormComponent.value.initSpu(row)
  scene.value = 1
}
let skuFormComponent = ref()
// 添加sku
const newSKU = (row) => {
  scene.value = 2
  skuFormComponent.value.initSku(categoryIdList.value, row.id, row.tmId)
}
const skuScene = (s) => {
  scene.value = s
}
const viewSKU = async (row) => {
  let result = await productFindBySpuId(row.id)
  if (result.code === 200) {
    dialogVisible.value = true
    skuInfo.value = result.data
  } else {
    ElMessage.error('获取数据失败')
  }
}
const deleteSpu = async (row) => {
  let result = await deleteSPU(row.id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: `删除${row.spuName}成功`,
    })
    if (spuList.value.length === 1) {
      currentPage.value = currentPage.value - 1 ? currentPage.value - 1 : 1
    }
    await getProduct()
  } else {
    ElMessage({
      type: 'error',
      message: `删除${row.spuName}失败`,
    })
  }
}
</script>

<style scoped></style>
