export default function InteriorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interior Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Custom interior configurations for your shelter system
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Living Quarters</h3>
            <p className="text-gray-600">
              Comfortable living spaces with sleeping areas and amenities.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Workspace</h3>
            <p className="text-gray-600">
              Professional work environments with desks and equipment.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Storage</h3>
            <p className="text-gray-600">
              Organized storage solutions for equipment and supplies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
