'use client';

import Link from 'next/link';

export default function StickyCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/contact"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
      >
        Request a Quote
      </Link>
    </div>
  );
}
