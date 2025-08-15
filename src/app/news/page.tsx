export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            News & Updates
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Latest news and updates from Weatherhaven
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Product Launches</h3>
            <p className="text-gray-600">
              Stay updated on our latest shelter solutions and innovations.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Company News</h3>
            <p className="text-gray-600">
              Important announcements and company developments.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Industry Insights</h3>
            <p className="text-gray-600">
              Expert analysis and insights into the shelter industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
