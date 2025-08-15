export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Careers
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our team and help build the future of shelter solutions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Engineering</h3>
            <p className="text-gray-600">
              Mechanical, electrical, and structural engineering positions.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Manufacturing</h3>
            <p className="text-gray-600">
              Production, quality control, and assembly roles.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Sales & Support</h3>
            <p className="text-gray-600">
              Customer service, sales, and technical support positions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
