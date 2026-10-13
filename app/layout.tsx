import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pré Black Friday | Método VDE — Turma de 60 dias para a OAB 48',
  description:
    'Condição especial de Pré Black Friday na Turma de 60 dias do Método VDE para a 1ª fase da OAB 48. Vagas limitadas.',
  openGraph: {
    title: 'Pré Black Friday | Método VDE — Turma de 60 dias para a OAB 48',
    description:
      'Condição especial de Pré Black Friday na Turma de 60 dias do Método VDE para a 1ª fase da OAB 48.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}
