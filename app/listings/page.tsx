"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Eye, MessageSquare, MoreHorizontal, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Mock data for listings
const listings = [
  {
    id: 1,
    title: "Engineering Mechanics Textbook",
    category: "Books",
    price: 45,
    condition: "Like New",
    image: "/placeholder.svg?height=200&width=200",
    status: "Available",
    views: 45,
    messages: 3,
    listedDate: "2 weeks ago",
  },
  {
    id: 2,
    title: "Scientific Calculator TI-84",
    category: "Electronics",
    price: 65,
    condition: "Good",
    image: "/placeholder.svg?height=200&width=200",
    status: "Reserved",
    views: 32,
    messages: 5,
    listedDate: "1 week ago",
  },
  {
    id: 3,
    title: "Drafting Table",
    category: "Tools",
    price: 120,
    condition: "Usable",
    image: "/placeholder.svg?height=200&width=200",
    status: "Sold",
    views: 28,
    messages: 4,
    listedDate: "3 weeks ago",
  },
  {
    id: 4,
    title: "Lab Coat (Size M)",
    category: "Lab",
    price: 25,
    condition: "New",
    image: "/placeholder.svg?height=200&width=200",
    status: "Available",
    views: 15,
    messages: 1,
    listedDate: "2 days ago",
  },
]

export default function ListingsPage() {
  const [userListings, setUserListings] = useState(listings)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const { toast } = useToast()

  const handleDelete = (id: number) => {
    setUserListings(userListings.filter((listing) => listing.id !== id))
    setDeleteId(null)
    toast({
      title: "Listing Deleted",
      description: "Your listing has been deleted successfully",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-600"
      case "Reserved":
        return "bg-yellow-100 text-yellow-600"
      case "Sold":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal">My Listings</h1>
          <p className="text-gray-500">Manage your listed items and track their status</p>
        </div>
        <Button asChild className="bg-teal hover:bg-teal-dark">
          <Link href="/create-listing">
            <Plus className="mr-2 h-4 w-4" />
            Create New Listing
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1">
          <Input type="search" placeholder="Search your listings..." />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Listings</TabsTrigger>
          <TabsTrigger value="sold">Sold Items</TabsTrigger>
          <TabsTrigger value="all">All Listings</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userListings
              .filter((listing) => listing.status !== "Sold")
              .map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/product/${listing.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Listing
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/edit-listing/${listing.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Listing
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DialogTrigger asChild>
                            <DropdownMenuItem className="text-red-600" onSelect={() => setDeleteId(listing.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Listing
                            </DropdownMenuItem>
                          </DialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(listing.status)}`}>
                        {listing.status}
                      </span>
                      <span className="text-xs text-gray-500">{listing.listedDate}</span>
                    </div>
                    <CardTitle className="line-clamp-1 text-lg">{listing.title}</CardTitle>
                    <CardDescription>
                      {listing.category} • {listing.condition}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-lg font-bold text-teal">${listing.price}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-gray-500">
                        <Eye className="mr-1 h-4 w-4" />
                        <span className="text-xs">{listing.views} views</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        <span className="text-xs">{listing.messages} messages</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-teal hover:text-teal-dark" asChild>
                      <Link href={`/messages?listing=${listing.id}`}>View Messages</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="sold">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userListings
              .filter((listing) => listing.status === "Sold")
              .map((listing) => (
                <Card key={listing.id} className="overflow-hidden opacity-75">
                  <div className="relative">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/product/${listing.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Listing
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DialogTrigger asChild>
                            <DropdownMenuItem className="text-red-600" onSelect={() => setDeleteId(listing.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Listing
                            </DropdownMenuItem>
                          </DialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(listing.status)}`}>
                        {listing.status}
                      </span>
                      <span className="text-xs text-gray-500">{listing.listedDate}</span>
                    </div>
                    <CardTitle className="line-clamp-1 text-lg">{listing.title}</CardTitle>
                    <CardDescription>
                      {listing.category} • {listing.condition}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-lg font-bold text-teal">${listing.price}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-gray-500">
                        <Eye className="mr-1 h-4 w-4" />
                        <span className="text-xs">{listing.views} views</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        <span className="text-xs">{listing.messages} messages</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-teal hover:text-teal-dark" asChild>
                      <Link href={`/messages?listing=${listing.id}`}>View Messages</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userListings.map((listing) => (
              <Card key={listing.id} className={`overflow-hidden ${listing.status === "Sold" ? "opacity-75" : ""}`}>
                <div className="relative">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/product/${listing.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Listing
                          </Link>
                        </DropdownMenuItem>
                        {listing.status !== "Sold" && (
                          <DropdownMenuItem asChild>
                            <Link href={`/edit-listing/${listing.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Listing
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DialogTrigger asChild>
                          <DropdownMenuItem className="text-red-600" onSelect={() => setDeleteId(listing.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Listing
                          </DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(listing.status)}`}>
                      {listing.status}
                    </span>
                    <span className="text-xs text-gray-500">{listing.listedDate}</span>
                  </div>
                  <CardTitle className="line-clamp-1 text-lg">{listing.title}</CardTitle>
                  <CardDescription>
                    {listing.category} • {listing.condition}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-lg font-bold text-teal">${listing.price}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-gray-500">
                      <Eye className="mr-1 h-4 w-4" />
                      <span className="text-xs">{listing.views} views</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      <span className="text-xs">{listing.messages} messages</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-teal hover:text-teal-dark" asChild>
                    <Link href={`/messages?listing=${listing.id}`}>View Messages</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Listing</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={() => deleteId && handleDelete(deleteId)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
