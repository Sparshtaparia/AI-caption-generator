"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowLeft, Sparkles, Zap, Crown } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for individual creators getting started",
      features: [
        "50 AI-generated captions per month",
        "Basic hashtag suggestions",
        "3 tone variations",
        "Email support",
        "Mobile app access",
      ],
      icon: <Sparkles className="h-8 w-8" />,
      popular: false,
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for serious creators and small businesses",
      features: [
        "500 AI-generated captions per month",
        "Advanced hashtag intelligence",
        "8 tone variations",
        "Audience targeting",
        "Priority support",
        "Analytics dashboard",
        "Content calendar integration",
      ],
      icon: <Zap className="h-8 w-8" />,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For agencies and large-scale operations",
      features: [
        "Unlimited AI-generated captions",
        "Custom brand voice training",
        "Advanced analytics & reporting",
        "Team collaboration tools",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
      ],
      icon: <Crown className="h-8 w-8" />,
      popular: false,
    },
  ]

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

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
            Scale your content creation with plans designed for every stage of your journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-gray-900/60 border-2 transition-all duration-300 transform hover:scale-105 ${
                plan.popular
                  ? "border-yellow-400 shadow-2xl shadow-yellow-500/20"
                  : "border-yellow-500/30 hover:border-yellow-400/60"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-yellow-400/10 rounded-full text-yellow-400">{plan.icon}</div>
                </div>
                <CardTitle className="text-2xl font-bold text-yellow-400 mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-lg">{plan.period}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600"
                      : "border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent"
                  }`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <p className="text-sm text-gray-500">
            Need a custom solution? <span className="text-yellow-400 hover:underline cursor-pointer">Contact us</span>
          </p>
        </div>
      </div>
    </div>
  )
}
