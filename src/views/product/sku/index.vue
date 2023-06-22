<template>
  <div>
    <el-card>
      <el-table border style="margin-bottom: 15px" :data="productList">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="名称"
          show-overflow-tooltip
          width="150"
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="描述"
          show-overflow-tooltip
          width="400"
          prop="skuDesc"
        ></el-table-column>
        <el-table-column label="默认图片" width="150">
          <template #default="{ row }">
            <img
              :src="row.skuDefaultImg"
              :alt="row.skuName"
              style="width: 80px; height: 80px"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="重量"
          width="150"
          prop="weight"
        ></el-table-column>
        <el-table-column
          label="价格"
          width="150"
          prop="price"
        ></el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-button
              :type="row.isSale ? 'success' : 'info'"
              size="small"
              :icon="row.isSale ? 'Bottom' : 'Top'"
              :title="row.isSale ? '下架' : '上架'"
              @click="OnSaleOrCancelSale(row)"
            ></el-button>
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              title="编辑"
            ></el-button>
            <el-button
              type="info"
              size="small"
              icon="InfoFilled"
              title="详情"
              @click="details(row.id)"
            ></el-button>
            <el-popconfirm
              :title="`确定删除${row.skuName}?`"
              @confirm="deleteSku(row)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                  title="删除"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
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
      <!--      抽屉-->
      <el-drawer
        v-model="drawer"
        title="查看商品详情"
        :with-header="true"
        :show-close="true"
      >
        <el-row>
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 15px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 15px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 15px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuAttrValueList"
              :key="item['id']"
              style="margin: 0 5px 5px 0"
            >
              {{ item['valueName'] }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 15px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 0 5px 5px 0"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item['id']"
            >
              {{ item['saleAttrValueName'] }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 15px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo['skuImageList']"
                :key="item['id']"
              >
                <img
                  :src="item['imgUrl']"
                  :alt="item['imgName']"
                  style="width: 200px; height: 200px"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  reqDeleteSku,
  reqGetProductList,
  reqOnSaleOrCancelSale,
  reqSkuInfo,
} from '@/api/product/sku'
import { ElMessage } from 'element-plus'
import { SkuData } from '@/api/product/spu/type.ts'
const drawer = ref<boolean>(false)
let currentPage = ref<number>(1)
let pageSize = ref<number>(5)
let productList = ref<SkuData[]>([])
let total = ref<number>(0)
let skuInfo = ref<SkuData>({
  skuImageList: undefined,
  category3Id: undefined,
  price: undefined,
  skuDefaultImg: '',
  skuDesc: '',
  skuName: '',
  spuId: undefined,
  tmId: undefined,
  weight: undefined,
})
onMounted(() => {
  initProductList()
})
const handleSizeChange = () => {
  initProductList()
}
const handleCurrentChange = () => {
  initProductList()
}
// 初始化数据
const initProductList = async () => {
  let result = await reqGetProductList(currentPage.value, pageSize.value)
  if (result.code === 200) {
    productList.value = result.data.records
    total.value = result.data.total
  }
}
// 上架下架
const OnSaleOrCancelSale = async (row: any) => {
  let result = await reqOnSaleOrCancelSale(row.id, row.isSale)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: `${row.isSale ? '下架' : '上架'}成功`,
    })
    await initProductList()
  } else {
    ElMessage({
      type: 'success',
      message: `${row.isSale ? '下架' : '上架'}失败`,
    })
  }
}
// sku详情
const details = async (id: number) => {
  drawer.value = true
  let result = await reqSkuInfo(id)
  if (result.code === 200) {
    skuInfo.value = result.data
  }
}
// 删除sku
const deleteSku = async (row: any) => {
  let result = await reqDeleteSku(row.id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: `删除${row.skuName}成功`,
    })
    if (productList.value.length === 1) {
      currentPage.value = currentPage.value - 1 ? currentPage.value - 1 : 1
    }
    await initProductList()
  } else {
    ElMessage({
      type: 'error',
      message: `删除${row.skuName}失败`,
    })
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel {
  --el-carousel-indicator-width: 20px;
}
</style>
