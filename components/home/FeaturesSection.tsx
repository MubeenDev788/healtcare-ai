'use client';

import { 
  MessageSquare, 
  Clock, 
  Shield, 
  Brain, 
  FileText, 
  Users,
  TrendingUp,
  Heart 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: MessageSquare,
    title: 'Intelligent Chat Interface',
    description: 'Conversational AI that understands your symptoms and medical concerns naturally.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Brain,
    title: 'Advanced Symptom Analysis',
    description: 'Machine learning algorithms analyze patterns to suggest possible conditions.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: FileText,
    title: 'Detailed Medical Reports',
    description: 'Comprehensive analysis with possible conditions, medications, and precautions.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Access medical insights anytime, anywhere, without waiting for appointments.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'End-to-end encryption ensures your medical data remains completely private.',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: TrendingUp,
    title: 'Health Tracking',
    description: 'Monitor your health trends and keep track of your medical consultations.',
    color: 'bg-indigo-100 text-indigo-600',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Better Health
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides comprehensive healthcare assistance 
            with cutting-edge technology and user-friendly features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm"
              >
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Successful Consultations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Available Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}