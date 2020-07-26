import { AxiosError } from "axios"

export const isAxiosError = (e: any): e is AxiosError => {
  return (typeof e === 'object') && (e.isAxiosError === true)
}
