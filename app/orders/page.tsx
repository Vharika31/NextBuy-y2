"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, MessageSquare, Star, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Mock data for orders
const orders = [
  {
    id: 1,
    product: {
      id: 1,
      title: "Engineering Mechanics Textbook",
      price: 45,
      image: "/placeholder.svg?height=100&width=100",
    },
    seller: {
      id: "seller1",
      name: "John D.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      rating: 4.5,
    },
    status: "Reserved",
    reservedDate: "May 15, 2023",
    meetupLocation: "Engineering Building, Room 101",
    meetupTime: "Tomorrow, 3:00 PM",
  },
  {
    id: 2,
    product: {
      id: 2,
      title: "Scientific Calculator TI-84",
      price: 58,
      image: "/placeholder.svg?height=100&width=100",
    },
    seller: {
      id: "seller2",
      name: "Sarah M.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SM",
      rating: 4.8,
    },
    status: "Completed",
    reservedDate: "May 10, 2023",
    completedDate: "May 12, 2023",
    reviewed: false,
  },
  {
    id: 3,
    product: {
      id: 3,
      title: "Lab Coat (Size M)",
      price: 25,
      image: "/placeholder.svg?height=100&width=100",
    },
    seller: {
      id: "seller3",
      name: "Emma L.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EL",
      rating: 5.0,
    },
    status: "Completed",
    reservedDate: "April 28, 2023",
    completedDate: "May 1, 2023",
    reviewed: true,
    review: {
      rating: 5,
      comment: "Great product, exactly as described!",
    },
  },
]

