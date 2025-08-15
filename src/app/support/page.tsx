export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Technical support and customer service
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Technical Support</h3>
            <p className="text-gray-600">
              Get help with installation, maintenance, and troubleshooting.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
            <p className="text-gray-600">
              Contact our team for general inquiries and assistance.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Warranty</h3>
            <p className="text-gray-600">
              Information about product warranties and service coverage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
