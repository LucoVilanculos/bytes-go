import { Outlet } from 'react-router-dom'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20 md:pt-28 
        bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400
        dark:from-[#181f3a] dark:via-[#22305a] dark:to-[#2b4170]"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
