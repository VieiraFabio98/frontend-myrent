import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const request = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  data?: any,
  headers: Record<string, string> = {}
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
      data,
      headers: {
        ...(api.defaults.headers as Record<string, string>),
        ...headers,
      },
    }

    const response = await api(config)
    return response.data
    
  } catch (error) {
    console.error(`Erro na requisição ${method.toUpperCase()} ${endpoint}:`, error)
    throw error
  }
}
