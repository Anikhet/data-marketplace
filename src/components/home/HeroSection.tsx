'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-24 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 opacity-20 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 blur-3xl rounded-full mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight"
        >
          The Data Marketplace for <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Hard-to-Find Leads</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-5 text-lg text-gray-600"
        >
          Buy, sell, and request exclusive B2B contact lists enriched by AI. Verified, GTM-ready, and built for urgency — powered by Peeker’s scraping infrastructure.
        </motion.p>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <input
            type="text"
            placeholder="e.g. Founders at YC SaaS startups, Web3 investors, HR leads"
            className="px-5 py-3 rounded-lg text-gray-800 w-full sm:w-96 shadow-md focus:outline-none border border-gray-300 bg-white placeholder-gray-500"
          />
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md">
            Smart Search
          </Button>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-6 flex flex-wrap justify-center gap-4"
        >
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 font-medium">
            Become a Seller
          </Button>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
            Request a Custom List →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
