export interface CategoryId {
  category_1_id: number | undefined
  category_2_id: number | undefined
  category_3_id: number | undefined
}
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface CategoryObj {
  id: number
  name: string
  category1Id?: number
  category2Id?: number
}
// 分类接口返回的数据类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}
export interface CategoryList {
  category_1_list: CategoryObj[]
  category_2_list: CategoryObj[]
  category_3_list: CategoryObj[]
}
//属性值对象的ts类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number | undefined
  flag?: boolean
}
//存储每一个属性值的数组类型
export type AttrValueList = AttrValue[]
//属性对象
export interface Attr {
  id?: number | undefined
  attrName: string
  categoryId: number | undefined
  categoryLevel: number
  attrValueList: AttrValueList
}
//存储每一个属性对象的数组ts类型
export type AttrList = Attr[]
//属性接口返回的数据ts类型
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
