import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to exclu</h1>
          <p className="text-xl text-gray-600 mb-8">More sales. More control. 0% fees.</p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-black text-white hover:bg-gray-800" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
