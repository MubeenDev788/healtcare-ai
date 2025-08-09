'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RootState } from '@/lib/store';
import { loadSession, deleteSession } from '@/lib/features/chatSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  MessageSquare, 
  Search, 
  Calendar, 
  Trash2, 
  Eye,
  Filter,
  Clock
} from 'lucide-react';

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHistory, setFilteredHistory] = useState<any[]>([]);
  
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { chatHistory } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const filtered = chatHistory.filter(session => 
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.messages.some(message => 
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredHistory(filtered);
  }, [chatHistory, searchTerm]);

  const handleViewSession = (sessionId: string) => {
    dispatch(loadSession(sessionId));
    router.push('/chat');
  };

  const handleDeleteSession = (sessionId: string) => {
    dispatch(deleteSession(sessionId));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getSessionSummary = (session: any) => {
    const userMessages = session.messages.filter((m: any) => m.type === 'user');
    const aiMessages = session.messages.filter((m: any) => m.type === 'ai');
    const lastDiagnosis = aiMessages.reverse().find((m: any) => m.diagnosis);
    
    return {
      totalMessages: session.messages.length,
      userMessages: userMessages.length,
      lastDiagnosis: lastDiagnosis?.diagnosis
    };
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chat History</h1>
          <p className="text-gray-600">
            View and manage your previous AI health consultations
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search consultations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Link href="/chat">
                <Button className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  New Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredHistory.length} of {chatHistory.length} consultations
          </p>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchTerm ? 'No consultations found' : 'No consultations yet'}
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {searchTerm 
                    ? 'Try adjusting your search terms to find what you\'re looking for.'
                    : 'Start your first AI health consultation to see your chat history here.'
                  }
                </p>
                {!searchTerm && (
                  <Link href="/chat">
                    <Button>Start Your First Consultation</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredHistory.map((session) => {
              const summary = getSessionSummary(session);
              return (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{session.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(session.lastUpdated)}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {summary.totalMessages} messages
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {Math.ceil((new Date().getTime() - new Date(session.lastUpdated).getTime()) / (1000 * 60 * 60 * 24))} days ago
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewSession(session.id)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Consultation</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this consultation? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteSession(session.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Session Preview */}
                    <div className="mb-4">
                      <p className="text-gray-600 line-clamp-2">
                        {session.messages[0]?.content || 'No messages in this consultation'}
                      </p>
                    </div>

                    {/* Last Diagnosis Summary */}
                    {summary.lastDiagnosis && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 mb-3">Last Analysis Summary</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Possible Conditions</h5>
                            <div className="space-y-1">
                              {summary.lastDiagnosis.possibleConditions.slice(0, 2).map((condition: string, idx: number) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Recommended Care</h5>
                            <div className="space-y-1">
                              {summary.lastDiagnosis.recommendedMedicines.slice(0, 2).map((medicine: string, idx: number) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {medicine}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Severity Level</h5>
                            <Badge 
                              className={`text-xs ${
                                summary.lastDiagnosis.severity === 'high' ? 'bg-red-100 text-red-800' :
                                summary.lastDiagnosis.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}
                            >
                              {summary.lastDiagnosis.severity} priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}