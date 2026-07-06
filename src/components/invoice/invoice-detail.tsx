import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Invoice } from '@/lib/types/invoice'

function formatCurrency(amount: number, currency: string) {
  return `${amount.toLocaleString('ko-KR')} ${currency}`
}

/** 견적서 상세 정보 표시 (F002) */
export function InvoiceDetail({ invoice }: { invoice: Invoice }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
          <div>
            <CardTitle className="text-2xl">
              견적서 {invoice.invoiceNumber}
            </CardTitle>
            <p className="text-muted-foreground mt-1 text-sm">
              발행일 {invoice.invoiceDate} · 유효기간 {invoice.validUntil}까지
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-muted-foreground text-sm">발주처</p>
            <p className="font-medium">{invoice.clientName}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">발행자</p>
            <p className="font-medium">{invoice.companyInfo.name}</p>
            <p className="text-muted-foreground text-sm">
              {invoice.companyInfo.representative} ·{' '}
              {invoice.companyInfo.contact}
            </p>
            <p className="text-muted-foreground text-sm">
              {invoice.companyInfo.address}
            </p>
          </div>
        </div>

        <Separator />

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>품명</TableHead>
                <TableHead className="text-right">수량</TableHead>
                <TableHead className="text-right">단가</TableHead>
                <TableHead className="text-right">합계</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.unitPrice, invoice.currency)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.amount, invoice.currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end">
          <div className="text-right">
            <p className="text-muted-foreground text-sm">총액</p>
            <p className="text-2xl font-bold">
              {formatCurrency(invoice.totalAmount, invoice.currency)}
            </p>
          </div>
        </div>

        {invoice.notes ? (
          <>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">비고</p>
              <p className="mt-1 text-sm">{invoice.notes}</p>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
