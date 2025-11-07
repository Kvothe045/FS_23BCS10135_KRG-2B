// fsproject/app/page.tsx
'use client';

import Link from 'next/link';
import { Upload, Share2, Shield, Zap, Cloud, Lock, Sparkles, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                VaultShare
              </div>
            </div>
            <div className="space-x-4">
              <Link 
                href="/login" 
                className="px-4 py-2 text-gray-300 hover:text-cyan-400 transition border border-gray-700 hover:border-cyan-500/50 rounded-lg"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition shadow-lg shadow-cyan-500/50"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Secure Cloud Storage Redefined</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Store. Share. Secure.
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Enterprise-grade file sharing platform with end-to-end encryption, powered by cutting-edge cloud infrastructure and Spring Boot architecture.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/signup" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg text-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition transform hover:scale-105 shadow-lg shadow-cyan-500/50"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800/50 backdrop-blur-xl text-gray-300 rounded-lg text-lg font-semibold hover:bg-gray-700/50 transition border border-gray-700"
              >
                <Lock className="w-5 h-5" />
                Access Vault
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">256-bit</div>
                <div className="text-sm text-gray-500">Encryption</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">99.9%</div>
                <div className="text-sm text-gray-500">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">Instant</div>
                <div className="text-sm text-gray-500">Sharing</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
            <FeatureCard 
              icon={<Upload className="w-8 h-8" />}
              title="Instant Upload"
              description="Lightning-fast drag & drop uploads with real-time progress tracking"
              gradient="from-cyan-500 to-blue-500"
            />
            <FeatureCard 
              icon={<Share2 className="w-8 h-8" />}
              title="Smart Share"
              description="Share files securely with granular access control and permissions"
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8" />}
              title="Military-Grade Security"
              description="End-to-end encryption with zero-knowledge architecture"
              gradient="from-green-500 to-emerald-500"
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8" />}
              title="Global CDN"
              description="Access your files at blazing speeds from anywhere on Earth"
              gradient="from-orange-500 to-red-500"
            />
          </div>

          {/* Tech Stack Badge */}
          <div className="mt-24 text-center">
            <div className="inline-block p-6 bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/50">
              <p className="text-gray-400 text-sm mb-3">Powered by Enterprise Technology</p>
              <div className="flex items-center gap-6 text-gray-500 text-sm">
                <span className="px-3 py-1 bg-gray-900/50 rounded border border-gray-700">Spring Boot</span>
                <span className="px-3 py-1 bg-gray-900/50 rounded border border-gray-700">Cloudinary</span>
                <span className="px-3 py-1 bg-gray-900/50 rounded border border-gray-700">PostgreSQL</span>
                <span className="px-3 py-1 bg-gray-900/50 rounded border border-gray-700">Next.js</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-32 text-center border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm">
              Crafted <span className="text-red-500"></span> by <span className="font-semibold text-cyan-400">Aditya</span>
            </p>
            <p className="text-xs mt-1 text-gray-600">UID: 23BCS11734 • Full-Stack Developer</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  gradient: string;
}) {
  return (
    <div className="group p-6 bg-gray-800/30 backdrop-blur-xl rounded-xl hover:bg-gray-800/50 transition border border-gray-700/50 hover:border-gray-600 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition`}></div>
      <div className={`inline-block p-3 bg-gradient-to-br ${gradient} rounded-lg mb-4 relative z-10`}>
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-white relative z-10">{title}</h3>
      <p className="text-gray-400 text-sm relative z-10">{description}</p>
    </div>
  );
}
