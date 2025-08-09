'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Stethoscope, Brain, Shield } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
      <div className="absolute inset-0 bg-grid-slate-100 bg-[size:20px_20px] opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8 animate-fade-in">
            <Stethoscope className="w-4 h-4 mr-2" />
            AI-Powered Healthcare Consultations
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            Your Personal{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              AI Health
            </span>{' '}
            Assistant
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
            Get instant medical insights, symptom analysis, and personalized recommendations 
            from our advanced AI system. Available 24/7 for your healthcare needs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up animation-delay-400">
            <Link href="/chat">
              <Button size="lg" className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Start Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/documentation">
              <Button size="lg" variant="outline" className="px-8 py-3">
                Learn How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center animate-fade-in animation-delay-600">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">Advanced machine learning algorithms analyze your symptoms accurately</p>
            </div>
            
            <div className="text-center animate-fade-in animation-delay-700">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your medical information is encrypted and kept completely confidential</p>
            </div>
            
            <div className="text-center animate-fade-in animation-delay-800">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Stethoscope className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Available</h3>
              <p className="text-gray-600">Get instant medical insights whenever you need them, day or night</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-80 h-80 bg-blue-200 rounded-full opacity-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-80 h-80 bg-green-200 rounded-full opacity-10 animate-pulse animation-delay-1000" />
    </section>
  );
}