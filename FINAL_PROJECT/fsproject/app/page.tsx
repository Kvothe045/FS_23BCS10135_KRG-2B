'use client';

import Link from 'next/link';
import { Upload, Share2, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CloudShare
          </div>
          <div className="space-x-4">
            <Link 
              href="/login" 
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Share Files Seamlessly
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A modern, secure file sharing platform built with Spring Boot and Next.js
          </p>
          <Link 
            href="/signup" 
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <FeatureCard 
            icon={<Upload className="w-8 h-8" />}
            title="Easy Upload"
            description="Drag and drop files or browse to upload"
          />
          <FeatureCard 
            icon={<Share2 className="w-8 h-8" />}
            title="Quick Share"
            description="Share files with other users instantly"
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8" />}
            title="Secure Storage"
            description="Your files are encrypted and safe"
          />
          <FeatureCard 
            icon={<Zap className="w-8 h-8" />}
            title="Fast Access"
            description="Access your files from anywhere"
          />
        </div>

        {/* Footer */}
        <footer className="mt-32 text-center text-gray-500">
          <p className="text-sm">
            Built by <span className="font-semibold text-gray-700">~Aryan Srivastav</span>
          </p>
          <p className="text-xs mt-1">Roll No: 23BCS10135</p>
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}