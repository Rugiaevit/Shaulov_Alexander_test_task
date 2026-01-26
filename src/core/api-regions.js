import { ApiClient } from './api-client.js'

const client = new ApiClient('/api')

export async function fetchFromApiRegions() {
  const response = await client.get('/regions')

  // Извлекаем массив регионов
  const regions = response.data || []

  // Преобразуем в нужный формат и добавляем "Не выбрано"
  const formatted = [
    { id: null, title: 'Не выбрано' },
    ...regions.map((item) => ({
      id: item.id,
      title: item.name,
    })),
  ]

  return formatted
}
