export default function CustomProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Custom Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Tailored shelter solutions for your specific requirements
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Design Consultation</h3>
            <p className="text-gray-600">
              Work with our engineers to design your perfect shelter.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Custom Features</h3>
            <p className="text-gray-600">
              Add specialized features and modifications to meet your needs.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Integration</h3>
            <p className="text-gray-600">
              Seamless integration with existing systems and equipment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
