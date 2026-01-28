import { ApiClient } from './api-client.js'

const client = new ApiClient('/api')

export async function fetchFromApiFederalDistricts() {
  const response = await client.get('/federalDistricts')

  // Извлекаем массив федеральных округов
  const federalDistricts = response.data || []

  // Преобразуем в нужный формат и добавляем первым элементом "Не выбрано"
  // формат = [{id: 1, title:'title1'}, {id: 2, title:'title2'}, ...]
  const formatted = [
    { id: null, title: 'Не выбрано' },
    ...federalDistricts.map((item) => ({
      id: item.id,
      title: item.name,
    })),
  ]

  return formatted
}
