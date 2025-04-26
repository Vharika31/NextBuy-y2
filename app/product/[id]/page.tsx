"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, MessageSquare, Share, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Mock product data
const product = {
  id: 1,
  title: "Engineering Mechanics Textbook",
  category: "Books",
  price: 1200,
  condition: "Like New",
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  department: "Mechanical",
  seller: {
    name: "Vikram Mehta",
    rating: 4.5,
    joinedDate: "Sep 2022",
    id: "vikram123",
  },
  description:
    "Engineering Mechanics textbook by R.C. Hibbeler, 14th Edition. In excellent condition with minimal highlighting. Perfect for first and second-year mechanical engineering students. Covers statics and dynamics with all practice problems intact.",
  status: "Available", // Available, Reserved, Sold
  listedDate: "2 weeks ago",
  views: 45,
  interested: 3,
}

// Similar products
const similarProducts = [
  {
    id: 5,
    title: "Circuit Design Handbook",
    category: "Books",
    price: 900,
    condition: "Good",
    image: "/placeholder.svg?height=200&width=200",
    department: "Electrical",
    seller: "Raj S.",
    rating: 4.3,
  },
  {
    id: 8,
    title: "Fluid Mechanics Notes",
    category: "Notes",
    price: 500,
    condition: "Good",
    image: "/placeholder.svg?height=200&width=200",
    department: "Civil",
    seller: "Divya R.",
    rating: 4.4,
  },
  {
    id: 9,
    title: "Thermodynamics Textbook",
    category: "Books",
    price: 1100,
    condition: "Like New",
    image: "/placeholder.svg?height=200&width=200",
    department: "Mechanical",
    seller: "Arjun S.",
    rating: 4.6,
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const [mainImage, setMainImage] = useState(product.images[0])
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { toast } = useToast()

  const handleReserve = () => {
    toast({
      title: "Item Reserved",
      description: "You have reserved this item. Chat with the seller to arrange pickup.",
    })
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted ? "Item has been removed from your wishlist" : "Item has been added to your wishlist",
    })
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4 flex items-center gap-2 p-0">
          <Link href="/browse">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Browse</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border">
            <img src={mainImage || "/placeholder.svg"} alt={product.title} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`overflow-hidden rounded-md border ${mainImage === image ? "ring-2 ring-teal" : ""}`}
                onClick={() => setMainImage(image)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} - view ${index + 1}`}
                  className="h-20 w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-teal-lightest px-2 py-1 text-xs font-medium text-teal">
                {product.category}
              </span>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                {product.condition}
              </span>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                {product.status}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{product.title}</h1>
            <p className="mt-2 text-2xl font-bold text-teal">₹{product.price}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-500">{product.department} Department</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">Listed {product.listedDate}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-lightest text-teal">
                {product.seller.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{product.seller.name}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.seller.rating}</span>
                  <span className="text-xs text-gray-500">• Joined {product.seller.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="flex-1 bg-teal hover:bg-teal-dark" onClick={handleReserve}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Reserve Item
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href={`/messages/${product.seller.id}`}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with Seller
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={isWishlisted ? "text-red-500" : ""}
              onClick={handleWishlist}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500" : ""}`} />
            </Button>
            <Button variant="outline" size="icon">
              <Share className="h-4 w-4" />
            </Button>
          </div>

          <Separator />

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-gray-600">{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Condition</span>
                  <span>{product.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Department</span>
                  <span>{product.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span>{product.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Views</span>
                  <span>{product.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Interested</span>
                  <span>{product.interested} people</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-teal">Similar Items</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similarProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group">
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-teal-lightest px-2 py-1 text-xs font-medium text-teal">
                      {product.category}
                    </span>
                    <span className="text-xs text-gray-500">{product.condition}</span>
                  </div>
                  <h3 className="mb-1 line-clamp-2 font-medium group-hover:text-teal">{product.title}</h3>
                  <p className="text-lg font-bold text-teal">₹{product.price}</p>
                  <p className="text-sm text-gray-500">{product.department} Department</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <span className="text-sm text-gray-500">Seller: {product.seller}</span>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
