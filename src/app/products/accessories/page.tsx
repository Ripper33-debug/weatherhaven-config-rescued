export default function AccessoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Accessories
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Essential accessories and components for your shelter system
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Power Systems</h3>
            <p className="text-gray-600">
              Solar panels, generators, and power management solutions.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Climate Control</h3>
            <p className="text-gray-600">
              Heating, ventilation, and air conditioning systems.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Storage Solutions</h3>
            <p className="text-gray-600">
              Modular storage units and organizational systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
