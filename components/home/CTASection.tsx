'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-green-900/20" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Take Control of Your Health?
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Join thousands of users who trust HealthAI for their medical consultations. 
          Get started today and experience the future of healthcare.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 group"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Your First Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/documentation">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
            >
              Learn More
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-blue-100 text-sm">
          <p>✓ No credit card required • ✓ Instant access • ✓ 100% secure</p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full -translate-x-36 -translate-y-36 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full translate-x-36 translate-y-36 animate-pulse animation-delay-1000" />
    </section>
  );
}