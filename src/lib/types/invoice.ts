/**
 * 견적서 데이터 모델 (PRD: docs/PRD.md 데이터 모델 섹션 참조)
 */
export type InvoiceItem = {
  id: string
  description: string
  quantity: number
  unitPrice: number
  amount: number
  unit: string
}

export type CompanyInfo = {
  name: string
  representative: string
  address: string
  contact: string
}

export type Invoice = {
  id: string
  invoiceNumber: string
  clientName: string
  invoiceDate: string
  validUntil: string
  items: InvoiceItem[]
  totalAmount: number
  currency: string
  notes: string
  companyInfo: CompanyInfo
  publicToken: string
}
