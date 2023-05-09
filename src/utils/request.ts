

export const fetchConfig = {
  baseURL:"",
  headers:{
      appid:""
  },
}
export interface Headers {
  token: string,
  appid: string,
}
type method = "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options" | "trace"

export interface Options {
  baseURL: string,
  method: method,
  headers: HeadersInit & Headers,
  initialCache: boolean,
  lazy: boolean,
  key: string,
  $: boolean,
}

//请求体封装
function useGetFetchOptions(options: Options){
  options.baseURL = options.baseURL ?? fetchConfig.baseURL
  options.headers = options.headers ?? {
      appid:fetchConfig.headers.appid
  }
  options.initialCache = options.initialCache ?? false
  options.lazy = options.lazy ?? false

  // 用户登录，默认传token
  const token = useCookie("token")
 
  if(token.value){ 
      options.headers.token = token.value
  }

  return options
}

//http请求封装
export async function useHttp(key: string, url: string, options: Options){
  options = useGetFetchOptions(options)
  options.key = key

  if(options.$){
      const data = ref(null)
      const error = ref(null)
      return await $fetch(url, options).then(res =>{
          data.value = res.data
          return {
              data,
              error
          }
      }).catch(err=>{
          const msg = err?.data?.data
          if(process.client){
              // message.error(msg || '服务端错误')
          }
          error.value = msg
          return {
              data,
              error
          }
      })
  }

  let res = await useFetch(url, {
      ...options,
      transform:(res)=>{
        return res.data
      },
  })

  // 客户端错误处理
  if(process.client && res.error.value){
      const msg = res.error.value?.data?.data
      if(!options.lazy){
          // message.error(msg || '服务端错误')
      }
  }

  return res
}

// GET请求
export function useHttpGet(key: string, url: string, options: Options){
  options.method = "get"
  return useHttp(key,url,options)
}

// POST请求
export function useHttpPost(key: string, url: string, options: Options){
  options.method = "post"
  return useHttp(key,url,options)
}