import pkRequest from '..'

// 发送网络请求
export const postLoginReq = () => {
  pkRequest
    .post({
      url: '/login',
      data: {
        name: 'coderwhy',
        password: '123456'
      }
    })
    .then((res) => {
      console.log(res)
    })
}