export default function OrdersPage() {
  const [activeOrders, setActiveOrders] = useState(orders)
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [rating, setRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")
  const { toast } = useToast()

  const handleCancelReservation = (orderId: number) => {
    setActiveOrders(activeOrders.map((order) => (order.id === orderId ? { ...order, status: "Cancelled" } : order)))
    toast({
      title: "Reservation Cancelled",
      description: "Your reservation has been cancelled",
    })
  }

  const handleCompleteOrder = (orderId: number) => {
    setActiveOrders(
      activeOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "Completed",
              completedDate: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              reviewed: false,
            }
          : order,
      ),
    )
    toast({
      title: "Order Completed",
      description: "Your order has been marked as completed",
    })
  }

  const handleSubmitReview = () => {
    if (!selectedOrder) return

    setActiveOrders(
      activeOrders.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              reviewed: true,
              review: {
                rating,
                comment: reviewComment,
              },
            }
          : order,
      ),
    )
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    })
    setSelectedOrder(null)
    setRating(5)
    setReviewComment("")
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-teal">My Orders</h1>
        <p className="text-gray-500">Track your reservations and completed purchases</p>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeOrders
              .filter((order) => order.status === "Reserved")
              .map((order) => (
                <Card key={order.id}>
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <img
                      src={order.product.image || "/placeholder.svg"}
                      alt={order.product.title}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{order.product.title}</CardTitle>
                      <p className="text-lg font-bold text-teal">${order.product.price}</p>
                      <span className="inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                        {order.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={order.seller.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-teal-lightest text-teal">
                            {order.seller.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{order.seller.name}</p>
                          <div className="flex items-center">
                            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-500">{order.seller.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Reserved:</span> {order.reservedDate}
                        </p>
                        <p>
                          <span className="font-medium">Meetup:</span> {order.meetupLocation}
                        </p>
                        <p>
                          <span className="font-medium">Time:</span> {order.meetupTime}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => handleCancelReservation(order.id)}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button className="flex-1 bg-teal hover:bg-teal-dark" onClick={() => handleCompleteOrder(order.id)}>
                      <Check className="mr-2 h-4 w-4" />
                      Complete
                    </Button>
                    <Button variant="outline" size="icon" className="text-teal" asChild>
                      <Link href={`/messages/${order.seller.id}`}>
                        <MessageSquare className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            {activeOrders.filter((order) => order.status === "Reserved").length === 0 && (
              <div className="col-span-full py-12 text-center">
                <h3 className="mb-2 text-xl font-medium">No active reservations</h3>
                <p className="text-gray-500">Browse listings to find items you need</p>
                <Button asChild className="mt-4 bg-teal hover:bg-teal-dark">
                  <Link href="/browse">Browse Listings</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeOrders
              .filter((order) => order.status === "Completed")
              .map((order) => (
                <Card key={order.id}>
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <img
                      src={order.product.image || "/placeholder.svg"}
                      alt={order.product.title}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{order.product.title}</CardTitle>
                      <p className="text-lg font-bold text-teal">${order.product.price}</p>
                      <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        {order.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={order.seller.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-teal-lightest text-teal">
                            {order.seller.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{order.seller.name}</p>
                          <div className="flex items-center">
                            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-500">{order.seller.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Reserved:</span> {order.reservedDate}
                        </p>
                        <p>
                          <span className="font-medium">Completed:</span> {order.completedDate}
                        </p>
                        {order.reviewed && (
                          <div className="mt-2">
                            <p className="font-medium">Your Review:</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < (order.review?.rating || 0)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="mt-1 text-xs text-gray-500">{order.review?.comment}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {!order.reviewed ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-teal hover:bg-teal-dark" onClick={() => setSelectedOrder(order)}>
                            <Star className="mr-2 h-4 w-4" />
                            Leave Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Review Your Purchase</DialogTitle>
                            <DialogDescription>
                              Share your experience with {order.seller.name} and the {order.product.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="flex items-center justify-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => setRating(i + 1)}
                                  className="focus:outline-none"
                                >
                                  <Star
                                    className={`h-8 w-8 ${
                                      i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                            <Textarea
                              placeholder="Share your experience with this seller and product..."
                              value={reviewComment}
                              onChange={(e) => setReviewComment(e.target.value)}
                              className="h-32"
                            />
                          </div>
                          <DialogFooter>
                            <Button className="bg-teal hover:bg-teal-dark" onClick={handleSubmitReview}>
                              Submit Review
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/browse">Browse More Items</Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            {activeOrders.filter((order) => order.status === "Completed").length === 0 && (
              <div className="col-span-full py-12 text-center">
                <h3 className="mb-2 text-xl font-medium">No completed orders</h3>
                <p className="text-gray-500">Your completed purchases will appear here</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input placeholder="Search orders..." className="max-w-sm" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <img
                      src={order.product.image || "/placeholder.svg"}
                      alt={order.product.title}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{order.product.title}</CardTitle>
                      <p className="text-lg font-bold text-teal">${order.product.price}</p>
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          order.status === "Reserved"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={order.seller.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-teal-lightest text-teal">
                            {order.seller.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{order.seller.name}</p>
                          <div className="flex items-center">
                            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-500">{order.seller.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Reserved:</span> {order.reservedDate}
                        </p>
                        {order.status === "Reserved" ? (
                          <>
                            <p>
                              <span className="font-medium">Meetup:</span> {order.meetupLocation}
                            </p>
                            <p>
                              <span className="font-medium">Time:</span> {order.meetupTime}
                            </p>
                          </>
                        ) : (
                          <p>
                            <span className="font-medium">Completed:</span> {order.completedDate}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {order.status === "Reserved" ? (
                      <div className="flex w-full gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => handleCancelReservation(order.id)}>
                          Cancel
                        </Button>
                        <Button
                          className="flex-1 bg-teal hover:bg-teal-dark"
                          onClick={() => handleCompleteOrder(order.id)}
                        >
                          Complete
                        </Button>
                      </div>
                    ) : order.status === "Completed" && !order.reviewed ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-teal hover:bg-teal-dark" onClick={() => setSelectedOrder(order)}>
                            <Star className="mr-2 h-4 w-4" />
                            Leave Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Review Your Purchase</DialogTitle>
                            <DialogDescription>
                              Share your experience with {order.seller.name} and the {order.product.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="flex items-center justify-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => setRating(i + 1)}
                                  className="focus:outline-none"
                                >
                                  <Star
                                    className={`h-8 w-8 ${
                                      i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                            <Textarea
                              placeholder="Share your experience with this seller and product..."
                              value={reviewComment}
                              onChange={(e) => setReviewComment(e.target.value)}
                              className="h-32"
                            />
                          </div>
                          <DialogFooter>
                            <Button className="bg-teal hover:bg-teal-dark" onClick={handleSubmitReview}>
                              Submit Review
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/messages/${order.seller.id}`}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message Seller
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
