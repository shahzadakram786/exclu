import DashboardNavbar from '@/components/dashboard-navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderPlus, Upload } from 'lucide-react'
import React from 'react'

const ContentAgency = () => {
  return (
      <div className="min-h-screen bg-gray-50">
          <DashboardNavbar userRole="agency" />


          <main className="container mx-auto px-6 py-8">
              <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Agency Content Dashboard</h1>
                  <p className="text-gray-600">Manage your content and resources from here.</p>
              </div>  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                      <CardHeader>
                          <CardTitle>Content Library</CardTitle>
                          <CardDescription>Access and manage your content library</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <Button className="w-full">
                              <FolderPlus className="mr-2 h-4 w-4" />
                              Open Library
                          </Button>
                      </CardContent>
                  </Card>

                  <Card>
                      <CardHeader>
                          <CardTitle>Upload New Content</CardTitle>
                          <CardDescription>Upload new files to your content library</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <Button className="w-full">
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Content
                          </Button>
                      </CardContent>
                  </Card>

            </div>.
            </main>      
      </div>    
  )
}

export default ContentAgency