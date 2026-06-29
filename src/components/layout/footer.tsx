import { Container } from './container'

/** 푸터 컴포넌트 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t">
      <Container>
        <div className="py-8">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} NextJS Starter. 모든 권리 보유.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
