import UserFooter from '@/components/layouts/Footer/UserFooter'

export default function NookLayout({ children }) {
  return (
    <div className='relative flex flex-col'>
      <main className='container mx-auto min-h-[calc(100vh_-_93px)] max-w-xl flex-grow p-8'>
        {children}
      </main>
      <UserFooter />
    </div>
  )
}
