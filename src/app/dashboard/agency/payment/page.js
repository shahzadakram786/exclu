import DashboardNavbar from "@/components/dashboard-navbar";
import React from "react";

const PaymentAgency = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar userRole="agency" />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Agency Payment Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your payment settings and history.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
            <p className="text-gray-600 mb-2">
              Add or update your payment methods.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Payment Method
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Payment History</h2>
            <p className="text-gray-600 mb-2">View your recent transactions.</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              View History
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentAgency;
