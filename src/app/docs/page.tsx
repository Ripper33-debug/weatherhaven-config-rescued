export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Technical documentation and user guides
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">User Manuals</h3>
            <p className="text-gray-600">
              Complete user guides for all our shelter systems.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Installation Guides</h3>
            <p className="text-gray-600">
              Step-by-step installation and setup instructions.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Technical Specs</h3>
            <p className="text-gray-600">
              Detailed technical specifications and data sheets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
