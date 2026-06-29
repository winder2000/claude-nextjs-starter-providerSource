import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url('유효한 URL을 입력해주세요 (예: https://example.com)')
    .optional(),
})

const result = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})

if (!result.success) {
  console.error('❌ 환경변수 설정 오류:')
  console.error(result.error.format())
  process.exit(1)
}

export const env = result.data

export type Env = z.infer<typeof envSchema>
