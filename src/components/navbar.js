"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut, Settings } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">©</span>
          </div>
          <span className="font-semibold text-xl">exclu</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
          Pricing
        </Link>
        <Link href="/faqs" className="text-gray-600 hover:text-gray-900">
          FAQs
        </Link>
        <Link href="/testimonials" className="text-gray-600 hover:text-gray-900">
          Testimonials
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.profilePicture || "/placeholder.svg"} alt={user?.username} />
                  <AvatarFallback className="bg-black text-white">
                    {user?.username?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end" forceMount>
              <div className="flex flex-col items-center p-4 space-y-3">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.profilePicture || "/placeholder.svg"} alt={user?.username} />
                  <AvatarFallback className="bg-black text-white text-2xl">
                    {user?.username?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center space-y-1">
                  <p className="font-semibold text-lg">{user?.username}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  {user?.bio && (
                    <p className="text-sm text-gray-600 max-w-xs text-center leading-relaxed">{user.bio}</p>
                  )}
                  {user?.description && (
                    <p className="text-sm text-gray-600 max-w-xs text-center leading-relaxed">{user.description}</p>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/${user?.role}`} className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href="/login">login</Link>
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}
