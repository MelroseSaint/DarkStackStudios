import { Link } from 'react-router-dom';
import { Heart, Phone, FileText, Users, BookOpen, TrendingUp, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  const quickActions = [
    {
      title: "Crisis Support",
      description: "24/7 immediate help and emergency resources",
      icon: Phone,
      color: "bg-red-500",
      path: "/crisis-support",
      priority: "high"
    },
    {
      title: "Take Assessment",
      description: "Evaluate your mental health and get personalized recommendations",
      icon: FileText,
      color: "bg-blue-500",
      path: "/assessment",
      priority: "normal"
    },
    {
      title: "Find Professional Help",
      description: "Connect with licensed therapists and counselors",
      icon: Users,
      color: "bg-green-500",
      path: "/professionals",
      priority: "normal"
    },
    {
      title: "Track Your Mood",
      description: "Monitor your emotional well-being over time",
      icon: TrendingUp,
      color: "bg-purple-500",
      path: "/mood-tracker",
      priority: "normal"
    },
    {
      title: "Learn & Educate",
      description: "Access mental health resources and information",
      icon: BookOpen,
      color: "bg-orange-500",
      path: "/education",
      priority: "normal"
    },
    {
      title: "Community Support",
      description: "Join support groups and connect with others",
      icon: Users,
      color: "bg-teal-500",
      path: "/community",
      priority: "normal"
    }
  ];

  const featuredResources = [
    {
      title: "988 Suicide & Crisis Lifeline",
      description: "Free and confidential support available 24/7",
      contact: "Call or text 988",
      type: "crisis"
    },
    {
      title: "Crisis Text Line",
      description: "Text with a trained crisis counselor",
      contact: "Text HOME to 741741",
      type: "crisis"
    },
    {
      title: "Mental Health America",
      description: "Screening tools and educational resources",
      contact: "mhanational.org",
      type: "education"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full">
              <Heart className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Mental Health Matters
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Find support, resources, and professional help for your mental health journey. 
            You're not alone, and help is available 24/7.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/crisis-support"
                className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Get Help Now
              </Link>
            </div>
          )}

          {user && (
            <div className="bg-white bg-opacity-10 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-lg mb-4">Welcome back, {user.email}!</p>
              <Link
                to="/assessment"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                Take Assessment
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help You Today?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive mental health services and resources designed to support your well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.path}
                  className="group relative overflow-hidden rounded-lg bg-white border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {action.priority === 'high' && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg">
                      URGENT
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  
                  <p className="text-gray-600">
                    {action.description}
                  </p>
                  
                  <div className="mt-4 text-blue-600 font-medium group-hover:underline">
                    Get Started →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Immediate Help Available</h2>
            <p className="text-xl text-gray-600">
              These resources are available 24/7 for immediate support and crisis intervention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  {resource.type === 'crisis' && (
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <Phone className="w-4 h-4 text-red-600" />
                    </div>
                  )}
                  {resource.type === 'education' && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{resource.description}</p>
                
                <div className="text-sm font-medium text-blue-600 mb-4">
                  {resource.contact}
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  {resource.type === 'crisis' ? 'Call Now' : 'Learn More'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take the First Step?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Your mental health journey starts with a single step. We're here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assessment"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              <FileText className="w-5 h-5 mr-2" />
              Take Assessment
            </Link>
            <Link
              to="/professionals"
              className="inline-flex items-center px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Users className="w-5 h-5 mr-2" />
              Find a Therapist
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-yellow-800 mb-1">Important Notice</h3>
              <p className="text-sm text-yellow-700">
                This platform provides mental health resources and support, but it is not a substitute for professional medical advice, 
                diagnosis, or treatment. If you're experiencing a medical emergency, call 911 immediately. 
                For crisis support, call or text 988 (Suicide & Crisis Lifeline).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}