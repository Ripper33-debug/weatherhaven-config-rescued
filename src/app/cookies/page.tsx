export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            How we use cookies and similar technologies
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md mt-12">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
            <p className="text-gray-600 mb-4">
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience and understand how you use our site.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies to remember your preferences, analyze site traffic, and provide 
              personalized content and advertisements.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Types of Cookies</h2>
            <p className="text-gray-600 mb-4">
              We use essential cookies for basic site functionality, analytics cookies to understand 
              usage patterns, and marketing cookies for personalized advertising.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="text-gray-600 mb-4">
              You can control and manage cookies through your browser settings. However, disabling 
              certain cookies may affect the functionality of our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
