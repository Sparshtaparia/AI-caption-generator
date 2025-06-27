"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Play, Sparkles } from "lucide-react"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-yellow-500/20 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Capify
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              See Capify in Action
            </span>
          </h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
            Watch how Capify transforms simple descriptions into engaging, conversion-focused Instagram captions
          </p>
        </div>

        <Card className="bg-gray-900/60 border-yellow-500/30 mb-12">
          <CardContent className="p-12">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10" />
              <div className="text-center z-10">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto cursor-pointer hover:scale-110 transition-transform">
                  <Play className="h-12 w-12 text-black ml-1" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Interactive Demo</h3>
                <p className="text-gray-400">Click to see Capify generate captions in real-time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gray-900/60 border-yellow-500/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Before Capify</h3>
              <div className="space-y-4 text-gray-300">
                <p>⏰ 2-3 hours spent writing captions daily</p>
                <p>📉 Low engagement rates (1-3%)</p>
                <p>🤔 Struggling with hashtag research</p>
                <p>😰 Inconsistent brand voice</p>
                <p>📱 Limited content variety</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/60 border-yellow-500/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">After Capify</h3>
              <div className="space-y-4 text-gray-300">
                <p>⚡ 5 minutes to generate multiple captions</p>
                <p>📈 Average 8x engagement increase</p>
                <p>🎯 AI-powered hashtag optimization</p>
                <p>🎨 Consistent, professional brand voice</p>
                <p>🚀 Unlimited creative variations</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/generator">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl px-12 py-6 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-110"
            >
              <Sparkles className="mr-3 h-6 w-6" />
              Try Capify Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
