"use client"

import { useState, useEffect } from "react"
import DashboardNavbar from "@/components/dashboard-navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Eye, ShoppingCart, Copy, Trash2, Upload } from "lucide-react"

export default function PaymentPage() {
  const [paymentLinks, setPaymentLinks] = useState([]) // Array of payment links created from content page

  useEffect(() => {
    console.log("[v0] Payment page mounted, loading data from localStorage")

    console.log("[v0] Raw localStorage value:", localStorage.getItem("monetizedContent"))

    try {
      const savedContent = localStorage.getItem("monetizedContent")
      console.log("[v0] Raw saved content:", savedContent)

      if (savedContent && savedContent !== "undefined" && savedContent !== "null") {
        const parsedContent = JSON.parse(savedContent)
        console.log("[v0] Parsed payment links:", parsedContent)
        console.log("[v0] Links is array:", Array.isArray(parsedContent))
        console.log("[v0] Links length:", parsedContent.length)
        setPaymentLinks(parsedContent)
      } else {
        console.log("[v0] No valid payment links found")
        setPaymentLinks([])
      }
    } catch (error) {
      console.error("[v0] Error loading payment links from localStorage:", error)
      setPaymentLinks([])
    }
  }, []) // Empty dependency array means this runs once when component mounts

  useEffect(() => {
    const handleFocus = () => {
      console.log("[v0] Payment page focused, checking for localStorage updates")
      console.log("[v0] Current payment links length:", paymentLinks.length)

      try {
        const savedContent = localStorage.getItem("monetizedContent")
        console.log("[v0] Raw localStorage on focus:", savedContent)

        if (savedContent && savedContent !== "undefined" && savedContent !== "null") {
          const parsedContent = JSON.parse(savedContent)
          console.log("[v0] Parsed content on focus:", parsedContent)

          // Only update if the data is different
          if (JSON.stringify(parsedContent) !== JSON.stringify(paymentLinks)) {
            console.log("[v0] Payment data changed, updating state")
            setPaymentLinks(parsedContent)
          } else {
            console.log("[v0] Payment data unchanged, keeping current state")
          }
        } else {
          console.log("[v0] No valid content on focus, clearing payment links")
          setPaymentLinks([])
        }
      } catch (error) {
        console.error("[v0] Error reloading payment links from localStorage on focus:", error)
      }
    }

    window.addEventListener("focus", handleFocus)

    return () => {
      window.removeEventListener("focus", handleFocus)
    }
  }, [paymentLinks]) // Add paymentLinks as dependency

  const copyLink = (link) => {
    console.log("[v0] Copying link to clipboard:", link)

    // Use the browser's clipboard API to copy the link
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log("[v0] Link copied successfully")
        // You could add a toast notification here
      })
      .catch((error) => {
        console.error("[v0] Failed to copy link:", error)
      })
  }

  const removeLink = (linkId) => {
    console.log("[v0] Removing payment link with ID:", linkId)
    console.log("[v0] Current links before removal:", paymentLinks)

    const updatedLinks = paymentLinks.filter((link) => link.id !== linkId)
    console.log("[v0] Updated links after removal:", updatedLinks)

    setPaymentLinks(updatedLinks)

    try {
      const jsonString = JSON.stringify(updatedLinks)
      console.log("[v0] Saving updated links to localStorage:", jsonString)
      localStorage.setItem("monetizedContent", jsonString)

      const verification = localStorage.getItem("monetizedContent")
      console.log("[v0] Verification - removal saved successfully:", verification === jsonString)
    } catch (error) {
      console.error("[v0] Error updating localStorage:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar userRole="agency" />

      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Payment links</h1>
            <span className="text-gray-500">Payment Settings</span>
          </div>

          <Button className="bg-gray-800 text-white hover:bg-gray-700 rounded-full px-6">
            <Plus className="w-4 h-4 mr-2" />
            Add new payment link
          </Button>
        </div>

        {paymentLinks.length === 0 ? (
          <Card className="bg-gray-800 text-white p-12 text-center">
            <h3 className="text-xl font-medium mb-2">No payment links created yet</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Go to the Content page to upload your photos and videos and generate payment links. Once created, they
              will appear here with analytics and management options.
            </p>
          </Card>
        ) : (
          /* Payment Links Grid */
          <div className="grid gap-4">
            {paymentLinks.map((link) => (
              <Card key={link.id} className="bg-gray-800 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      {link.files && link.files[0]?.type.startsWith("image/") ? (
                        <img
                          src={link.files[0].url || "/placeholder.svg"}
                          alt={link.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // If image fails to load, show placeholder
                            e.target.style.display = "none"
                            e.target.nextSibling.style.display = "flex"
                          }}
                        />
                      ) : null}
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ display: link.files && link.files[0]?.type.startsWith("image/") ? "none" : "flex" }}
                      >
                        <Upload className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium mb-2">{link.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">Created: {link.createdAt}</p>

                      <div className="flex items-center gap-6 text-sm">
                        {/* Views counter - tracks how many times the link was accessed */}
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span>Views: {link.views}</span>
                        </div>
                        {/* Sales counter - tracks successful purchases */}
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          <span>Sales: {link.sales}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold mb-2">${link.earned}</div>
                    <div className="text-gray-400 text-sm mb-4">Earned</div>

                    <div className="flex gap-2">
                      {/* Copy link button - copies the payment URL to clipboard */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyLink(link.link)}
                        className="border-gray-600 text-white hover:bg-gray-700"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                      {/* Remove link button - deletes the payment link and syncs with content page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeLink(link.id)}
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove link
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
