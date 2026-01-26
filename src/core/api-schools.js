import { ApiClient } from './api-client.js'

const client = new ApiClient('/api')

// export async function fetchFromApiSchools() {
export async function fetchFromApiSchools(params = {}) {
  const {
    count = 9,
    page = 1,
    federal_district_id = null,
    region_id = null,
    updated_at = null,
  } = params

  let parts = []
  if (count != null) parts.push(`count=${encodeURIComponent(count)}`)
  if (page != null) parts.push(`page=${encodeURIComponent(page)}`)
  if (federal_district_id != null)
    parts.push(`federal_district_id=${encodeURIComponent(federal_district_id)}`)
  if (region_id != null) parts.push(`region_id=${encodeURIComponent(region_id)}`)
  if (updated_at != null) parts.push(`updated_at=${encodeURIComponent(updated_at)}`)

  const queryString = parts.length ? '?' + parts.join('&') : ''
  const schools = await client.get('/schools' + queryString)

  return {
    pages_count: schools.data.pages_count,
    schools_count: schools.data.total_count,
    schools: schools.data.list.map((item) => ({
      region: item.edu_org.region.name,
      name: item.edu_org.short_name || item.edu_org.full_name,
      address: item.edu_org.contact_info?.post_address || 'Адрес не указан',
      lvls: (item.supplements?.[0]?.educational_programs || [])
        .map((prog) =>
          prog.edu_level?.name !== 'Не определен'
            ? prog.edu_level?.short_name || prog.edu_level?.name
            : null,
        )
        .filter(Boolean), //Избавить от null и undefined в ответе
    })),
  }
}
