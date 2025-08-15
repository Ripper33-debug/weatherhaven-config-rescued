export default function IndustrialSolutionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Industrial Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Robust shelter solutions for industrial applications
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Manufacturing</h3>
            <p className="text-gray-600">
              Temporary and permanent shelter solutions for manufacturing operations.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Mining</h3>
            <p className="text-gray-600">
              Durable shelters for mining operations in harsh environments.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Construction</h3>
            <p className="text-gray-600">
              Mobile and modular solutions for construction sites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
