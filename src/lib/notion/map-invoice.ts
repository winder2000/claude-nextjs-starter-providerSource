import { PageObjectResponse } from '@notionhq/client'

import { Invoice, InvoiceItem } from '@/lib/types/invoice'

/**
 * Notion 데이터베이스 프로퍼티명 (Invoice/Items 2-DB 관계형 구조)
 * @see tasks/005-notion-api-integration.md 스키마 참조
 */
const NOTION_PROPERTY = {
  invoiceNumber: 'Name',
  clientName: 'clientName',
  invoiceDate: 'invoiceDate',
  validUntil: 'validUntil',
  items: 'Items',
  totalAmount: 'totalAmount',
  currency: 'currency',
  notes: 'notes',
  companyName: 'companyName',
  companyRepresentative: 'companyRepresentative',
  companyAddress: 'companyAddress',
  companyContact: 'companyContact',
  publicToken: 'publicToken',
} as const

const NOTION_ITEM_PROPERTY = {
  description: 'Name',
  quantity: 'quantity',
  unitPrice: 'unitPrice',
  amount: 'amount',
  unit: 'unit',
} as const

function getTitleText(page: PageObjectResponse, propertyName: string): string {
  const property = page.properties[propertyName]
  if (property?.type !== 'title') {
    return ''
  }
  return property.title.map(text => text.plain_text).join('')
}

function getRichText(page: PageObjectResponse, propertyName: string): string {
  const property = page.properties[propertyName]
  if (property?.type !== 'rich_text') {
    return ''
  }
  return property.rich_text.map(text => text.plain_text).join('')
}

function getDate(page: PageObjectResponse, propertyName: string): string {
  const property = page.properties[propertyName]
  if (property?.type !== 'date' || !property.date) {
    return ''
  }
  return property.date.start
}

function getNumber(page: PageObjectResponse, propertyName: string): number {
  const property = page.properties[propertyName]
  if (property?.type !== 'number' || property.number === null) {
    return 0
  }
  return property.number
}

function getSelect(page: PageObjectResponse, propertyName: string): string {
  const property = page.properties[propertyName]
  if (property?.type !== 'select' || !property.select) {
    return ''
  }
  return property.select.name
}

/** Invoice 페이지의 Items Relation에 연결된 품목 페이지 ID 목록을 추출한다. */
export function getRelatedItemPageIds(page: PageObjectResponse): string[] {
  const property = page.properties[NOTION_PROPERTY.items]
  if (property?.type !== 'relation') {
    return []
  }
  return property.relation.map(relation => relation.id)
}

/** 품목 페이지를 InvoiceItem으로 매핑한다. 필수 필드 누락 시 안전하게 폴백한다. */
export function mapPageToInvoiceItem(page: PageObjectResponse): InvoiceItem {
  return {
    id: page.id,
    description: getTitleText(page, NOTION_ITEM_PROPERTY.description),
    quantity: getNumber(page, NOTION_ITEM_PROPERTY.quantity),
    unitPrice: getNumber(page, NOTION_ITEM_PROPERTY.unitPrice),
    amount: getNumber(page, NOTION_ITEM_PROPERTY.amount),
    unit: getRichText(page, NOTION_ITEM_PROPERTY.unit),
  }
}

/**
 * Notion 견적서 페이지 프로퍼티를 Invoice 타입으로 매핑한다. (F001, F011)
 * items는 별도로 조회한 품목 페이지 목록을 전달받아 매핑한다.
 */
export function mapPageToInvoice(
  page: PageObjectResponse,
  itemPages: PageObjectResponse[]
): Invoice {
  return {
    id: page.id,
    invoiceNumber: getTitleText(page, NOTION_PROPERTY.invoiceNumber),
    clientName: getRichText(page, NOTION_PROPERTY.clientName),
    invoiceDate: getDate(page, NOTION_PROPERTY.invoiceDate),
    validUntil: getDate(page, NOTION_PROPERTY.validUntil),
    items: itemPages.map(mapPageToInvoiceItem),
    totalAmount: getNumber(page, NOTION_PROPERTY.totalAmount),
    currency: getSelect(page, NOTION_PROPERTY.currency) || 'KRW',
    notes: getRichText(page, NOTION_PROPERTY.notes),
    companyInfo: {
      name: getRichText(page, NOTION_PROPERTY.companyName),
      representative: getRichText(page, NOTION_PROPERTY.companyRepresentative),
      address: getRichText(page, NOTION_PROPERTY.companyAddress),
      contact: getRichText(page, NOTION_PROPERTY.companyContact),
    },
    publicToken: getRichText(page, NOTION_PROPERTY.publicToken),
  }
}
