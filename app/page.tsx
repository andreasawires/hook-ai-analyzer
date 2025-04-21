'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Loader2, Check, X, Zap, Crown, Star, ChartBar, Rocket, Users, Trophy } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from '@/components/shared/navbar';

export default function Home() {
  const [hook, setHook] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<{
    score: number;
    feedback: string;
    suggestion?: string;
  } | null>(null);
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const analyzeHook = async () => {
    if (!hook.trim()) {
      setError('Please enter a hook to analyze');
      return;
    }
    router.push('/login');
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const PricingCard = ({ 
    title, 
    price, 
    description, 
    features, 
    nonFeatures = [], 
    icon, 
    popular = false,
    buttonText = "Get Started",
    buttonVariant = "default"
  }: {
    title: string;
    price: string;
    description: string;
    features: string[];
    nonFeatures?: string[];
    icon: React.ReactNode;
    popular?: boolean;
    buttonText?: string;
    buttonVariant?: "default" | "secondary" | "outline";
  }) => (
    <Card className={`relative ${popular ? 'border-primary shadow-lg scale-105' : ''} hover:shadow-xl transition-all duration-300`}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500">
          Most Popular
        </Badge>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Free" && <span className="text-muted-foreground">/month</span>}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
          {nonFeatures.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600" variant={buttonVariant}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );

  const TestimonialCard = ({
    name,
    role,
    platform,
    followers,
    quote,
    image
  }: {
    name: string;
    role: string;
    platform: string;
    followers: string;
    quote: string;
    image: string;
  }) => (
    <Card className="text-left hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500"
          />
          <div>
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-400">{name}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
            <p className="text-sm text-muted-foreground">{followers} followers on {platform}</p>
          </div>
        </div>
        <p className="italic text-gray-600 dark:text-gray-300">{quote}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Video className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Hook Analyzer AI</h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Create viral-worthy hooks for your social media content using AI-powered analysis and suggestions.
        </p>

        {/* Demo Section */}
        <div id="try-it" className="max-w-3xl mx-auto mb-20">
          <Card className="border-2 border-indigo-100 dark:border-indigo-900">
            <CardHeader>
              <CardTitle className="text-indigo-600 dark:text-indigo-400">Try It Now</CardTitle>
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
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">500K+</div>
              <p className="text-gray-600 dark:text-gray-300">Hooks Analyzed</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">87%</div>
              <p className="text-gray-600 dark:text-gray-300">Average Engagement Increase</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">10K+</div>
              <p className="text-gray-600 dark:text-gray-300">Active Creators</p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div id="features">
          <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Why Creators Love Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-20">
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20">
              <CardContent className="pt-6">
                <ChartBar className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Data-Driven Insights</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get detailed analytics on what makes your hooks perform better than others.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20">
              <CardContent className="pt-6">
                <Rocket className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">AI-Powered Suggestions</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Let AI help you craft hooks that grab attention and drive engagement.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20">
              <CardContent className="pt-6">
                <Trophy className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Proven Results</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join thousands of creators who've increased their reach using our tool.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div id="testimonials">
          <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Creator Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-20">
            <TestimonialCard
              name="Sarah Chen"
              role="Tech Creator"
              platform="YouTube"
              followers="850K"
              quote="Hook Analyzer helped me increase my video CTR by 43%. The AI suggestions are spot-on!"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
            />
            <TestimonialCard
              name="Mark Thompson"
              role="Business Coach"
              platform="TikTok"
              followers="1.2M"
              quote="This tool is a game-changer. My hooks now consistently get 2x more engagement."
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
            />
            <TestimonialCard
              name="Priya Sharma"
              role="Lifestyle Influencer"
              platform="Instagram"
              followers="500K"
              quote="The detailed feedback helps me understand exactly what works and why."
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing">
          <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-20">
            <PricingCard
              title="Creator Starter"
              price="Free"
              description="Perfect for testing the tool"
              icon={<Star className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
              features={[
                "3 hook analyses per day",
                "Basic virality score",
                "Quick feedback"
              ]}
              nonFeatures={[
                "No AI rewrites",
                "No save history",
                "No swipe file access"
              ]}
              buttonText="Start Free"
              buttonVariant="outline"
            />
            
            <PricingCard
              title="Viral Pro"
              price="$29"
              description="Unlock your viral potential"
              icon={<Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
              features={[
                "Unlimited hook analyses",
                "Advanced virality scoring",
                "AI-powered rewrites (3-5 variations)",
                "Save & revisit past hooks",
                "Priority support"
              ]}
              popular={true}
              buttonText="Go Pro"
            />
            
            <PricingCard
              title="Creator+ Lab"
              price="$99"
              description="For power users who want more"
              icon={<Crown className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
              features={[
                "Everything in Pro",
                "Viral Hook Swipe File",
                "Weekly viral trends breakdown",
                "Hook performance tracking",
                "Early access to new tools",
                "Private Discord access"
              ]}
              buttonText="Get Elite"
              buttonVariant="secondary"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq">
          <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto px-4 mb-20 space-y-6 text-left">
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">How does Hook Analyzer work?</h3>
                <p className="text-gray-600 dark:text-gray-300">Our AI analyzes your hook based on millions of successful social media posts, providing specific feedback on engagement potential, emotional impact, and areas for improvement.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Can I use it for different platforms?</h3>
                <p className="text-gray-600 dark:text-gray-300">Yes! Hook Analyzer works for YouTube, TikTok, Instagram, and Twitter content. The AI adjusts its analysis based on platform-specific trends and best practices.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">How accurate are the predictions?</h3>
                <p className="text-gray-600 dark:text-gray-300">Our AI has been trained on millions of successful posts and achieves an 87% accuracy rate in predicting engagement potential. The more you use it, the better it gets at understanding your style and audience.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Hook Analyzer AI</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Empowering creators to craft viral-worthy content with AI-powered insights.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Features</li>
                <li>Pricing</li>
                <li>Use Cases</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-purple-600 dark:text-purple-400">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Blog</li>
                <li>Documentation</li>
                <li>Community</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>About</li>
                <li>Careers</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300">© 2024 Hook Analyzer AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}