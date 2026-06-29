'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { signupSchema, type SignupFormValues } from '@/lib/schemas'

/** 세이클럽 스타일 회원가입 폼 컴포넌트 */
export function SignupForm() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  const onSubmit = (data: SignupFormValues) => {
    console.log('회원가입 데이터:', data)
    // 여기에 회원가입 로직을 추가하세요
  }

  return (
    <Card className="border-border/40 xs:mx-4 w-full max-w-md overflow-hidden shadow-lg sm:mx-auto">
      {/* 헤더 배경 - 세이클럽 스타일 그라데이션 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 sm:px-8">
        <CardHeader className="space-y-1 p-0">
          <CardTitle className="text-center text-3xl font-bold text-white">
            회원가입
          </CardTitle>
          <CardDescription className="text-center text-blue-100">
            새 계정을 만들어 서비스를 시작하세요
          </CardDescription>
        </CardHeader>
      </div>

      {/* 폼 영역 */}
      <CardContent className="px-6 py-8 sm:px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* 이름 입력 필드 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-semibold">
                    이름
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="홍길동"
                      className="border-input bg-background h-11 rounded-lg border px-4 py-2 text-base transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 이메일 입력 필드 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-semibold">
                    이메일
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      className="border-input bg-background h-11 rounded-lg border px-4 py-2 text-base transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 비밀번호 입력 필드 */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-semibold">
                    비밀번호
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="8자 이상 입력하세요"
                      className="border-input bg-background h-11 rounded-lg border px-4 py-2 text-base transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 비밀번호 확인 입력 필드 */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-semibold">
                    비밀번호 확인
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="비밀번호 재입력"
                      className="border-input bg-background h-11 rounded-lg border px-4 py-2 text-base transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 이용약관 동의 체크박스 */}
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="border-border/50 flex flex-row items-start space-y-0 space-x-3 rounded-lg border bg-blue-50/30 p-4 dark:bg-blue-950/10">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1 rounded border-gray-300"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-foreground cursor-pointer text-sm font-normal">
                      이용약관에 동의합니다
                    </FormLabel>
                    <p className="text-muted-foreground text-xs">
                      서비스 이용약관 및 개인정보 처리방침에 동의합니다.
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              className="mt-6 h-11 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-base font-semibold text-white transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-md"
            >
              회원가입
            </Button>
          </form>
        </Form>
      </CardContent>

      {/* 로그인 링크 */}
      <div className="border-border/50 bg-background/50 border-t px-6 py-6 text-center sm:px-8">
        <p className="text-muted-foreground text-sm">
          이미 계정이 있으신가요?{' '}
          <Link
            href="/login"
            className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
          >
            로그인
          </Link>
        </p>
      </div>
    </Card>
  )
}
