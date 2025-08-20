"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings } from "lucide-react"

export default function DashboardNavbar({ userRole }) {
  const router = useRouter()
  const { logout, user } = useAuth()

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
        <Link href={`/dashboard/${userRole}`} className="text-gray-600 hover:text-gray-900">
          Dashboard
        </Link>
        {userRole === "creator" && (
          <>
              <Link href="/dashboard/agency/content" className="text-gray-600 hover:text-gray-900">
              Content
            </Link>
            <Link href="/dashboard/agency/payment" className="text-gray-600 hover:text-gray-900">
              Payment
            </Link>
            <Link href="/dashboard/agency/my-page" className="text-gray-600 hover:text-gray-900">
              My page
            </Link>
            <Link href="/dashboard/agency/Album" className="text-gray-600 hover:text-gray-900">
              Album
            </Link>
            <Link href="/dashboard/agency/agency" className="text-gray-600 hover:text-gray-900">
              Agency
            </Link>
            <Link href="/dashboard/agency/creator-request" className="text-gray-600 hover:text-gray-900">
              Creator 
            </Link>
            <button className=" hover:border-black hover:border hover:bg-white hover:text-black transition 4s pointer  bg-black text-lg text-white px-4 py-2 rounded-full">
              <Link href="/dashboard/agency/refer-friends" className="">
                Refer Friends
              </Link>
            </button>
          </>
        )}
        {userRole === "agency" && (
          <>
            <Link href="/dashboard/agency/content" className="text-gray-600 hover:text-gray-900">
              Content
            </Link>
            <Link href="/dashboard/agency/payment" className="text-gray-600 hover:text-gray-900">
              Payment
            </Link>
            <Link href="/dashboard/agency/my-page" className="text-gray-600 hover:text-gray-900">
              My page
            </Link>
            <Link href="/dashboard/agency/creators" className="text-gray-600 hover:text-gray-900">
              Creators
            </Link>
            <Link href="/dashboard/agency/agency" className="text-gray-600 hover:text-gray-900">
              Agency
            </Link>
            <Link href="/dashboard/agency/creator-request" className="text-gray-600 hover:text-gray-900">
              Creator Requests
            </Link>
            <button className=" hover:border-black hover:border hover:bg-white hover:text-black transition 4s pointer  bg-black text-lg text-white px-4 py-2 rounded-full">
              <Link href="/dashboard/agency/refer-friends" className="">
                Refer Friends
              </Link>
            </button>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
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
                {user?.bio && <p className="text-sm text-gray-600 max-w-xs text-center leading-relaxed">{user.bio}</p>}
                {user?.description && (
                  <p className="text-sm text-gray-600 max-w-xs text-center leading-relaxed">{user.description}</p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
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
      </div>
    </nav>
  )
}
