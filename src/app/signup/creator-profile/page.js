"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload } from "lucide-react"

export default function CreatorProfilePage() {
  const [signupData, setSignupData] = useState(null)
  const [profilePicture, setProfilePicture] = useState(null)
  const [profilePreview, setProfilePreview] = useState(null)
  const [bio, setBio] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const data = sessionStorage.getItem("signupData")
    if (!data) {
      router.push("/signup")
      return
    }
    const parsedData = JSON.parse(data)
    if (parsedData.role !== "creator") {
      router.push("/signup")
      return
    }
    setSignupData(parsedData)
  }, [router])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePicture(file)
      const reader = new FileReader()
      reader.onload = (e) => setProfilePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleComplete = async (e) => {
    e.preventDefault()
    setError("")

    if (!profilePicture || !bio) {
      setError("Please upload a profile picture and add your bio")
      return
    }

    try {
      const completeUserData = {
        ...signupData,
        profilePicture: profilePreview,
        bio,
      }

      const newUser = await signup(completeUserData)
      console.log("Creator signup successful:", newUser)

      if (newUser) {
        sessionStorage.removeItem("signupData")
        setSuccess(true)

        setTimeout(() => {
          router.push("/login?message=Creator account created successfully! Please login to continue.")
        }, 2000)
      }
    } catch (error) {
      console.error("Creator signup error:", error)
      setError("Failed to create creator account. Please try again.")
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-white">Creator Account Created!</CardTitle>
              <p className="text-gray-400">Redirecting to login...</p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!signupData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
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
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/signup")}
                className="text-gray-400 hover:text-white p-1"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-xl font-bold text-white">Complete Your Creator Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleComplete} className="space-y-6">
              {error && <div className="text-red-400 text-sm text-center">{error}</div>}

              {/* Profile Picture Upload */}
              <div className="space-y-2">
                <Label className="text-gray-300">Profile Picture</Label>
                <div className="flex flex-col items-center space-y-4">
                  {profilePreview ? (
                    <div className="relative">
                      <img
                        src={profilePreview || "/placeholder.svg"}
                        alt="Profile preview"
                        className="w-32 h-32 rounded-lg object-cover border-2 border-gray-700"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center">
                      <Upload className="h-12 w-12 text-gray-500" />
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-300">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself and your content..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 min-h-[120px]"
                />
              </div>

              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                Complete Registration
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
