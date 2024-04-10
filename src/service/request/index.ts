import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { AxiosInstance } from 'axios'
// 拦截器：loading、token、修改配置
// AxiosRequestConfig类型中没有 interceptors 需要扩展类型
interface PKInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailedFn?: (err: any) => any
  reponseSuccessFn?: (res: T) => T
  reponseFailedFn?: (err: any) => any
}
interface PKRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: PKInterceptors<T>
}
class PKRequest {
  instance: AxiosInstance
  constructor(config: PKRequestConfig) {
    // 每个实例都会 创建axios
    this.instance = axios.create(config)

    //   实例 全局的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('实例-> 全局的请求成功的拦截：')
        return config
      },
      (err) => {
        console.log('实例-> 全局的请求失败的拦截：')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('实例-> 全局的响应成功的拦截：')
        //  res.data => promise的res类型有问题 ： 通过泛型解决
        return res.data
      },
      (err) => {
        console.log('实例-> 全局的响应失败的拦截：')
        return err
      }
    )
    //   针对特定的pkRequest实例添加拦截
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailedFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.reponseSuccessFn,
      config.interceptors?.reponseFailedFn
    )
  }
  // 网络请求泛型； 因为promise的成功的回调 返回的类型 是创建实例时确定的
  // PKRequestConfig<T> ： PKRequestConfig中的拦截器 响应成功的返回数据类型需要和 promise一致
  request<T = any>(config: PKRequestConfig<T>) {
    // 针对网络请求 中，有 拦截器
    if (config.interceptors?.requestSuccessFn) {
      // 单次请求的成功拦截
      config.interceptors.requestSuccessFn(config as any)
    }
    // 返回的promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.reponseSuccessFn) {
            res = config.interceptors.reponseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: PKRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: PKRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: PKRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  put<T = any>(config: PKRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
  patch<T = any>(config: PKRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default PKRequest
