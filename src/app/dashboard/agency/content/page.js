"use client"

import { useState, useEffect } from "react"
import DashboardNavbar from "@/components/dashboard-navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, X, Upload, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ContentPage() {
  // Stores the title input for new content
  const [title, setTitle] = useState("")
  // Array of uploaded files with preview URLs
  const [uploadedFiles, setUploadedFiles] = useState([])
  // Price for the content as string to handle decimal input
  const [price, setPrice] = useState("0.00")
  // Controls link type selection modal visibility
  const [showLinkModal, setShowLinkModal] = useState(false)
  // Controls success modal after link generation
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  // Either "single" or "multiple" use link type
  const [linkType, setLinkType] = useState("single")
  // The generated payment link URL
  const [generatedLink, setGeneratedLink] = useState("")
  // Array of all created content items
  const [monetizedContent, setMonetizedContent] = useState([])

  useEffect(() => {
    console.log("[v0] Content page mounted, loading data from localStorage")

    console.log("[v0] Raw localStorage value:", localStorage.getItem("monetizedContent"))

    const loadFromLocalStorage = () => {
      try {
        const savedContent = localStorage.getItem("monetizedContent")
        console.log("[v0] Raw saved content:", savedContent)

        if (savedContent && savedContent !== "undefined" && savedContent !== "null") {
          const parsedContent = JSON.parse(savedContent)
          console.log("[v0] Parsed content:", parsedContent)
          console.log("[v0] Content is array:", Array.isArray(parsedContent))
          console.log("[v0] Content length:", parsedContent.length)
          setMonetizedContent(parsedContent)
        } else {
          console.log("[v0] No valid content found, setting empty array")
          setMonetizedContent([])
        }
      } catch (error) {
        console.error("[v0] Error loading from localStorage:", error)
        setMonetizedContent([])
      }
    }

    // Load data on component mount
    loadFromLocalStorage()
  }, [])

  useEffect(() => {
    const handleFocus = () => {
      console.log("[v0] Window focused, checking localStorage")
      console.log("[v0] Current state length:", monetizedContent.length)

      try {
        const savedContent = localStorage.getItem("monetizedContent")
        console.log("[v0] Raw localStorage on focus:", savedContent)

        if (savedContent && savedContent !== "undefined" && savedContent !== "null") {
          const parsedContent = JSON.parse(savedContent)
          console.log("[v0] Parsed content on focus:", parsedContent)

          // Only update if the data is different
          if (JSON.stringify(parsedContent) !== JSON.stringify(monetizedContent)) {
            console.log("[v0] Data changed, updating state")
            setMonetizedContent(parsedContent)
          } else {
            console.log("[v0] Data unchanged, keeping current state")
          }
        } else {
          console.log("[v0] No valid content on focus, clearing state")
          setMonetizedContent([])
        }
      } catch (error) {
        console.error("[v0] Error reloading from localStorage on focus:", error)
      }
    }

    window.addEventListener("focus", handleFocus)

    return () => {
      window.removeEventListener("focus", handleFocus)
    }
  }, [monetizedContent]) // Add monetizedContent as dependency to compare changes

  useEffect(() => {
    console.log("[v0] Monetized content state changed, saving to localStorage")
    console.log("[v0] Current content:", monetizedContent)
    console.log("[v0] Content length:", monetizedContent.length)

    try {
      const jsonString = JSON.stringify(monetizedContent)
      console.log("[v0] JSON string to save:", jsonString)
      localStorage.setItem("monetizedContent", jsonString)

      const verification = localStorage.getItem("monetizedContent")
      console.log("[v0] Verification - saved successfully:", verification === jsonString)
    } catch (error) {
      console.error("[v0] Error saving to localStorage:", error)
    }
  }, [monetizedContent])

  const handleFileUpload = (event) => {
    console.log("[v0] Files selected for upload")

    // Convert FileList to regular array for easier manipulation
    const files = Array.from(event.target.files)

    // Create file objects with preview URLs and unique IDs
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(), // Unique ID for each file
      name: file.name, // Original filename
      url: URL.createObjectURL(file), // Create blob URL for preview
      type: file.type, // MIME type (image/jpeg, video/mp4, etc.)
    }))

    console.log("[v0] Created file objects:", newFiles)

    // Add new files to existing uploaded files array
    setUploadedFiles([...uploadedFiles, ...newFiles])
  }

  const removeFile = (fileId) => {
    console.log("[v0] Removing file with ID:", fileId)

    // Filter out the file with the specified ID
    const updatedFiles = uploadedFiles.filter((file) => file.id !== fileId)
    setUploadedFiles(updatedFiles)
  }

  const handleGenerateLink = () => {
    console.log("[v0] Generate link button clicked")
    console.log("[v0] Current state - Title:", title, "Files:", uploadedFiles.length, "Price:", price)

    // Validate that all required fields are filled
    if (title && uploadedFiles.length > 0 && Number.parseFloat(price) > 0) {
      console.log("[v0] Validation passed, showing link modal")
      setShowLinkModal(true)
    } else {
      console.log("[v0] Validation failed - missing required fields")
    }
  }

  const handleCreateLink = () => {
    console.log("[v0] Creating payment link with type:", linkType)

    // Generate the payment link URL
    const link = `https://exclu.at/pay_cont`
    setGeneratedLink(link)

    // Close link selection modal and show success modal
    setShowLinkModal(false)
    setShowSuccessModal(true)

    // Create new content object with all necessary data
    const newContent = {
      id: Date.now(), // Unique identifier
      title, // Content title from form
      price: Number.parseFloat(price), // Convert price string to number
      files: uploadedFiles, // Array of uploaded files
      linkType, // Single or multiple use
      createdAt: new Date().toLocaleDateString("en-US", { day: "numeric", month: "short" }), // Formatted date
      views: 0, // Initialize analytics
      sales: 0,
      earned: 0,
      link: link, // The generated payment link
    }

    console.log("[v0] Created new content object:", newContent)

    // Add new content to the monetized content array
    // This will trigger the useEffect that saves to localStorage
    setMonetizedContent([...monetizedContent, newContent])
  }

  const handleCloseSuccess = () => {
    console.log("[v0] Closing success modal and resetting form")

    setShowSuccessModal(false)

    // Reset all form fields to initial state
    setTitle("")
    setUploadedFiles([])
    setPrice("0.00")

    console.log("[v0] Form reset complete")
  }

  const updateContentPrice = (contentId, newPrice) => {
    console.log("[v0] Updating price for content ID:", contentId, "to:", newPrice)

    // Update the price for the specific content item
    const updatedContent = monetizedContent.map((content) =>
      content.id === contentId ? { ...content, price: Number.parseFloat(newPrice) } : content,
    )

    // This will trigger the useEffect that saves to localStorage
    setMonetizedContent(updatedContent)
  }

  const deleteContent = (contentId) => {
    console.log("[v0] Deleting content with ID:", contentId)

    // Remove the content item from the array
    const updatedContent = monetizedContent.filter((content) => content.id !== contentId)

    // This will trigger the useEffect that saves to localStorage
    setMonetizedContent(updatedContent)
  }

  // Check if all required fields are filled to enable the generate link button
  const canGenerateLink = title && uploadedFiles.length > 0 && Number.parseFloat(price) > 0

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar userRole="agency" />

      <div className="max-w-4xl mx-auto p-6">
        {/* Main Content Upload Section */}
        <Card className="bg-gray-800 text-white p-8 mb-8">
          <div className="text-center space-y-6">
            {/* Title Input */}
            <div>
              <h2 className="text-xl font-medium mb-4">Enter your Title</h2>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 max-w-md mx-auto"
                placeholder="Enter title..."
              />
            </div>

            {/* File Upload Section */}
            <div>
              <div className="mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-xl font-medium mb-2">Add Content</h3>
                <p className="text-gray-400 mb-4">Select your desired photos or videos</p>
              </div>

              {/* Uploaded Files Display */}
              {uploadedFiles.length > 0 && (
                <div className="flex flex-wrap gap-4 justify-center mb-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="relative">
                      <div className="w-32 h-32 bg-gray-700 rounded-lg overflow-hidden">
                        {file.type.startsWith("image/") ? (
                          <img
                            src={file.url || "/placeholder.svg"}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Upload className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-center">
                <label className="cursor-pointer">
                  <input type="file" multiple accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
                  <div className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <Upload className="w-4 h-4" />
                    <span>Add more</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Price Setting */}
            <div>
              <h3 className="text-xl font-medium mb-4">Set your price</h3>
              <div className="max-w-xs mx-auto">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">$</span>
                  <Input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white text-center text-lg py-3 pl-8"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Generate Link Button */}
            <Button
              onClick={handleGenerateLink}
              disabled={!canGenerateLink}
              className={`px-8 py-3 rounded-full text-lg font-medium ${
                canGenerateLink
                  ? "bg-white text-gray-800 hover:bg-gray-100"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Add and generate link
            </Button>
          </div>
        </Card>

        {/* Monetized Content Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Monetized Content</h2>

          {monetizedContent.length === 0 ? (
            <Card className="bg-gray-800 text-white p-12 text-center">
              <h3 className="text-xl font-medium mb-2">No content created yet</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Use the "Add content" button above to upload your photos and videos and get started. Once added, you can
                organize your content with albums
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {monetizedContent.map((content) => (
                <Card key={content.id} className="bg-gray-800 text-white p-4">
                  <div className="flex items-center gap-4">
                    {/* Content Preview */}
                    <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      {content.files[0]?.type.startsWith("image/") ? (
                        <img
                          src={content.files[0].url || "/placeholder.svg"}
                          alt={content.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Content Info */}
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{content.title}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                            $
                          </span>
                          <Input
                            type="number"
                            step="0.01"
                            value={content.price}
                            onChange={(e) => updateContentPrice(content.id, e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white w-24 pl-6 py-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => deleteContent(content.id)} className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Link Type Selection Modal */}
      <Dialog open={showLinkModal} onOpenChange={setShowLinkModal}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
          <div className="flex justify-between items-center mb-6">
            <DialogTitle className="text-xl font-medium">Link Options</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLinkModal(false)}
              className="text-white hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Single Use Option */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-600">
              <div>
                <h3 className="font-medium">Single use click</h3>
                <p className="text-sm text-gray-400">Can be viewed once per payment</p>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                {linkType === "single" && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
              </div>
            </div>

            {/* Multiple Use Option */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-600">
              <div>
                <h3 className="font-medium">Multiple use-link</h3>
                <p className="text-sm text-gray-400">May be viewed multiple times per payment</p>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center">
                {linkType === "multiple" && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="flex justify-center">
              <Switch
                checked={linkType === "multiple"}
                onCheckedChange={(checked) => setLinkType(checked ? "multiple" : "single")}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleCreateLink}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-medium"
            >
              Generate Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
          <div className="flex justify-between items-center mb-6">
            <DialogTitle className="text-xl font-medium">Perfect, you're ready.</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleCloseSuccess} className="text-white hover:bg-gray-700">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center space-y-6">
            <p className="text-gray-400">You can share your link with your clients and get paid.</p>

            {/* Generated Link */}
            <div className="flex items-center gap-2 bg-gray-700 rounded-full px-4 py-2">
              <Input value={generatedLink} readOnly className="bg-transparent border-none text-white flex-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigator.clipboard.writeText(generatedLink)}
                className="text-white hover:bg-gray-600"
              >
                Copy
              </Button>
            </div>

            <p className="text-sm text-gray-400">Number of files: {uploadedFiles.length}</p>

            {/* Content Preview */}
            <div className="relative mx-auto w-48 h-32 bg-gray-700 rounded-lg overflow-hidden">
              {uploadedFiles[0]?.type.startsWith("image/") ? (
                <img
                  src={uploadedFiles[0].url || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <button
                onClick={handleCloseSuccess}
                className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
