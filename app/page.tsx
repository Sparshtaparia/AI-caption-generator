"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight, Star, CheckCircle, Play, Target, Hash, Quote, Lightbulb } from "lucide-react"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-3xl font-black tracking-tight bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Capify
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-12">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors font-medium">
                Features
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors font-medium">
                About
              </a>
              <Link href="/pricing">
                <span className="text-gray-300 hover:text-white transition-colors font-medium">Pricing</span>
              </Link>
              <Link href="/generator">
                <Button className="bg-white text-black font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 px-8 py-3 rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Organic Shapes */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-orange-500/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 text-center max-w-7xl mx-auto px-6">
          <div className="mb-16 animate-fade-in">
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black mb-8 leading-none tracking-tighter">
              <span className="block text-white">NEVER STOP</span>
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
                CREATING
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-400 mb-4 max-w-4xl mx-auto leading-relaxed font-light tracking-wide">
              AND WHEN YOU NEED CAPTIONS.
            </p>
            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-light">
              Let AI do it for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
            <Link href="/generator">
              <Button
                size="lg"
                className="bg-white text-black font-bold text-xl px-16 py-6 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl"
              >
                Start Creating
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-xl px-16 py-6 rounded-full transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                <Play className="mr-3 h-6 w-6" />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Modern Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {[
              { number: "3.5K+", label: "Captions Generated" },
              { number: "84%", label: "Engagement Boost" },
              { number: "1K+", label: "Happy Creators" },
              { number: "95%", label: "Uptime" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl md:text-6xl font-black text-white mb-3 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-7xl md:text-8xl font-black mb-8 leading-none tracking-tighter">
              <span className="text-white">SMART</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                CAPTIONS
              </span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-4xl mx-auto font-light">
              AI that understands your brand, your audience, and what makes content go viral
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Lightbulb className="h-20 w-20 text-yellow-400" />,
                title: "Instant Ideas",
                description: "Generate multiple caption variations in seconds. Never stare at a blank screen again.",
                features: ["3-second generation", "Multiple variations", "Brand voice matching"],
              },
              {
                icon: <Hash className="h-20 w-20 text-yellow-400" />,
                title: "Trending Tags",
                description: "Real-time hashtag intelligence that gets your content discovered by the right audience.",
                features: ["20+ trending hashtags", "Niche-specific tags", "Performance tracking"],
              },
              {
                icon: <Target className="h-20 w-20 text-yellow-400" />,
                title: "Perfect Targeting",
                description: "Audience-specific content that speaks directly to your followers and converts.",
                features: ["8 audience types", "Tone customization", "Engagement optimization"],
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 group overflow-hidden backdrop-blur-sm"
              >
                <CardContent className="p-12 text-center">
                  <div className="mb-8 flex justify-center">
                    <div className="p-6 bg-yellow-400/10 rounded-full group-hover:bg-yellow-400/20 transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="text-3xl font-black text-white mb-6">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg mb-8">{feature.description}</p>

                  <div className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 to-orange-900/10" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-7xl md:text-8xl font-black mb-12 leading-none tracking-tighter">
                <span className="text-white">BUILT FOR</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  CREATORS
                </span>
              </h2>
              <div className="space-y-8 text-xl text-gray-300 leading-relaxed">
                <p>
                  We understand the creator economy. Every post matters. Every caption can make or break your
                  engagement. That's why we built Capify.
                </p>
                <p>
                  Our AI doesn't just generate text—it crafts messages that connect, inspire, and convert. Because your
                  content deserves captions as good as your creativity.
                </p>
              </div>

              <div className="mt-16 p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                <p className="text-gray-400 text-sm mb-3 uppercase tracking-wider">Created by</p>
                <p className="text-3xl font-black text-yellow-400">Sparsh Taparia</p>
                <p className="text-gray-300 mt-2 text-lg">AI Engineer & Content Strategist</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-3xl blur-3xl transform rotate-6" />
              <div className="relative z-10 w-full h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <div className="mb-8 flex justify-center">
                    <div className="p-12 bg-yellow-400/10 rounded-full">
                      <Quote className="h-24 w-24 text-yellow-400" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6">AI-Powered</h3>
                  <p className="text-gray-300 text-xl">Caption Generation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-7xl md:text-8xl font-black mb-8 leading-none tracking-tighter">
              <span className="text-white">SUCCESS</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                STORIES
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                name: "Sarah Chen",
                role: "Fashion Creator",
                content:
                  "My engagement went from 2% to 15% in one month. Capify doesn't just write captions—it creates connections.",
                followers: "347K",
                growth: "+847%",
              },
              {
                name: "Marcus Rodriguez",
                role: "Fitness Coach",
                content:
                  "I was spending hours on captions. Now I create a month's content in minutes. My course sales tripled.",
                followers: "156K",
                growth: "+340%",
              },
              {
                name: "Emma Thompson",
                role: "Food Blogger",
                content:
                  "The hashtag intelligence is incredible. I'm reaching audiences I never knew existed. Brand deals doubled.",
                followers: "289K",
                growth: "+500%",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 group backdrop-blur-sm"
              >
                <CardContent className="p-12">
                  <div className="flex items-center mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-12 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-black text-2xl">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-black text-xl">{testimonial.name}</span>
                        <CheckCircle className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="text-gray-400 text-lg">{testimonial.role}</div>
                      <div className="text-gray-500">{testimonial.followers} followers</div>
                      <div className="text-green-400 font-bold mt-2">{testimonial.growth} growth</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-orange-900/20" />

        <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-8xl md:text-9xl font-black mb-12 leading-none tracking-tighter">
            <span className="text-white">START</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              CREATING
            </span>
          </h2>
          <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto font-light">
            Join thousands of creators who never run out of caption ideas
          </p>
          <Link href="/generator">
            <Button
              size="lg"
              className="bg-white text-black font-black text-2xl px-20 py-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              <Sparkles className="mr-4 h-8 w-8" />
              Get Started Now
              <ArrowRight className="ml-4 h-8 w-8" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-8 md:mb-0">
              <span className="text-4xl font-black tracking-tight bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Capify
              </span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p className="text-lg">© 2025 Capify. All rights reserved.</p>
              <p className="text-sm mt-2">Created by Sparsh Taparia</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
