import Link from 'next/link';
import { Facebook, Twitter, Linkedin, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-white text-gray-600 px-6 py-10 mt-10 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Branding */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Peeker Marketplace</h3>
          <p>Verified data. Real connections. Built for modern teams.</p>
          <div className="flex mt-4 space-x-3 text-gray-400">
            <Facebook className="h-5 w-5 hover:text-blue-500" />
            <Twitter className="h-5 w-5 hover:text-sky-400" />
            <Linkedin className="h-5 w-5 hover:text-blue-600" />
          </div>
        </div>

        {/* Middle: Navigation */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQs</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Right: Trust + Contact */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-2">We&apos;re here to help</h4>
          <p>Email us at <a href="mailto:support@peeker.ai" className="text-orange-600 hover:underline">support@peeker.ai</a></p>
          <div className="flex items-center space-x-2 mt-4">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <span>GDPR & CCPA Compliant</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 border-t pt-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Peeker AI. All rights reserved.
      </div>
    </footer>
  );
}
