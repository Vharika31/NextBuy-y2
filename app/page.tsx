import Link from "next/link"
import { ArrowRight, BookOpen, MessageSquare, Package, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-teal-lightest py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-teal-dark sm:text-4xl md:text-5xl">
                  NextBuy: Engineering Gear Marketplace
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Sustainable Sharing. Student-to-Student Deals. Find quality secondhand engineering equipment at
                  affordable prices.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-teal hover:bg-teal-dark">
                  <Link href="/browse">
                    Browse Listings
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/create-listing">Sell Your Gear</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="Engineering equipment"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                src="/placeholder.svg?height=400&width=600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-teal sm:text-4xl">Browse Categories</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find exactly what you need for your engineering courses
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Books & Notes</CardTitle>
                <CardDescription>Textbooks, reference materials, and study notes</CardDescription>
              </CardHeader>
              <CardContent>
                <BookOpen className="h-12 w-12 text-teal" />
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/browse?category=books">Browse Books</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Tools & Equipment</CardTitle>
                <CardDescription>Drafters, calculators, and lab equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <Package className="h-12 w-12 text-teal" />
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/browse?category=tools">Browse Tools</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Lab Supplies</CardTitle>
                <CardDescription>Lab coats, aprons, and safety equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <Search className="h-12 w-12 text-teal" />
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/browse?category=lab">Browse Lab Supplies</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Electronics</CardTitle>
                <CardDescription>Calculators, components, and devices</CardDescription>
              </CardHeader>
              <CardContent>
                <MessageSquare className="h-12 w-12 text-teal" />
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/browse?category=electronics">Browse Electronics</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-teal-lightest py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-teal-dark sm:text-4xl">How NextBuy Works</h2>
              <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Simple, secure, and sustainable way to buy and sell engineering gear
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-teal-light bg-white p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white">1</div>
              <h3 className="text-xl font-bold text-teal">Browse & Connect</h3>
              <p className="text-gray-500">Find what you need and connect directly with senior students</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-teal-light bg-white p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white">2</div>
              <h3 className="text-xl font-bold text-teal">Chat & Negotiate</h3>
              <p className="text-gray-500">Discuss details and negotiate prices through our secure chat</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-teal-light bg-white p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white">3</div>
              <h3 className="text-xl font-bold text-teal">Meet & Exchange</h3>
              <p className="text-gray-500">Meet on campus to complete the transaction safely</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-teal sm:text-4xl">What Students Say</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from students who have used NextBuy
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-3">
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Priya Patel</CardTitle>
                <CardDescription>Civil Engineering, Year 2</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  "I saved over ₹15,000 on my drafting equipment by buying from a senior through NextBuy. The quality
                  was great!"
                </p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Arjun Singh</CardTitle>
                <CardDescription>Mechanical Engineering, Year 4</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  "Selling my old textbooks and calculator on NextBuy was easy and helped me recover some costs while
                  helping juniors."
                </p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Ananya Gupta</CardTitle>
                <CardDescription>Electrical Engineering, Year 3</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  "The chat feature made it easy to negotiate and arrange meetups. I've both bought and sold on
                  NextBuy!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal py-12 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Join NextBuy?</h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create an account today and start buying or selling engineering gear
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal"
              >
                <Link href="/register">Sign Up Now</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-teal hover:bg-teal-lightest">
                <Link href="/login">Log In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
