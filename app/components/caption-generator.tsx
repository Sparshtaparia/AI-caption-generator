"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Upload, Copy, Check, Sparkles, ArrowLeft } from "lucide-react"
import { generateInstagramCaption } from "../actions/generate-caption"

export default function CaptionGenerator() {
  const [description, setDescription] = useState("")
  const [tone, setTone] = useState("")
  const [audience, setAudience] = useState("")
  const [generatedCaptions, setGeneratedCaptions] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
        setDescription("Describe what you see in this image or what the post is about...")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setGeneratedCaptions("")

    const formData = new FormData(event.currentTarget)
    const result = await generateInstagramCaption(formData)

    if (result.success) {
      setGeneratedCaptions(result.captions || "")
    } else {
      setGeneratedCaptions(`Error: ${result.error}`)
    }
    setIsLoading(false)
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const parseCaptions = (text: string) => {
    const sections = text.split(/CAPTION \d+:/).filter(Boolean)
    return sections.map((section, index) => {
      const parts = section.split(/HASHTAGS \d+:/)
      return {
        caption: parts[0]?.trim() || "",
        hashtags: parts[1]?.trim() || "",
      }
    })
  }

  const parsedCaptions = generatedCaptions ? parseCaptions(generatedCaptions) : []

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
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Capify
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              AI Caption Generator
            </span>
          </h1>
          <p className="text-gray-400">Advanced AI-Powered Caption Generation</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-gray-900/50 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">Create Your Caption</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <Label htmlFor="image-upload" className="text-gray-300">
                    Upload Image (Optional)
                  </Label>
                  <div className="mt-2">
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image-upload")?.click()}
                      className="w-full border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-gray-800/50 transition-all duration-300"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-yellow-500/20"
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-gray-300">
                    Post Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your post, what's happening, the mood, or key message..."
                    className="mt-2 bg-gray-800 border-yellow-500/20 text-white placeholder-gray-500"
                    rows={4}
                    required
                  />
                </div>

                {/* Tone Selection */}
                <div>
                  <Label htmlFor="tone" className="text-gray-300">
                    Tone
                  </Label>
                  <Select name="tone" value={tone} onValueChange={setTone} required>
                    <SelectTrigger className="mt-2 bg-gray-800 border-yellow-500/20 text-white">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-yellow-500/20 text-white">
                      <SelectItem value="casual" className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20">
                        Casual & Fun
                      </SelectItem>
                      <SelectItem
                        value="professional"
                        className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20"
                      >
                        Professional
                      </SelectItem>
                      <SelectItem
                        value="inspirational"
                        className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20"
                      >
                        Inspirational
                      </SelectItem>
                      <SelectItem value="humorous" className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20">
                        Humorous
                      </SelectItem>
                      <SelectItem
                        value="educational"
                        className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20"
                      >
                        Educational
                      </SelectItem>
                      <SelectItem
                        value="storytelling"
                        className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20"
                      >
                        Storytelling
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Audience Selection */}
                <div>
                  <Label htmlFor="audience" className="text-gray-300">
                    Target Audience
                  </Label>
                  <Select name="audience" value={audience} onValueChange={setAudience} required>
                    <SelectTrigger className="mt-2 bg-gray-800 border-yellow-500/20 text-white">
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-yellow-500/20 text-white">
                      <SelectItem value="general" className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20">
                        General Audience
                      </SelectItem>
                      <SelectItem
                        value="millennials"
                        className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20"
                      >
                        Millennials
                      </SelectItem>
                      <SelectItem value="gen-z" className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20">
                        Gen Z
                      </SelectItem>
                      <SelectItem value="business" className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20">
                        Business Professionals
                      </SelectItem>
                      <SelectItem value="fitness" className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20">
                        Fitness Enthusiasts
                      </SelectItem>
                      <SelectItem value="food" className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20">
                        Food Lovers
                      </SelectItem>
                      <SelectItem value="travel" className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20">
                        Travel Enthusiasts
                      </SelectItem>
                      <SelectItem value="fashion" className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20">
                        Fashion & Beauty
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Generating Captions...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Captions
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-gray-900/50 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">Generated Captions</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                </div>
              ) : parsedCaptions.length > 0 ? (
                <div className="space-y-6">
                  {parsedCaptions.map((item, index) => (
                    <div key={index} className="border border-yellow-500/20 rounded-lg p-4 bg-gray-800/50">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-yellow-400">Caption {index + 1}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(`${item.caption}\n\n${item.hashtags}`, index)}
                          className="text-yellow-400 hover:bg-yellow-400/10"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Caption:</p>
                          <p className="whitespace-pre-wrap text-gray-200">{item.caption}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Hashtags:</p>
                          <p className="text-yellow-300 text-sm">{item.hashtags}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 h-64 flex items-center justify-center">
                  <div>
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                    <p>Your AI-generated captions will appear here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
