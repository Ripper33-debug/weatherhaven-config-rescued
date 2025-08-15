export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Terms and conditions for using our services
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md mt-12">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using our website and services, you accept and agree to be bound by 
              the terms and provision of this agreement.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily download one copy of the materials on our website 
              for personal, non-commercial transitory viewing only.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              The materials on our website are provided on an 'as is' basis. We make no warranties, 
              expressed or implied, and hereby disclaim and negate all other warranties including 
              without limitation, implied warranties or conditions of merchantability.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
            <p className="text-gray-600 mb-4">
              In no event shall we or our suppliers be liable for any damages arising out of the use 
              or inability to use the materials on our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
