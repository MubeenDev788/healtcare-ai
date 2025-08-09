'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  MessageSquare,
  Brain,
  Shield,
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle,
  Heart,
  User,
  Bot,
  Search,
  History
} from 'lucide-react';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-2xl">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Use HealthAI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete guide to getting the most out of your AI-powered healthcare consultations
          </p>
        </div>

        <div className="space-y-8">
          {/* Getting Started */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Create Your Account</h3>
                  <p className="text-gray-600 mb-3">
                    Sign up with your email address to start using HealthAI. Your account keeps your 
                    consultation history secure and private.
                  </p>
                  <Link href="/register">
                    <Button size="sm">Create Account</Button>
                  </Link>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Start a Consultation</h3>
                  <p className="text-gray-600 mb-3">
                    Click "Start Consultation" to begin chatting with our AI. Describe your symptoms 
                    naturally as you would to a doctor.
                  </p>
                  <Link href="/chat">
                    <Button size="sm" variant="outline">Try Now</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Describe Symptoms */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                How to Describe Your Symptoms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                The more detailed and accurate your symptom description, the better our AI can help you. 
                Here's how to provide the most useful information:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-green-800 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Do Include
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• <strong>Location:</strong> Where exactly do you feel pain or discomfort?</li>
                    <li>• <strong>Duration:</strong> How long have you had these symptoms?</li>
                    <li>• <strong>Intensity:</strong> Rate pain on a scale of 1-10</li>
                    <li>• <strong>Timing:</strong> When do symptoms occur? (morning, after eating, etc.)</li>
                    <li>• <strong>Triggers:</strong> What makes it better or worse?</li>
                    <li>• <strong>Associated symptoms:</strong> Fever, nausea, fatigue, etc.</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-red-800 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Avoid Vague Descriptions
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• "I don't feel well"</li>
                    <li>• "Something is wrong"</li>
                    <li>• "I hurt everywhere"</li>
                    <li>• "It's been a while"</li>
                  </ul>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Example:</strong> "I have a sharp headache on the left side of my head 
                      for the past 2 days. It gets worse with bright lights and I feel nauseous. 
                      Pain level is about 7/10."
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding AI Responses */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Bot className="h-6 w-6 text-purple-600" />
                </div>
                Understanding AI Responses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                Our AI provides comprehensive analysis in an easy-to-understand format:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Possible Conditions</h3>
                  <p className="text-sm text-blue-800">
                    List of potential medical conditions that match your symptoms, 
                    ranked by likelihood based on AI analysis.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Recommended Care</h3>
                  <p className="text-sm text-green-800">
                    Suggested treatments, medications, and self-care measures 
                    that may help with your symptoms.
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2">Things to Avoid</h3>
                  <p className="text-sm text-red-800">
                    Activities, foods, or behaviors that might worsen your 
                    condition or interfere with recovery.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Severity Levels
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Low Priority
                    </Badge>
                    <span className="text-sm text-gray-600">Minor concern</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Medium Priority
                    </Badge>
                    <span className="text-sm text-gray-600">Moderate attention needed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      High Priority
                    </Badge>
                    <span className="text-sm text-gray-600">Urgent care recommended</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Managing Your Health History */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <History className="h-6 w-6 text-indigo-600" />
                </div>
                Managing Your Health History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">View Past Consultations</h3>
                  <p className="text-gray-600 mb-3">
                    Access all your previous AI consultations in the History section. 
                    Each consultation is saved with timestamps and full analysis.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Search & Filter</h3>
                  <p className="text-gray-600 mb-3">
                    Use the search functionality to find specific consultations by symptoms, 
                    conditions, or dates. Filter by severity level or time period.
                  </p>
                </div>
              </div>
              <Link href="/history">
                <Button variant="outline" className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  View Your History
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Data Protection</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• End-to-end encryption for all conversations</li>
                    <li>• No data sharing with third parties</li>
                    <li>• HIPAA-compliant security measures</li>
                    <li>• Secure cloud storage with redundancy</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Your Rights</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Delete any consultation at any time</li>
                    <li>• Export your health data</li>
                    <li>• Control data retention settings</li>
                    <li>• Request complete account deletion</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Disclaimers */}
          <Card className="border-0 shadow-sm bg-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-amber-900">
                <div className="p-2 bg-amber-200 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-amber-700" />
                </div>
                Important Medical Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-amber-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Not a Substitute for Professional Care</h3>
                  <p className="text-sm">
                    HealthAI is designed to provide information and insights, but should never 
                    replace professional medical advice, diagnosis, or treatment from qualified healthcare providers.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">When to Seek Immediate Care</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Severe chest pain or difficulty breathing</li>
                    <li>• Signs of stroke or heart attack</li>
                    <li>• Severe allergic reactions</li>
                    <li>• Any life-threatening emergency</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-100 p-4 rounded-lg">
                <p className="text-sm font-medium">
                  Always consult with healthcare professionals for accurate diagnosis and treatment. 
                  If you have a medical emergency, call emergency services immediately.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardContent className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Your Health Journey?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Now that you understand how to use HealthAI effectively, start your first consultation 
                and experience the power of AI-driven healthcare insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Start Consultation
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Create Account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}