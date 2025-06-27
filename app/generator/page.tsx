import CaptionGenerator from "../components/caption-generator"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function GeneratorPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-yellow-500/20 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <Link href="/studio">
                <span className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
                  Content Studio
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Capify
              </span>
            </div>
          </div>
        </div>
      </nav>

      <CaptionGenerator />
    </div>
  )
}
