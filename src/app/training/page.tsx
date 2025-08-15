export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Training
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional training programs for shelter systems
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Operator Training</h3>
            <p className="text-gray-600">
              Learn how to safely operate and maintain shelter systems.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Installation Training</h3>
            <p className="text-gray-600">
              Professional training for proper installation procedures.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Certification</h3>
            <p className="text-gray-600">
              Get certified as a Weatherhaven shelter specialist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
