import Footer from '@/components/layout/base/Footer'
import Header from '@/components/layout/dashboard/Header'

export default async function Layout({ children }) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <Header />
      <main className='container mx-auto h-auto max-w-5xl flex-grow p-6'>{children}</main>
      <Footer />
    </div>
  )
}
