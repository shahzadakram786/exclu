"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X } from "lucide-react"

export default function AgencyProfilePage() {
  const [signupData, setSignupData] = useState(null)
  const [profilePicture, setProfilePicture] = useState(null)
  const [profilePreview, setProfilePreview] = useState(null)
  const [agencyName, setAgencyName] = useState("")
  const [agencyId, setAgencyId] = useState("")
  const [markets, setMarkets] = useState([])
  const [newMarket, setNewMarket] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [description, setDescription] = useState("")
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
    if (parsedData.role !== "agency") {
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

  const addMarket = () => {
    if (newMarket.trim() && !markets.includes(newMarket.trim())) {
      setMarkets([...markets, newMarket.trim()])
      setNewMarket("")
    }
  }

  const removeMarket = (marketToRemove) => {
    setMarkets(markets.filter((market) => market !== marketToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addMarket()
    }
  }

  const handleComplete = async (e) => {
    e.preventDefault()
    setError("")

    if (!profilePicture || !agencyName || !agencyId || markets.length === 0 || !serviceType || !description) {
      setError("Please fill in all fields and upload a profile picture")
      return
    }

    try {
      const completeUserData = {
        ...signupData,
        profilePicture: profilePreview,
        agencyName,
        agencyId,
        markets,
        serviceType,
        description,
      }

      const newUser = await signup(completeUserData)
      console.log("Agency signup successful:", newUser)

      if (newUser) {
        sessionStorage.removeItem("signupData")
        setSuccess(true)

        setTimeout(() => {
          router.push("/login?message=Agency account created successfully! Please login to continue.")
        }, 2000)
      }
    } catch (error) {
      console.error("Agency signup error:", error)
      setError("Failed to create agency account. Please try again.")
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-white">Agency Account Created!</CardTitle>
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
              <CardTitle className="text-xl font-bold text-white">Complete Your Agency Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleComplete} className="space-y-4">
              {error && <div className="text-red-400 text-sm text-center">{error}</div>}

              {/* Profile Picture Upload */}
              <div className="space-y-2">
                <Label className="text-gray-300">Profile Picture</Label>
                <div className="flex flex-col items-center space-y-2">
                  {profilePreview ? (
                    <div className="relative">
                      <img
                        src={profilePreview || "/placeholder.svg"}
                        alt="Profile preview"
                        className="w-24 h-24 rounded-lg object-cover border-2 border-gray-700"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-500" />
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

              {/* Agency Name */}
              <div className="space-y-2">
                <Label htmlFor="agencyName" className="text-gray-300">
                  Agency Name
                </Label>
                <Input
                  id="agencyName"
                  type="text"
                  placeholder="Your agency name"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
              </div>

              {/* Agency ID */}
              <div className="space-y-2">
                <Label htmlFor="agencyId" className="text-gray-300">
                  Agency ID
                </Label>
                <Input
                  id="agencyId"
                  type="text"
                  placeholder="Unique agency identifier"
                  value={agencyId}
                  onChange={(e) => setAgencyId(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
              </div>

              {/* Markets */}
              <div className="space-y-2">
                <Label className="text-gray-300">Target Markets</Label>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Add market (e.g., Spanish Market)"
                    value={newMarket}
                    onChange={(e) => setNewMarket(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addMarket}
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {markets.map((market, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-700 text-white">
                      {market}
                      <button type="button" onClick={() => removeMarket(market)} className="ml-1 hover:text-red-400">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Service Type */}
              <div className="space-y-2">
                <Label htmlFor="serviceType" className="text-gray-300">
                  Type of Service
                </Label>
                <Input
                  id="serviceType"
                  type="text"
                  placeholder="What services do you provide?"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Why should models select you?
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your agency and what makes you unique..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
