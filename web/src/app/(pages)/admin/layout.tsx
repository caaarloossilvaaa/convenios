import { Footer } from '@/app/components/Footer'
import { Header } from '@/app/components/Admin/Header'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col justify-between">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
