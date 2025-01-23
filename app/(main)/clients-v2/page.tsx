"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { X, Check, User, MapPin, Home } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function ClientLandingPageV2() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactMethods: [] as string[],
    emirate: "",
    city: "",
    areas: [] as string[],
    propertyType: "",
    activityType: "",
    bedrooms: "",
    bathrooms: "",
    minSize: "",
    maxSize: "",
    minBudget: "",
    maxBudget: "",
    budgetFrequency: "",
    description: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAreaAdd = (area: string) => {
    if (formData.areas.length < 5 && !formData.areas.includes(area)) {
      setFormData(prev => ({ ...prev, areas: [...prev.areas, area] }));
    }
  };

  const handleAreaRemove = (area: string) => {
    setFormData(prev => ({ 
      ...prev, 
      areas: prev.areas.filter(a => a !== area) 
    }));
  };

  const handleContactMethodToggle = (method: string) => {
    setFormData(prev => ({
      ...prev,
      contactMethods: prev.contactMethods.includes(method)
        ? prev.contactMethods.filter(m => m !== method)
        : [...prev.contactMethods, method]
    }));
  };

  const steps = [
    { 
      title: "Contact", 
      description: "Your details",
      icon: User
    },
    { 
      title: "Location", 
      description: "Area preferences",
      icon: MapPin
    },
    { 
      title: "Property", 
      description: "Requirements",
      icon: Home
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center">
        <div className="w-full max-w-[90%] mx-auto">
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                Find Your Perfect Match
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl max-w-3xl mx-auto">
                Connect with top real estate agents who understand your needs
              </p>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.5
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">Scroll to explore</p>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-muted-foreground animate-bounce"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,450px] gap-12 max-w-[90%] mx-auto">
        {/* Main Content */}
        <div className="space-y-32">
          {/* How It Works Section */}
          <section id="how-it-works" className="py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">How It Works</h2>
              <p className="text-xl text-muted-foreground">Simple steps to connect with quality agents</p>
            </motion.div>
            <div className="grid gap-16 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6"
              >
                <div className="mx-auto rounded-full bg-primary/5 p-6 w-20 h-20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-2xl font-semibold">Submit Your Request</h3>
                <p className="text-lg text-muted-foreground">
                  Tell us about your property and what you want to achieve
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center space-y-6"
              >
                <div className="mx-auto rounded-full bg-primary/5 p-6 w-20 h-20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-2xl font-semibold">Get Matched</h3>
                <p className="text-lg text-muted-foreground">
                  We'll connect you with agents who specialize in your needs
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center space-y-6"
              >
                <div className="mx-auto rounded-full bg-primary/5 p-6 w-20 h-20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-2xl font-semibold">Close the Deal</h3>
                <p className="text-lg text-muted-foreground">
                  Work with your chosen agent to achieve your property goals
                </p>
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-24">
            <div className="grid gap-16 md:grid-cols-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h4 className="text-5xl font-bold text-primary">1000+</h4>
                <p className="text-lg text-muted-foreground">Active Agents</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                <h4 className="text-5xl font-bold text-primary">24/7</h4>
                <p className="text-lg text-muted-foreground">Support Available</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                <h4 className="text-5xl font-bold text-primary">98%</h4>
                <p className="text-lg text-muted-foreground">Success Rate</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4"
              >
                <h4 className="text-5xl font-bold text-primary">5000+</h4>
                <p className="text-lg text-muted-foreground">Properties Listed</p>
              </motion.div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">What Our Clients Say</h2>
              <p className="text-xl text-muted-foreground">Real stories from satisfied property owners</p>
            </motion.div>
            <div className="grid gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-primary/5 p-8 rounded-2xl"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10" />
                  <div>
                    <h4 className="text-xl font-semibold">Sarah Johnson</h4>
                    <p className="text-lg text-muted-foreground">Sold Property in Sydney</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  "The process was incredibly smooth. I found a great agent who helped me sell my property above market value."
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-primary/5 p-8 rounded-2xl"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10" />
                  <div>
                    <h4 className="text-xl font-semibold">Michael Chen</h4>
                    <p className="text-lg text-muted-foreground">Renting in Melbourne</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  "Found the perfect tenant for my investment property within weeks. The agent was professional and thorough."
                </p>
              </motion.div>
            </div>
          </section>
        </div>

        {/* Sticky Form */}
        <div className="hidden lg:block">
          <div className="sticky top-24 p-6 bg-primary/5 rounded-2xl mt-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Get Started Now</h3>
                <p className="text-lg text-muted-foreground">
                  {step === 1 
                    ? "First, let's get your contact information."
                    : step === 2
                    ? "Where are you looking to buy/rent/sell?"
                    : "Tell us about your property requirements."
                  }
                </p>
              </div>

              {/* Steps Indicator */}
              <div className="flex items-center justify-between mb-8">
                {steps.map((s, i) => (
                  <div 
                    key={s.title}
                    className={`
                      flex items-center gap-2
                      transition-colors duration-300
                      ${i + 1 === step ? 'text-primary' : 
                        i + 1 < step ? 'text-primary/80' : 
                        'text-muted-foreground/50'}
                    `}
                  >
                    {/* Step Icon */}
                    <div className="flex items-center gap-3">
                      {i + 1 < step ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <s.icon className="w-4 h-4" />
                      )}
                      <span className={`
                        text-sm font-medium
                        transition-all duration-300
                        ${i + 1 === step ? 'opacity-100' : 'opacity-70'}
                      `}>
                        {s.title}
                      </span>
                    </div>

                    {/* Connector Line */}
                    {i < steps.length - 1 && (
                      <div className="flex-1 mx-2 h-[1px] bg-muted-foreground/20">
                        <div 
                          className="h-full bg-primary/50 transition-all duration-500 ease-in-out"
                          style={{ 
                            width: i + 1 < step ? '100%' : 
                                   i + 1 === step ? '50%' : '0%' 
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {step === 1 ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <Input 
                        className="h-12 text-lg" 
                        placeholder="Your full name" 
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        className="h-12 text-lg" 
                        type="email" 
                        placeholder="Your email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        className="h-12 text-lg" 
                        placeholder="Phone number" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Contact Methods</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Phone Call', 'WhatsApp', 'Telegram', 'Email', 'SMS'].map((method) => (
                          <div key={method} className="flex items-center space-x-2">
                            <Checkbox 
                              checked={formData.contactMethods.includes(method)}
                              onCheckedChange={() => handleContactMethodToggle(method)}
                            />
                            <label className="text-sm">{method}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full h-12 text-lg" 
                      size="lg"
                      onClick={() => setStep(2)}
                      disabled={!formData.name || !formData.email || !formData.phone || formData.contactMethods.length === 0}
                    >
                      Next Step
                    </Button>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <Select
                        value={formData.emirate}
                        onValueChange={(value) => handleInputChange('emirate', value)}
                      >
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue placeholder="Select Emirate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ajman">Ajman</SelectItem>
                          <SelectItem value="dubai">Dubai</SelectItem>
                          <SelectItem value="sharjah">Sharjah</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => handleInputChange('city', value)}
                      >
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ajman-city">Ajman City</SelectItem>
                          <SelectItem value="dubai-city">Dubai City</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select
                        value=""
                        onValueChange={handleAreaAdd}
                        disabled={formData.areas.length >= 5}
                      >
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue placeholder="Select areas (up to 5)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="al-rashidiya">Al Rashidiya</SelectItem>
                          <SelectItem value="al-nuaimia">Al Nuaimia</SelectItem>
                          <SelectItem value="emirates-city">Emirates City</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.areas.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.areas.map((area) => (
                            <Badge 
                              key={area} 
                              variant="secondary"
                              className="flex items-center gap-1 py-1.5"
                            >
                              {area}
                              <X 
                                className="h-3 w-3 cursor-pointer" 
                                onClick={() => handleAreaRemove(area)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        className="w-1/3 h-12 text-lg" 
                        size="lg"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      <Button 
                        className="w-2/3 h-12 text-lg" 
                        size="lg"
                        onClick={() => setStep(3)}
                        disabled={!formData.emirate || !formData.city || formData.areas.length === 0}
                      >
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => handleInputChange('propertyType', value)}
                      >
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue placeholder="Property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select
                        value={formData.activityType}
                        onValueChange={(value) => handleInputChange('activityType', value)}
                      >
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue placeholder="What would you like to do?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Looking to Buy (×3.00)</SelectItem>
                          <SelectItem value="sell">Sell Property</SelectItem>
                          <SelectItem value="rent">Rent Out Property</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        value={formData.bedrooms}
                        onValueChange={(value) => handleInputChange('bedrooms', value)}
                      >
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue placeholder="Bedrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Bedroom</SelectItem>
                          <SelectItem value="2">2 Bedrooms</SelectItem>
                          <SelectItem value="3">3 Bedrooms</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={formData.bathrooms}
                        onValueChange={(value) => handleInputChange('bathrooms', value)}
                      >
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue placeholder="Bathrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Bathroom</SelectItem>
                          <SelectItem value="2">2 Bathrooms</SelectItem>
                          <SelectItem value="3">3 Bathrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input 
                          className="h-12 text-lg" 
                          type="number"
                          placeholder="Min Size (sq ft)" 
                          value={formData.minSize}
                          onChange={(e) => handleInputChange('minSize', e.target.value)}
                        />
                      </div>
                      <div>
                        <Input 
                          className="h-12 text-lg" 
                          type="number"
                          placeholder="Max Size (sq ft)" 
                          value={formData.maxSize}
                          onChange={(e) => handleInputChange('maxSize', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">AED</span>
                        <Input 
                          className="h-12 text-lg pl-12" 
                          type="number"
                          placeholder="Min budget" 
                          value={formData.minBudget}
                          onChange={(e) => handleInputChange('minBudget', e.target.value)}
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">AED</span>
                        <Input 
                          className="h-12 text-lg pl-12" 
                          type="number"
                          placeholder="Max budget" 
                          value={formData.maxBudget}
                          onChange={(e) => handleInputChange('maxBudget', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Select
                        value={formData.budgetFrequency}
                        onValueChange={(value) => handleInputChange('budgetFrequency', value)}
                      >
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue placeholder="Budget Frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Per Month</SelectItem>
                          <SelectItem value="yearly">Per Year</SelectItem>
                          <SelectItem value="total">Total Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Textarea 
                        placeholder="Description of your requirements..." 
                        className="h-32 text-lg resize-none"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        className="w-1/3 h-12 text-lg" 
                        size="lg"
                        onClick={() => setStep(2)}
                      >
                        Back
                      </Button>
                      <Button 
                        className="w-2/3 h-12 text-lg" 
                        size="lg"
                      >
                        Submit Request
                      </Button>
                    </div>
                  </motion.div>
                )}
                <p className="text-sm text-center text-muted-foreground">
                  By submitting, you'll receive a magic link to manage your property request.
                  No registration required.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 