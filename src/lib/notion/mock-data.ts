import { Invoice } from '@/lib/types/invoice'

/**
 * Notion API 연동 전 화면/PDF/공유 기능 검증용 Mock 데이터
 * publicToken 'demo'로 조회 가능 (실제 연동 시 getInvoiceByToken에서 제거)
 */
export const mockInvoice: Invoice = {
  id: 'demo-invoice-001',
  invoiceNumber: 'INV-2025-001',
  clientName: '주식회사 예시고객',
  invoiceDate: '2025-01-15',
  validUntil: '2025-02-15',
  items: [
    {
      id: 'item-1',
      description: '웹사이트 리뉴얼 개발',
      quantity: 1,
      unitPrice: 5000000,
      amount: 5000000,
      unit: '건',
    },
    {
      id: 'item-2',
      description: 'UI/UX 디자인',
      quantity: 1,
      unitPrice: 2000000,
      amount: 2000000,
      unit: '건',
    },
    {
      id: 'item-3',
      description: '유지보수 (3개월)',
      quantity: 3,
      unitPrice: 300000,
      amount: 900000,
      unit: '개월',
    },
  ],
  totalAmount: 7900000,
  currency: 'KRW',
  notes: '계약금 50% 선입금 후 작업 진행됩니다.',
  companyInfo: {
    name: '주식회사 견적서비스',
    representative: '홍길동',
    address: '서울특별시 강남구 테헤란로 123',
    contact: '02-1234-5678',
  },
  publicToken: 'demo',
}
