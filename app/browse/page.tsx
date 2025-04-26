"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, ChevronDown, Filter, Package, Search, SlidersHorizontal, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for products
const products = [
  {
    id: 1,
    title: "Engineering Mechanics Textbook",
    category: "Books",
    price: 1200,
    condition: "Like New",
    image: "/placeholder.svg?height=200&width=200",
    department: "Mechanical",
    seller: "Vikram M.",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Scientific Calculator TI-84",
    category: "Electronics",
    price: 1800,
    condition: "Good",
    image: "/placeholder.svg?height=200&width=200",
    department: "All",
    seller: "Priya P.",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Drafting Table",
    category: "Tools",
    price: 3500,
    condition: "Usable",
    image: "/placeholder.svg?height=200&width=200",
    department: "Civil",
    seller: "Arjun S.",
    rating: 4.2,
  },
  {
    id: 4,
    title: "Lab Coat (Size M)",
    category: "Lab",
    price: 600,
    condition: "New",
    image: "/placeholder.svg?height=200&width=200",
    department: "Chemical",
    seller: "Neha K.",
    rating: 5.0,
  },
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
    id: 6,
    title: "Digital Multimeter",
    category: "Electronics",
    price: 1500,
    condition: "Like New",
    image: "/placeholder.svg?height=200&width=200",
    department: "Electrical",
    seller: "Ananya G.",
    rating: 4.7,
  },
  {
    id: 7,
    title: "Safety Goggles",
    category: "Lab",
    price: 350,
    condition: "New",
    image: "/placeholder.svg?height=200&width=200",
    department: "All",
    seller: "Sanjay K.",
    rating: 4.9,
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
]

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 4000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    // Search filter
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    // Department filter
    if (
      selectedDepartments.length > 0 &&
      !selectedDepartments.includes(product.department) &&
      !selectedDepartments.includes("All")
    ) {
      return false
    }

    // Condition filter
    if (selectedConditions.length > 0 && !selectedConditions.includes(product.condition)) {
      return false
    }

    return true
  })

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-teal">Browse Listings</h1>
        <p className="text-gray-500">Find quality secondhand engineering equipment from fellow students</p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search for items..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your search with these filters</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <div className="mb-4">
                <h3 className="mb-2 font-medium">Price Range (₹)</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[0, 4000]}
                    max={4000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="mb-4">
                <h3 className="mb-2 font-medium">Categories</h3>
                <div className="space-y-2">
                  {["Books", "Tools", "Lab", "Electronics", "Notes"].map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-teal focus:ring-teal"
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, category])
                          } else {
                            setSelectedCategories(selectedCategories.filter((c) => c !== category))
                          }
                        }}
                      />
                      <label htmlFor={`category-${category}`} className="text-sm">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Separator className="my-4" />
              <div className="mb-4">
                <h3 className="mb-2 font-medium">Department</h3>
                <div className="space-y-2">
                  {["All", "Mechanical", "Electrical", "Civil", "Chemical"].map((department) => (
                    <div key={department} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`department-${department}`}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-teal focus:ring-teal"
                        checked={selectedDepartments.includes(department)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDepartments([...selectedDepartments, department])
                          } else {
                            setSelectedDepartments(selectedDepartments.filter((d) => d !== department))
                          }
                        }}
                      />
                      <label htmlFor={`department-${department}`} className="text-sm">
                        {department}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Separator className="my-4" />
              <div className="mb-4">
                <h3 className="mb-2 font-medium">Condition</h3>
                <div className="space-y-2">
                  {["New", "Like New", "Good", "Usable"].map((condition) => (
                    <div key={condition} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`condition-${condition}`}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-teal focus:ring-teal"
                        checked={selectedConditions.includes(condition)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedConditions([...selectedConditions, condition])
                          } else {
                            setSelectedConditions(selectedConditions.filter((c) => c !== condition))
                          }
                        }}
                      />
                      <label htmlFor={`condition-${condition}`} className="text-sm">
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  className="w-full bg-teal hover:bg-teal-dark"
                  onClick={() => {
                    // Apply filters
                  }}
                >
                  Apply Filters
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Sort</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Newest First</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Price: Low to High</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Price: High to Low</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Rating</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="books">
            <BookOpen className="mr-2 h-4 w-4" />
            Books
          </TabsTrigger>
          <TabsTrigger value="tools">
            <Package className="mr-2 h-4 w-4" />
            Tools
          </TabsTrigger>
          <TabsTrigger value="lab">Lab Supplies</TabsTrigger>
          <TabsTrigger value="electronics">Electronics</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
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
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <h3 className="mb-2 text-xl font-medium">No items found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="books" className="mt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts
              .filter((product) => product.category === "Books")
              .map((product) => (
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
        </TabsContent>
        {/* Similar TabsContent for other categories */}
      </Tabs>
    </div>
  )
}
