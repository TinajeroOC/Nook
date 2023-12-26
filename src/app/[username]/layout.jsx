import Footer from '@/components/layout/username/Footer'

export default async function Layout({ children }) {
  return (
    <div className='relative flex flex-col'>
      <main className='container mx-auto min-h-[calc(100vh_-_56px)] max-w-xl flex-grow p-6'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
