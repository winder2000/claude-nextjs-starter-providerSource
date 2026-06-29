import { Metadata } from 'next'
import { SignupForm } from '@/components/signup-form'

export const metadata: Metadata = {
  title: '회원가입',
  description: '새 계정을 만들어 서비스를 시작하세요',
}

export default function SignupPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <SignupForm />
      </div>
    </div>
  )
}
