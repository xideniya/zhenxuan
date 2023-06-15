interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface SPU {
  id?: number | undefined
  spuName: string
  description: string
  category3Id: number | undefined
  tmId: number | undefined
  spuSaleAttrList: SaleAttr[] | null
  spuImageList: ImageList[] | null
}
export type SPUList = SPU[]
export interface SPUResponseData extends ResponseData {
  data: {
    records: SPUList
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}
export interface trademarkResponse extends ResponseData {
  data: Trademark[]
}
export interface ImageList {
  id?: number
  spuId?: number
  imgName: string
  imgUrl: string
}
export interface imageListResponse extends ResponseData {
  data: ImageList[]
}
export interface SpuSaleAttrValue {
  id?: number
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}
export interface SaleAttr {
  id?: number
  spuId?: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValue[]
}
export interface SaleAttrResponse extends ResponseData {
  data: SaleAttr[]
}
export interface BaseSaleAttr {
  id: number
  createTime: string
  updateTime: string
  name: string
}
export interface BaseSaleAttrResponse extends ResponseData {
  data: BaseSaleAttr[]
}

export interface Attr {
  attrId: undefined | number //平台属性的ID
  valueId: undefined | number //属性值的ID
}

export interface saleArr {
  saleAttrId: undefined | number //属性ID
  saleAttrValueId: undefined | number //属性值的ID
}
export interface SkuData {
  category3Id: undefined | number //三级分类的ID
  spuId: undefined | number //已有的SPU的ID
  tmId: undefined | number //SPU品牌的ID
  skuName: string //sku名字
  price: undefined | number //sku价格
  weight: undefined | number //sku重量
  skuDesc: string //sku的描述
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg: string //sku图片地址
  isSale?: number
}

//获取SKU数据接口的ts类型
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
