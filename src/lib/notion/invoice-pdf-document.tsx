import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

import { Invoice } from '@/lib/types/invoice'

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, color: '#1a1a1a' },
  title: { fontSize: 20, marginBottom: 4, fontWeight: 700 },
  subtitle: { fontSize: 10, color: '#666', marginBottom: 20 },
  section: { marginBottom: 16 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: { color: '#666' },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1px solid #ccc',
    paddingBottom: 6,
    marginBottom: 6,
    fontWeight: 700,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottom: '1px solid #eee',
  },
  colDescription: { width: '40%' },
  colQuantity: { width: '15%', textAlign: 'right' },
  colUnitPrice: { width: '20%', textAlign: 'right' },
  colAmount: { width: '25%', textAlign: 'right' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    paddingTop: 8,
    borderTop: '1px solid #1a1a1a',
  },
  notes: { marginTop: 20, color: '#666', fontSize: 9 },
})

function formatCurrency(amount: number, currency: string) {
  return `${amount.toLocaleString('ko-KR')} ${currency}`
}

/** 견적서 PDF 문서 정의 (F003) */
export function InvoicePdfDocument({ invoice }: { invoice: Invoice }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>견적서 {invoice.invoiceNumber}</Text>
        <Text style={styles.subtitle}>
          발행일 {invoice.invoiceDate} · 유효기간 {invoice.validUntil}
        </Text>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>발주처</Text>
            <Text>{invoice.clientName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>발행자</Text>
            <Text>{invoice.companyInfo.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>대표자</Text>
            <Text>{invoice.companyInfo.representative}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>주소</Text>
            <Text>{invoice.companyInfo.address}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>연락처</Text>
            <Text>{invoice.companyInfo.contact}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDescription}>품명</Text>
            <Text style={styles.colQuantity}>수량</Text>
            <Text style={styles.colUnitPrice}>단가</Text>
            <Text style={styles.colAmount}>합계</Text>
          </View>
          {invoice.items.map(item => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.colDescription}>{item.description}</Text>
              <Text style={styles.colQuantity}>
                {item.quantity} {item.unit}
              </Text>
              <Text style={styles.colUnitPrice}>
                {formatCurrency(item.unitPrice, invoice.currency)}
              </Text>
              <Text style={styles.colAmount}>
                {formatCurrency(item.amount, invoice.currency)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalRow}>
          <Text style={{ fontWeight: 700 }}>
            총액 {formatCurrency(invoice.totalAmount, invoice.currency)}
          </Text>
        </View>

        {invoice.notes ? (
          <Text style={styles.notes}>비고: {invoice.notes}</Text>
        ) : null}
      </Page>
    </Document>
  )
}
