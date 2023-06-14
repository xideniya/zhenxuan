<template>
  <div>
    <el-form label-width="110px">
      <el-form-item label="SPU名称：">
        <el-input style="width: 40%" v-model="spuInfo.spuName"></el-input>
      </el-form-item>
      <!--      spu品牌-->
      <el-form-item label="SPU品牌：">
        <el-select
          class="m-2"
          placeholder="选择品牌"
          size="large"
          v-model="spuInfo.tmId"
        >
          <el-option
            v-for="item in tradeMarkList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <!--      spu描述-->
      <el-form-item label="SPU描述：">
        <el-input
          style="width: 60%"
          type="textarea"
          placeholder="输入描述"
          v-model="spuInfo.description"
        ></el-input>
      </el-form-item>
      <!--      展示spu的照片墙-->
      <el-form-item label="SPU图片：">
        <!--          前面加api-->
        <el-upload
          v-model:file-list="fileList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <!--      选择剩余的销售属性-->
      <el-form-item label="SPU销售属性：">
        <el-select
          style="margin-right: 15px"
          :placeholder="`剩余${restAttr.length}项未选择`"
          v-model="selectedAttr"
        >
          <el-option
            v-for="item in restAttr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button
          type="primary"
          @click="handleAddAttr"
          :disabled="!selectedAttr"
        >
          添加销售属性
        </el-button>
        <!--        展示销售属性和属性值-->
        <el-table style="margin: 10px 0" :data="spuSaleAttrList" border>
          <el-table-column
            label="序号"
            width="80px"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column
            label="属性名"
            width="120px"
            prop="saleAttrName"
          ></el-table-column>
          <el-table-column label="属性值" prop="spuSaleAttrValueList">
            <template #default="{ row, $index }">
              <el-tag
                @close="handleClose(tag, row)"
                v-for="tag in row.spuSaleAttrValueList"
                :key="tag.id"
                class="mx-1"
                closable
                :type="tag.type"
                style="margin: 5px 5px 5px 0"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                v-model="row.input"
                :ref="
                  (vc) => {
                    inputComponent[$index] = vc
                  }
                "
                class="ml-1 w-20"
                size="small"
                style="width: 100px"
                @blur="handleBlur(row)"
              />
              <el-button
                v-else
                class="button-new-tag ml-1"
                size="small"
                type="primary"
                @click="showInput(row, $index)"
              >
                + 新属性值
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="{ $index }">
              <el-button
                size="small"
                type="danger"
                icon="Delete"
                @click="spuSaleAttrList!.splice($index, 1)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <!--        保存和取消按钮-->
        <el-button
          type="primary"
          @click="save"
          :disabled="!spuSaleAttrList.length"
        >
          保存
        </el-button>
        <el-button type="info" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import {
  addOrUpdateSPu,
  reqBaseSaleAttrList,
  reqGetSpuImageList,
  reqGetTrademarkList,
  reqSpuSaleAttrList,
} from '@/api/product/spu'
import { SPU } from '@/api/product/spu/type.ts'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['sceneChange'])
let tradeMarkList = ref([]) //系统品牌列表
let spuInfo = ref<SPU>({
  id: undefined,
  spuName: '',
  description: '',
  category3Id: undefined,
  tmId: undefined,
  spuSaleAttrList: [],
  spuImageList: [],
})
let spuSaleAttrList = ref([]) //spu属性列表
let baseSaleAttrList = ref([]) // 系统中的基础属性列表
let selectedAttr = ref(undefined) //选中的销售属性id
const fileList = ref([]) // 照片墙展示
let inputComponent = reactive([]) // 组件实例数组
// 剩余的属性列表
let restAttr = computed(() => {
  return baseSaleAttrList.value.filter((item1) => {
    return spuSaleAttrList.value.every(
      (item2) => item1.id !== item2.baseSaleAttrId,
    )
  })
})
// 清除数据
const clearData = () => {
  Object.assign(spuInfo.value, {
    id: undefined,
    spuName: '',
    description: '',
    category3Id: undefined,
    tmId: undefined,
    spuSaleAttrList: [],
    spuImageList: [],
  })
  selectedAttr.value = undefined
  fileList.value = []
  inputComponent = []
  tradeMarkList.value = []
  spuSaleAttrList.value = []
}
// 预览窗口控制
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

