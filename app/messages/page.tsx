"use client"

import type React from "react"

import { useState } from "react"
import { ChevronsDown, ChevronsUp, HandCoins, Send, ShoppingCart, Star, ThumbsDown, ThumbsUp, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    user: {
      id: "user1",
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PP",
    },
    product: {
      id: 1,
      title: "Engineering Mechanics Textbook",
      price: 1200,
      image: "/placeholder.svg?height=60&width=60",
    },
    lastMessage: "Is this still available?",
    timestamp: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    user: {
      id: "user2",
      name: "Arjun Singh",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AS",
    },
    product: {
      id: 2,
      title: "Scientific Calculator TI-84",
      price: 1800,
      image: "/placeholder.svg?height=60&width=60",
    },
    lastMessage: "Would you take ₹1500 for it?",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    user: {
      id: "user3",
      name: "Ananya Gupta",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AG",
    },
    product: {
      id: 3,
      title: "Drafting Table",
      price: 3500,
      image: "/placeholder.svg?height=60&width=60",
    },
    lastMessage: "Can we meet tomorrow at the library?",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    user: {
      id: "user4",
      name: "Vikram Mehta",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "VM",
    },
    product: {
      id: 4,
      title: "Lab Coat (Size M)",
      price: 600,
      image: "/placeholder.svg?height=60&width=60",
    },
    lastMessage: "Thanks for the quick response!",
    timestamp: "Monday",
    unread: false,
  },
]

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: 1,
    sender: "user2",
    text: "Hi there! I'm interested in your Scientific Calculator TI-84.",
    timestamp: "Yesterday, 2:30 PM",
    isOffer: false,
  },
  {
    id: 2,
    sender: "me",
    text: "Hello! Yes, it's still available. It's in good condition with all functions working properly.",
    timestamp: "Yesterday, 2:45 PM",
    isOffer: false,
  },
  {
    id: 3,
    sender: "user2",
    text: "Great! What's the lowest you can go on the price?",
    timestamp: "Yesterday, 3:00 PM",
    isOffer: false,
  },
  {
    id: 4,
    sender: "me",
    text: "I'm asking ₹1800, but I could do ₹1650 if you can pick it up this week.",
    timestamp: "Yesterday, 3:15 PM",
    isOffer: false,
  },
  {
    id: 5,
    sender: "user2",
    text: "Would you take ₹1500 for it?",
    timestamp: "Yesterday, 3:30 PM",
    isOffer: true,
    offerAmount: 1500,
    offerStatus: "pending",
  },
  {
    id: 6,
    sender: "me",
    text: "I can meet you at ₹1600, that's the lowest I can go.",
    timestamp: "Yesterday, 3:45 PM",
    isOffer: true,
    offerAmount: 1600,
    offerStatus: "pending",
  },
  {
    id: 7,
    sender: "user2",
    text: "Let me think about it. How about ₹1550?",
    timestamp: "Yesterday, 4:00 PM",
    isOffer: true,
    offerAmount: 1550,
    offerStatus: "pending",
  },
]

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(conversations[1]) // Start with Arjun's conversation
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [showOfferPanel, setShowOfferPanel] = useState(false)
  const [offerAmount, setOfferAmount] = useState(activeConversation.product.price * 0.9) // Start at 90% of price
  const { toast } = useToast()

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() && !showOfferPanel) return

    if (showOfferPanel) {
      // Send offer
      const newMsg = {
        id: messages.length + 1,
        sender: "me",
        text: `I'm offering ₹${offerAmount} for this item.`,
        timestamp: "Just now",
        isOffer: true,
        offerAmount: offerAmount,
        offerStatus: "pending",
      }
      setMessages([...messages, newMsg])
      setShowOfferPanel(false)
    } else {
      // Send regular message
      const newMsg = {
        id: messages.length + 1,
        sender: "me",
        text: newMessage,
        timestamp: "Just now",
        isOffer: false,
      }
      setMessages([...messages, newMsg])
    }
    setNewMessage("")
  }

  const handleAcceptOffer = (offerId: number) => {
    setMessages(messages.map((msg) => (msg.id === offerId ? { ...msg, offerStatus: "accepted" } : msg)))
    toast({
      title: "Offer Accepted",
      description: `You've accepted the offer of ₹${messages.find((m) => m.id === offerId)?.offerAmount}`,
    })
  }

  const handleRejectOffer = (offerId: number) => {
    setMessages(messages.map((msg) => (msg.id === offerId ? { ...msg, offerStatus: "rejected" } : msg)))
    toast({
      title: "Offer Rejected",
      description: "You've rejected the offer",
    })
  }

  const handleCounterOffer = () => {
    setShowOfferPanel(true)
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-teal">Messages</h1>
        <p className="text-gray-500">Chat with buyers and sellers about listings</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardContent className="p-0">
            <div className="p-4">
              <Input placeholder="Search conversations..." />
            </div>
            <Separator />
            <ScrollArea className="h-[calc(100vh-250px)]">
              {conversations.map((conversation) => (
                <div key={conversation.id}>
                  <button
                    className={`flex w-full items-start gap-3 p-4 text-left hover:bg-gray-50 ${
                      activeConversation.id === conversation.id ? "bg-teal-lightest" : ""
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-teal-lightest text-teal">
                        {conversation.user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{conversation.user.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <p className="line-clamp-1 text-sm text-gray-500">{conversation.lastMessage}</p>
                      <p className="mt-1 line-clamp-1 text-xs text-gray-400">Re: {conversation.product.title}</p>
                    </div>
                    {conversation.unread && <div className="ml-2 h-2 w-2 rounded-full bg-teal"></div>}
                  </button>
                  <Separator />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          <CardContent className="flex h-[calc(100vh-180px)] flex-col p-0">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activeConversation.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-teal-lightest text-teal">
                    {activeConversation.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeConversation.user.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-500">4.8</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-teal">
                  <ShoppingCart className="mr-1 h-4 w-4" />
                  Complete Deal
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="border-b bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <img
                  src={activeConversation.product.image || "/placeholder.svg"}
                  alt={activeConversation.product.title}
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div>
                  <h4 className="font-medium">{activeConversation.product.title}</h4>
                  <p className="text-sm font-bold text-teal">₹{activeConversation.product.price}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "me" ? "bg-teal text-white" : "bg-gray-100"
                      } ${message.isOffer ? "border-2 border-teal-light" : ""}`}
                    >
                      {message.isOffer && (
                        <div
                          className={`mb-1 flex items-center gap-1 text-xs font-bold ${
                            message.sender === "me" ? "text-white" : "text-teal"
                          }`}
                        >
                          <HandCoins className="h-3 w-3" />
                          OFFER: ₹{message.offerAmount}
                          {message.offerStatus === "accepted" && (
                            <span className="ml-1 rounded-full bg-green-100 px-1.5 py-0.5 text-green-600">
                              Accepted
                            </span>
                          )}
                          {message.offerStatus === "rejected" && (
                            <span className="ml-1 rounded-full bg-red-100 px-1.5 py-0.5 text-red-600">Rejected</span>
                          )}
                        </div>
                      )}
                      <p>{message.text}</p>
                      <div
                        className={`mt-1 text-right text-xs ${
                          message.sender === "me" ? "text-white/70" : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </div>

                      {/* Offer actions - only show for received offers that are pending */}
                      {message.isOffer && message.sender !== "me" && message.offerStatus === "pending" && (
                        <div className="mt-2 flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 bg-white text-green-600 hover:bg-green-50"
                            onClick={() => handleAcceptOffer(message.id)}
                          >
                            <ThumbsUp className="mr-1 h-3 w-3" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 bg-white text-red-600 hover:bg-red-50"
                            onClick={() => handleRejectOffer(message.id)}
                          >
                            <ThumbsDown className="mr-1 h-3 w-3" />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 bg-white text-teal hover:bg-teal-lightest"
                            onClick={handleCounterOffer}
                          >
                            Counter
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t">
              {showOfferPanel && (
                <div className="border-b bg-teal-lightest p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Make an offer</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-500"
                      onClick={() => setShowOfferPanel(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2"
                      onClick={() => setOfferAmount(Math.max(offerAmount - 100, 0))}
                    >
                      <ChevronsDown className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <Slider
                        value={[offerAmount]}
                        min={activeConversation.product.price * 0.5}
                        max={activeConversation.product.price}
                        step={50}
                        onValueChange={(value) => setOfferAmount(value[0])}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2"
                      onClick={() => setOfferAmount(Math.min(offerAmount + 100, activeConversation.product.price))}
                    >
                      <ChevronsUp className="h-4 w-4" />
                    </Button>
                    <div className="min-w-[80px] rounded-md bg-white px-3 py-1 text-center font-medium">
                      ₹{offerAmount}
                    </div>
                  </div>
                </div>
              )}
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 p-3">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                  disabled={showOfferPanel}
                />
                <Button
                  variant="outline"
                  type="button"
                  className="text-teal"
                  onClick={() => setShowOfferPanel(!showOfferPanel)}
                >
                  <HandCoins className="h-4 w-4" />
                  Make Offer
                </Button>
                <Button type="submit" size="icon" className="bg-teal hover:bg-teal-dark">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
