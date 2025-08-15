export default function DisasterReliefPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Disaster Relief Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Rapid deployment shelter systems for emergency response
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Emergency Response</h3>
            <p className="text-gray-600">
              Quick-deploy shelters for immediate disaster response operations.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Medical Facilities</h3>
            <p className="text-gray-600">
              Mobile medical units and field hospitals for disaster zones.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Command Centers</h3>
            <p className="text-gray-600">
              Emergency command and control centers for coordination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
