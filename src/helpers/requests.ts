import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

interface IOptionRequestHeader {
  [key: string]: any
}

interface IOptionRequestBody {
  [key: string]: any
}

interface IOptionRequest {
  headers?: IOptionRequestHeader
  method?: string
  body?: IOptionRequestBody
}

function buildFormData(formData: any, data: any, parentKey?: string | null) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
    })
  } else {
    const value = data == null ? '' : data

    formData.append(parentKey, value)
  }

  return formData
}

const BaseRequest = async (url: string, options?: IOptionRequest) => {
  const authStore = useAuthStore()
  const { token } = storeToRefs(authStore)

  const headers: IOptionRequestHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  let body: any = {}

  if (options?.headers) {
    const optionsHeader: IOptionRequestHeader = options.headers

    Object.keys(optionsHeader).map((headerKey) => {
      headers[headerKey] = optionsHeader[headerKey]
    })
  }

  if (token.value) headers['Authorization'] = `Bearer ${token.value}`

  if (options?.body) {
    console.log(options?.headers?.['Content-Type'])
    if (options?.headers?.['Content-Type'] === 'application/json') {
      const optionsBody: IOptionRequestBody = options.body
      Object.keys(optionsBody).map((bodyKey) => {
        body[bodyKey] = optionsBody[bodyKey]
      })

      body = JSON.stringify(body)
    } else {
      body = new FormData()

      const optionsBody: IOptionRequestBody = options.body
      body = buildFormData(body, optionsBody)
    }
  }

  console.log('body', body)

  const method = options?.method?.toUpperCase() ?? 'GET'

  if (method === 'GET') {
    body = null
  }

  try {
    if (headers?.['Content-Type']) {
      delete headers['Content-Type']
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body
    })

    const json = await response.json()

    if (response.status == 401) {
      // handle unauthentication
      authStore.actionLogout()
    }

    return { json, response }
  } catch (error: any) {
    return { error }
  }
}

const Request = {
  get: (url: string, options?: IOptionRequest) => BaseRequest(url, options),
  post: (url: string, body?: any, options?: IOptionRequest) => {
    body = { ...body, _method: 'POST' }
    return BaseRequest(url, { body, method: 'POST', ...options })
  },
  put: (url: string, body?: any, options?: IOptionRequest) => {
    body = { ...body, _method: 'PUT' }
    return BaseRequest(url, { body, method: 'POST', ...options })
  },
  delete: (url: string, body?: any, options?: IOptionRequest) => {
    body = { ...body, _method: 'DELETE' }
    return BaseRequest(url, { body, method: 'POST', ...options })
  }
}

export default Request
