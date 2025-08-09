'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/store';
import { 
  startNewSession, 
  addMessage, 
  saveSession, 
  setLoading,
  type Message 
} from '@/lib/features/chatSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Loader2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { currentSession, isLoading } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!currentSession) {
      dispatch(startNewSession());
    }
  }, [isAuthenticated, currentSession, dispatch, router]);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    dispatch(addMessage(userMessage));
    setInput('');
    setIsTyping(true);
    dispatch(setLoading(true));

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Thank you for sharing your symptoms. Based on what you\'ve described, here is my analysis:',
        timestamp: new Date(),
        diagnosis: {
          possibleConditions: [
            'Viral upper respiratory infection',
            'Common cold',
            'Allergic rhinitis'
          ],
          recommendedMedicines: [
            'Rest and hydration',
            'Paracetamol 500mg for pain relief',
            'Throat lozenges',
            'Warm salt water gargles'
          ],
          thingsToAvoid: [
            'Cold drinks and foods',
            'Smoking and secondhand smoke',
            'Crowded places',
            'Excessive physical activity'
          ],
          severity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
        }
      };

      dispatch(addMessage(aiResponse));
      dispatch(saveSession());
      setIsTyping(false);
      dispatch(setLoading(false));
    }, 2000 + Math.random() * 1000);
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <XCircle className="w-4 h-4" />;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Health Consultation</h1>
              <p className="text-gray-600 mt-1">
                Describe your symptoms and get instant medical insights
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">AI Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden bg-white rounded-lg shadow-sm">
          <div className="h-full overflow-y-auto p-6 space-y-6">
            {currentSession?.messages.length === 0 && (
              <div className="text-center py-12">
                <Bot className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Welcome to HealthAI
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  I'm here to help analyze your symptoms and provide medical insights. 
                  Please describe what you're experiencing, and I'll do my best to assist you.
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  <Button
                    variant="outline"
                    onClick={() => setInput("I have a headache and feel dizzy")}
                    className="text-left h-auto p-3"
                  >
                    "I have a headache and feel dizzy"
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setInput("I have stomach pain after eating")}
                    className="text-left h-auto p-3"
                  >
                    "I have stomach pain after eating"
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setInput("I have a persistent cough and sore throat")}
                    className="text-left h-auto p-3"
                  >
                    "I have a persistent cough and sore throat"
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setInput("What medicines are good for fever?")}
                    className="text-left h-auto p-3"
                  >
                    "What medicines are good for fever?"
                  </Button>
                </div>
              </div>
            )}

            {currentSession?.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.type === 'user' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card className={`${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white'} border-0 shadow-sm`}>
                      <CardContent className="p-4">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        
                        {message.diagnosis && (
                          <div className="mt-4 space-y-4">
                            <div className="flex items-center space-x-2">
                              <Badge className={getSeverityColor(message.diagnosis.severity)}>
                                {getSeverityIcon(message.diagnosis.severity)}
                                <span className="ml-1 capitalize">{message.diagnosis.severity} Priority</span>
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">Possible Conditions</h4>
                                <ul className="space-y-1">
                                  {message.diagnosis.possibleConditions.map((condition, idx) => (
                                    <li key={idx} className="text-sm text-blue-800">
                                      • {condition}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">Recommended Care</h4>
                                <ul className="space-y-1">
                                  {message.diagnosis.recommendedMedicines.map((medicine, idx) => (
                                    <li key={idx} className="text-sm text-green-800">
                                      • {medicine}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="bg-red-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-red-900 mb-2">Things to Avoid</h4>
                                <ul className="space-y-1">
                                  {message.diagnosis.thingsToAvoid.map((avoid, idx) => (
                                    <li key={idx} className="text-sm text-red-800">
                                      • {avoid}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800">
                              <strong>Disclaimer:</strong> This analysis is for informational purposes only. 
                              Please consult with a healthcare professional for proper medical advice and treatment.
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    <p className="text-xs text-gray-500 mt-1 px-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex max-w-3xl">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card className="bg-white border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>AI is analyzing your symptoms...</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex space-x-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your symptoms or ask about a medical condition..."
                className="flex-1 h-12"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                size="lg"
                className="px-6"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}