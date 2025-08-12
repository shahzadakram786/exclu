"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault()
    console.log("Basic signup form submitted")
    setError("")

    if (!username || !email || !password || !role) {
      setError("Please fill in all fields")
      return
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    try {
      const basicSignupData = { username, email, password, role }
      sessionStorage.setItem("signupData", JSON.stringify(basicSignupData))

      // Redirect to role-specific profile setup
      if (role === "agency") {
        router.push("/signup/agency-profile")
      } else {
        router.push("/signup/creator-profile")
      }
    } catch (error) {
      console.error("Signup error:", error)
      setError("Failed to proceed. Please try again.")
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">©</span>
              </div>
              <span className="font-semibold text-xl text-white">exclu</span>
            </div>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-white">Account Created!</CardTitle>
              <CardDescription className="text-gray-400">
                Your account has been successfully created. Redirecting to login...
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">©</span>
            </div>
            <span className="font-semibold text-xl text-white">exclu</span>
          </div>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white">Welcome to your sign up page,</CardTitle>
            <CardDescription className="text-gray-400">More sales. More control. 0% fees.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Added error display */}
              {error && <div className="text-red-400 text-sm text-center">{error}</div>}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-300">
                  Role
                </Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="creator" className="text-white hover:bg-gray-700">
                      Creator
                    </SelectItem>
                    <SelectItem value="agency" className="text-white hover:bg-gray-700">
                      Agency
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={setAcceptTerms}
                  className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <Label htmlFor="terms" className="text-sm text-gray-400 leading-relaxed">
                  By using Exclu, you confirm that you accept all our communications related to your app usage (Sales
                  notifications, new subscribers... or updates messages from exclu at app)
                </Label>
              </div>

              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Have an Account?{" "}
                <Link href="/login" className="text-white hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
