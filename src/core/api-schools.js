import { ApiClient } from './api-client.js'

const client = new ApiClient('/api')

export async function fetchFromApiSchools(params = {}) {
  const {
    count = 10,
    page = 1,
    federal_district_id = null,
    region_id = null,
    updated_at = null,
  } = params

  let parts = []
  // encodeURIComponent() - кодировка в URI, защита от некорректных символов
  if (count != null) parts.push(`count=${encodeURIComponent(count)}`)
  if (page != null) parts.push(`page=${encodeURIComponent(page)}`)
  if (federal_district_id != null)
    parts.push(`federal_district_id=${encodeURIComponent(federal_district_id)}`)
  if (region_id != null) parts.push(`region_id=${encodeURIComponent(region_id)}`)
  if (updated_at != null) parts.push(`updated_at=${encodeURIComponent(updated_at)}`)

  const queryString = parts.length ? '?' + parts.join('&') : ''
  const schools = await client.get('/schools' + queryString)

  //mapping — чтобы уменьшить названия если нет short_name
  const lvlsMapping = {
    общеобразовательный: 'Общеобразовательный',
    'Начальное общее образование': 'Начальное',
    'Среднее общее образование': 'Сред. общ.',
    'Среднее профессиональное образование': 'Сред. проф.',
    'Высшее образование - специалитет': 'Специалитет',
    'Послевузовское профессиональное образование': 'Послевузовское',
    'Высшее образование - бакалавриат': 'Бакалавриат',
    'Высшее профессиональное образование': 'Высшее',
  }

  // прогонка строки через mapping чтобы сократить названия
  const formatLvls = (str) => lvlsMapping[str] || str

  // получить полнй массив уровней, без дубликатов (Set) и защитой от null/undefined (filter(Boolean))
  const getSchoolsLvls = (lvls = []) => [
    ...new Set(
      lvls
        .map((lvl) => {
          const name = lvl?.edu_level?.short_name || lvl?.edu_level?.name
          return name ? formatLvls(name) : null
        })
        .filter(Boolean),
    ),
  ]

  return {
    pages_count: schools.data.pages_count,
    schools_count: schools.data.total_count,
    schools: schools.data.list.map((item) => ({
      region: item.edu_org.region.name,
      name: item.edu_org.short_name || item.edu_org.full_name,
      address: item.edu_org.contact_info?.post_address || 'Адрес не указан',
      lvls: getSchoolsLvls(item.supplements?.[0]?.educational_programs),
    })),
  }
}
