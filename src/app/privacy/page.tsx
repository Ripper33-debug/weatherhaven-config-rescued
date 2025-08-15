export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            How we protect and handle your information
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md mt-12">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly to us, such as when you contact us, 
              request a quote, or sign up for our services.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to provide, maintain, and improve our services, 
              communicate with you, and develop new products and services.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
