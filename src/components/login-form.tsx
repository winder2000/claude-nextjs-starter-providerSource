'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

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
import { loginSchema, type LoginFormValues } from '@/lib/schemas'

/** 세이클럽 스타일 로그인 폼 컴포넌트 */
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    console.log('로그인 데이터:', data)
    // 여기에 로그인 로직을 추가하세요
  }

  return (
    <Card className="border-border/40 xs:mx-4 w-full max-w-md overflow-hidden shadow-lg sm:mx-auto">
      {/* 헤더 배경 - 세이클럽 스타일 그라데이션 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 sm:px-8">
        <CardHeader className="space-y-1 p-0">
          <CardTitle className="text-center text-3xl font-bold text-white">
            로그인
          </CardTitle>
          <CardDescription className="text-center text-blue-100">
            계정에 로그인하여 서비스를 이용하세요
          </CardDescription>
        </CardHeader>
      </div>

      {/* 폼 영역 */}
      <CardContent className="px-6 py-8 sm:px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                      placeholder="your@email.com"
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
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호를 입력하세요"
                        className="border-input bg-background h-11 rounded-lg border px-4 py-2 pr-12 text-base transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 transform hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 로그인 상태 유지 체크박스 */}
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="rounded border-gray-300"
                    />
                  </FormControl>
                  <FormLabel className="text-foreground cursor-pointer text-sm font-normal">
                    로그인 상태 유지
                  </FormLabel>
                </FormItem>
              )}
            />

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              className="mt-6 h-11 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-base font-semibold text-white transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-md"
            >
              로그인하기
            </Button>
          </form>
        </Form>

        {/* 회원가입 링크 */}
        <div className="border-border/50 mt-8 border-t pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            아직 계정이 없으신가요?{' '}
            <Link
              href="/signup"
              className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            >
              회원가입
            </Link>
          </p>
        </div>

        {/* 비밀번호 찾기 링크 (선택) */}
        <div className="mt-3 text-center">
          <Link
            href="/forgot-password"
            className="text-muted-foreground text-xs transition-colors hover:text-blue-600"
          >
            비밀번호를 잊으셨나요?
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
