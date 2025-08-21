import DashboardNavbar from "@/components/dashboard-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Building, Users, Target } from "lucide-react"

const MyPageAgency = () => {
  return (
     <div className="min-h-screen bg-gray-50">
          <DashboardNavbar userRole="agency" />
            <main className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Page</h1>
                    <p className="text-gray-600">Manage your profile and settings.</p>
                </div>
    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Settings</CardTitle>
                            <CardDescription>Update your profile information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">
                                Edit Profile
                            </Button>
                        </CardContent>
                    </Card>
    
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Security</CardTitle>
                            <CardDescription>Manage your account security settings</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">
                                Security Settings
                            </Button>
                        </CardContent>
                    </Card>
    
                </div>
            </main>
        </div>    
  )
}

export default MyPageAgency