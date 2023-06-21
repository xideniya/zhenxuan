import { cloneDeep } from 'lodash-es'

export default function filterRoute(routes: any, rules: any) {
  // 深拷贝一份，不影响原数据
  const arr = cloneDeep(routes)
  return arr.filter((item: any) => {
    if (rules.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        // 原数据更改
        item.children = filterRoute(item.children, rules)
      }
      return true
    }
  })
}
