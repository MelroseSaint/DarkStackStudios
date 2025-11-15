import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Heart, Phone, Shield, User, Menu, X } from 'lucide-react';
import CrisisBanner from './CrisisBanner';
import Navigation from './Navigation';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Crisis Banner - Always visible for immediate access */}
      <CrisisBanner />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MindWell</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Navigation />
            </nav>

            {/* User Menu & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                <User className="w-4 h-4" />
                <span>Account</span>
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              <Navigation mobile onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">MindWell</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your mental health matters. Access support, resources, and professional help 24/7.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Crisis Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/crisis-support" className="hover:text-white transition-colors">24/7 Crisis Hotlines</a></li>
                <li><a href="/crisis-support" className="hover:text-white transition-colors">Safety Planning</a></li>
                <li><a href="/crisis-support" className="hover:text-white transition-colors">Emergency Resources</a></li>
                <li><a href="/crisis-support" className="hover:text-white transition-colors">Find Help Now</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/education" className="hover:text-white transition-colors">Mental Health Education</a></li>
                <li><a href="/professionals" className="hover:text-white transition-colors">Find a Therapist</a></li>
                <li><a href="/community" className="hover:text-white transition-colors">Support Groups</a></li>
                <li><a href="/resources" className="hover:text-white transition-colors">Help Centers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/assessment" className="hover:text-white transition-colors">Take Assessment</a></li>
                <li><a href="/mood-tracker" className="hover:text-white transition-colors">Track Your Mood</a></li>
                <li><a href="/profile" className="hover:text-white transition-colors">Your Profile</a></li>
                <li><a href="/resources" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 MindWell. All rights reserved. | 
              <a href="/privacy" className="hover:text-white transition-colors ml-2">Privacy Policy</a> | 
              <a href="/terms" className="hover:text-white transition-colors ml-2">Terms of Service</a> | 
              <a href="/emergency" className="hover:text-white transition-colors ml-2">Emergency Contacts</a>
            </p>
            <p className="mt-2">
              <strong>Emergency:</strong> If you're in crisis, call 988 (Suicide & Crisis Lifeline) or 911 immediately.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}