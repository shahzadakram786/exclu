import DashboardNavbar from "@/components/dashboard-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Building, Users, Target } from "lucide-react"
const CreatorRequestAgency = () => {
  return (
   <div className="min-h-screen bg-gray-50">
          <DashboardNavbar userRole="agency" />
          
          <main className="container mx-auto px-6 py-8">    
            
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Creator Requests</h1>
                    <p className="text-gray-600">Manage requests from creators to join your agency.</p>
                </div>  

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Requests</CardTitle>
                            <CardDescription>Review and approve or reject creator requests</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">
                                <Plus className="mr-2 h-4 w-4" />
                                View Requests
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Approved Creators</CardTitle>
                            <CardDescription>View creators who have been approved to join your agency</CardDescription>
                        </CardHeader>           
                        <CardContent>
                            <Button className="w-full">
                                <Users className="mr-2 h-4 w-4" />
                                View Approved Creators
                            </Button>
                        </CardContent>
                    </Card>
                </div>

            </main>
        </div>  
            
            )
}

export default CreatorRequestAgency