//照片墙点击预览
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
// 修改属性初始化
const initSpu = async (spu) => {
  // el-table跟踪不到数据变化，但数据还是响应式的
  // spuInfo.value = spu
  // 下面这种方法el-table数据可以跟踪到
  Object.assign(spuInfo.value, spu)
  let result = await reqGetTrademarkList()
  if (result.code === 200) {
    tradeMarkList.value = result.data
  }
  let result1 = await reqGetSpuImageList(spu.id)
  if (result1.code === 200) {
    fileList.value = result1.data.map((item) => ({
      name: item.imgName,
      url: item.imgUrl,
    }))
  }
  let result2 = await reqBaseSaleAttrList()
  if (result2.code === 200) {
    baseSaleAttrList.value = result2.data
  }
  let result3 = await reqSpuSaleAttrList(spu.id)
  if (result3.code === 200) {
    spuSaleAttrList.value = result3.data.map((item) => {
      return { ...item, inputVisible: false, input: '' }
    })
  }
}
const addedPropertyInitialization = async (c3id) => {
  spuInfo.value.category3Id = c3id
  let result2 = await reqBaseSaleAttrList()
  if (result2.code === 200) {
    baseSaleAttrList.value = result2.data
  }
  let result = await reqGetTrademarkList()
  if (result.code === 200) {
    tradeMarkList.value = result.data
  }
}
defineExpose({ initSpu, addedPropertyInitialization })
import { nextTick } from 'vue'
import { ElInput } from 'element-plus'
const showInput = (row, $index) => {
  row.inputVisible = true
  nextTick(() => {
    inputComponent[$index].focus()
  })
}
// 新增属性
const handleAddAttr = () => {
  const obj = baseSaleAttrList.value.find((item) => {
    return item.id === selectedAttr.value
  })
  spuSaleAttrList.value.push({
    baseSaleAttrId: obj.id,
    inputVisible: false,
    saleAttrName: obj.name,
    input: '',
    spuSaleAttrValueList: [],
  })
  selectedAttr.value = undefined
}
const handleBlur = (row) => {
  console.log(111)
  if (row.input.trim() === '') {
    ElMessage.error('属性值不能为空')
    row.inputVisible = false
    row.input = ''
    return
  }
  if (
    row.spuSaleAttrValueList.find(
      (item) => item.saleAttrValueName === row.input,
    )
  ) {
    ElMessage.error('属性值不能重复')
    row.inputVisible = false
    row.input = ''
    return
  }
  row.spuSaleAttrValueList.push({
    baseSaleAttrId: row.baseSaleAttrId,
    saleAttrValueName: row.input,
  })
  row.input = ''
  row.inputVisible = false
}
const handleClose = (tag, row) => {
  row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(tag), 1)
}
// 保存按钮
const save = async () => {
  // 整理数据
  spuInfo.value.spuImageList = fileList.value.map((item) => ({
    imgName: item.name,
    imgUrl: item.response ? item.response.data : item.url,
  }))
  spuInfo.value.spuSaleAttrList = spuSaleAttrList.value.map((item) => ({
    baseSaleAttrId: item.baseSaleAttrId,
    id: item.id,
    saleAttrName: item.saleAttrName,
    spuId: item.spuId,
    spuSaleAttrValueList: item.spuSaleAttrValueList,
  }))
  let result = await addOrUpdateSPu(spuInfo.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: spuInfo.value.id ? '修改成功' : '新增成功',
    })
    emit('sceneChange', { sceneFromSPU: 0, isSave: !!spuInfo.value.id })
    clearData()
  } else {
    ElMessage({
      type: 'error',
      message: spuInfo.value.id ? '修改失败' : '新增失败',
    })
    emit('sceneChange', { sceneFromSPU: 0, isSave: !!spuInfo.value.id })
    clearData()
  }
}
// 取消按钮
const handleCancel = () => {
  emit('sceneChange', { sceneFromSPU: 0, isSave: true })
  clearData()
}
</script>

<style scoped></style>
