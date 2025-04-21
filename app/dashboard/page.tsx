'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Loader2, History, User, CreditCard } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from '@/components/shared/navbar';

export default function Dashboard() {
  const [hook, setHook] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<{
    score: number;
    feedback: string;
    suggestion?: string;
  } | null>(null);

  // Mock data for history
  const [history] = useState([
    {
      id: 1,
      hook: "This iPhone trick will blow your mind...",
      score: 8.5,
      date: "2024-03-20",
    },
    {
      id: 2,
      hook: "The secret to viral TikToks revealed...",
      score: 7.2,
      date: "2024-03-19",
    },
  ]);

  const analyzeHook = async () => {
    if (!hook.trim()) {
      setError('Please enter a hook to analyze');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hook }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze hook');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError('Failed to analyze hook. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Dashboard</h1>
        
        <Tabs defaultValue="analyze" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="analyze">Analyze</TabsTrigger>
            <TabsTrigger value="history">
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="account">
              <User className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze">
            <Card className="border-2 border-indigo-100 dark:border-indigo-900">
              <CardHeader>
                <CardTitle className="text-indigo-600 dark:text-indigo-400">Analyze Your Hook</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    Paste your hook below to analyze its viral potential
                  </p>
                  <Textarea
                    placeholder="Example: 'This hidden iPhone feature just saved my life...'"
                    className="min-h-[100px] focus:ring-2 focus:ring-indigo-500"
                    value={hook}
                    onChange={(e) => setHook(e.target.value)}
                  />
                  <Button 
                    className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    onClick={analyzeHook}
                    disabled={!hook.trim() || loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Hook'
                    )}
                  </Button>
                </div>

                {analysis && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Engagement Score:</span>
                      <Badge variant="secondary" className={getScoreColor(analysis.score)}>
                        {analysis.score.toFixed(1)}/10
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">AI Feedback:</h3>
                      <p className="text-muted-foreground">{analysis.feedback}</p>
                    </div>

                    {analysis.suggestion && (
                      <div>
                        <h3 className="font-semibold mb-2">Suggested Improvement:</h3>
                        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
                          <p className="italic text-gray-600 dark:text-gray-300">{analysis.suggestion}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Analysis History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {history.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{item.hook}</p>
                          <Badge variant="secondary" className={getScoreColor(item.score)}>
                            {item.score.toFixed(1)}/10
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input type="password" />
                </div>
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Current Plan</h3>
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">Viral Pro</p>
                  <p className="text-sm text-muted-foreground">$29/month • Renews on April 20, 2024</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Payment Method</h3>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <CreditCard className="w-6 h-6 text-muted-foreground" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                  <Button variant="outline">Update Payment Method</Button>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="destructive">Cancel Subscription</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}