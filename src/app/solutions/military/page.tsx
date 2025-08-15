import React from 'react';
import Link from 'next/link';

export default function MilitarySolutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
              <li>/</li>
              <li className="text-white">Military</li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Military Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Tactical, Deployable, and Reliable Shelter Systems for Defense Operations
            </p>
            <p className="text-lg text-gray-400 max-w-4xl mx-auto">
              Weatherhaven's military-grade shelter systems provide rapid deployment capabilities, 
              extreme weather resistance, and mission-critical reliability for defense forces worldwide.
            </p>
          </div>

          {/* Key Products */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Military Product Line</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-4">TRECC™</h3>
                <p className="text-gray-300 mb-4">
                  Tactical RedepLOYABLE Expandable Container Capability - Lightweight, 
                  extended-height expandable container for command posts and operations centers.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div>• Command Post Operations</div>
                  <div>• Medical Units</div>
                  <div>• Communications Hubs</div>
                  <div>• Living Quarters</div>
                </div>
                <Link 
                  href="/products/trecc" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Learn More
                </Link>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-4">HERCON™</h3>
                <p className="text-gray-300 mb-4">
                  High-capacity expandable container system designed for large-scale 
                  military operations and base camp deployments.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div>• Base Camp Operations</div>
                  <div>• Medical Facilities</div>
                  <div>• Equipment Storage</div>
                  <div>• Command Centers</div>
                </div>
                <Link 
                  href="/products" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Learn More
                </Link>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-4">MTS</h3>
                <p className="text-gray-300 mb-4">
                  Modular Tentage System providing flexible, scalable shelter solutions 
                  for various military applications and environments.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div>• Field Operations</div>
                  <div>• Training Facilities</div>
                  <div>• Emergency Response</div>
                  <div>• Temporary Bases</div>
                </div>
                <Link 
                  href="/products" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Military Applications */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Military Applications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-4">Command & Control</h3>
                <p className="text-gray-300 mb-4">
                  Advanced command post systems with integrated communications, 
                  power management, and situational awareness capabilities.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Integrated communications systems</li>
                  <li>• Real-time data displays</li>
                  <li>• Secure networking infrastructure</li>
                  <li>• Deployable workstations</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-4">Medical Operations</h3>
                <p className="text-gray-300 mb-4">
                  Field hospital and medical treatment facilities designed for 
                  rapid deployment and critical care operations.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Surgical suites</li>
                  <li>• Patient care areas</li>
                  <li>• Medical equipment integration</li>
                  <li>• Sterile environments</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-4">Logistics & Storage</h3>
                <p className="text-gray-300 mb-4">
                  Secure storage and logistics facilities for equipment, 
                  supplies, and mission-critical resources.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Climate-controlled storage</li>
                  <li>• Equipment maintenance areas</li>
                  <li>• Inventory management systems</li>
                  <li>• Security features</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-4">Living Quarters</h3>
                <p className="text-gray-300 mb-4">
                  Comfortable and secure living accommodations for military 
                  personnel in deployed environments.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Sleeping accommodations</li>
                  <li>• Dining facilities</li>
                  <li>• Recreational areas</li>
                  <li>• Sanitation systems</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Military Certifications</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold text-white mb-2">MIL-STD-810G</h3>
                <p className="text-gray-300">Environmental engineering considerations and laboratory tests</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-white mb-2">MIL-STD-461</h3>
                <p className="text-gray-300">Electromagnetic interference characteristics</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-white mb-2">Security Standards</h3>
                <p className="text-gray-300">Meeting military security and classification requirements</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link 
              href="/configurator" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors mr-4"
            >
              Configure Military Solutions
            </Link>
            <Link 
              href="/contact" 
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Contact Military Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
