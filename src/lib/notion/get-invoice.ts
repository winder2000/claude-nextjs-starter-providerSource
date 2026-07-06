import { Client, isFullDatabase } from '@notionhq/client'

import { env } from '@/lib/env'
import { Invoice } from '@/lib/types/invoice'

import { mockInvoice } from './mock-data'

/**
 * publicToken으로 Notion 데이터베이스에서 견적서를 조회한다.
 * NOTION_API_KEY / NOTION_INVOICE_DATABASE_ID가 설정되지 않은 개발 환경에서는
 * mockInvoice(publicToken: 'demo')로 폴백한다. (F001, F010, F011)
 */
export async function getInvoiceByToken(
  publicToken: string
): Promise<Invoice | null> {
  if (!env.NOTION_API_KEY || !env.NOTION_INVOICE_DATABASE_ID) {
    return publicToken === mockInvoice.publicToken ? mockInvoice : null
  }

  const notion = new Client({ auth: env.NOTION_API_KEY })

  const database = await notion.databases.retrieve({
    database_id: env.NOTION_INVOICE_DATABASE_ID,
  })
  if (!isFullDatabase(database)) {
    return null
  }
  const dataSourceId = database.data_sources[0]?.id
  if (!dataSourceId) {
    return null
  }

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: 'publicToken',
      rich_text: { equals: publicToken },
    },
  })

  const page = response.results[0]
  if (!page) {
    return null
  }

  // TODO: 실제 Notion 데이터베이스 스키마가 확정되면 프로퍼티 매핑을 구현한다.
  return null
}
