export default function ResearchSolutionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Research Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Specialized shelter systems for research and development
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Field Research</h3>
            <p className="text-gray-600">
              Mobile laboratories and research stations for field work.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Climate Studies</h3>
            <p className="text-gray-600">
              Weather-resistant shelters for environmental research.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Remote Monitoring</h3>
            <p className="text-gray-600">
              Automated monitoring stations for remote locations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
