import React from 'react';
import Link from 'next/link';

export default function TreccProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li>/</li>
              <li className="text-white">TRECC</li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              TRECC™
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              TACTICAL REDEPLOYABLE EXPANDABLE CONTAINER CAPABILITY™
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Lightweight, extended-height expandable container known for its unmatched capability 
              and versatile shipping configuration. Perfect for military, government, and industrial applications.
            </p>
          </div>

          {/* Specifications */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-white mb-4">Deployed Specifications</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Length:</span>
                  <span className="font-mono">14.3 ft (171.4")</span>
                </div>
                <div className="flex justify-between">
                  <span>Width:</span>
                  <span className="font-mono">7.1 ft (85.4")</span>
                </div>
                <div className="flex justify-between">
                  <span>Height:</span>
                  <span className="font-mono">7.9 ft (94.3")</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight:</span>
                  <span className="font-mono">2,300 lbs (1,040 kg)</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Payload:</span>
                  <span className="font-mono">2,700 lbs (1,210 kg)</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-white mb-4">Stowed Specifications</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Length:</span>
                  <span className="font-mono">7.0 ft (84.0")</span>
                </div>
                <div className="flex justify-between">
                  <span>Width:</span>
                  <span className="font-mono">7.1 ft (85.4")</span>
                </div>
                <div className="flex justify-between">
                  <span>Height:</span>
                  <span className="font-mono">4.8 ft (57.6")</span>
                </div>
                <div className="flex justify-between">
                  <span>Setup Time:</span>
                  <span className="font-mono">15-20 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Capacity:</span>
                  <span className="font-mono">Command post operations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🔋</div>
                <h3 className="text-xl font-semibold text-white mb-2">Power System</h3>
                <p className="text-gray-300">24V compatible with 2kW generator capacity and 460W solar array</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🌡️</div>
                <h3 className="text-xl font-semibold text-white mb-2">Climate Control</h3>
                <p className="text-gray-300">HVAC system with 24V AC unit and 800W electric heater</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🖥️</div>
                <h3 className="text-xl font-semibold text-white mb-2">Command Display</h3>
                <p className="text-gray-300">55" command display with deployable workstations</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link 
              href="/configurator" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors mr-4"
            >
              Configure TRECC
            </Link>
            <Link 
              href="/contact" 
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
