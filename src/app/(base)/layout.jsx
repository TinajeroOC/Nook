import Footer from '@/components/layout/base/Footer'
import Header from '@/components/layout/base/Header'
import { initPocketBaseServer } from '@/lib/pocketbase/server'

export default async function Layout({ children }) {
  const pb = await initPocketBaseServer()
  const user = pb.authStore.model

  return (
    <div className='relative flex min-h-screen flex-col'>
      <Header user={user} />
      <main className='container mx-auto flex h-auto max-w-5xl flex-grow flex-col justify-center gap-12 p-6'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
