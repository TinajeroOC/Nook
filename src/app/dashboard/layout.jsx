import { DashboardHeader } from '@/components/layout/dashboard/Header'
import { MarketingFooter } from '@/components/layout/marketing/Footer'

export default async function Layout({ children }) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <DashboardHeader />
      <main className='container mx-auto h-auto max-w-5xl flex-grow p-6'>{children}</main>
      <MarketingFooter />
    </div>
  )
}
