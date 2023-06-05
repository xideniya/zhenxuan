// 本地存储token
export const set_token = (token: string) => {
  localStorage.setItem('token', token)
}
export const get_token = () => {
  return localStorage.getItem('token')
}
