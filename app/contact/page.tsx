"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react"

const contactInfo = [
  {
    institution: "University of Dodoma",
    color: "orange",
    contacts: [
      {
        name: "Dr. Abdallah Seni",
        role: "Project Leader",
        email: "abdallah.seni@udom.ac.tz",
        phone: "+255 123 456 789",
      },
      {
        name: "Dr. Ignasia Mligo",
        role: "Project Manager",
        email: "ignasia.mligo@udom.ac.tz",
        phone: "+255 123 456 790",
      },
    ],
    address: "University of Dodoma, Dodoma, Tanzania",
  },
  {
    institution: "Arusha Technical College",
    color: "blue",
    contacts: [
      {
        name: "Dr. Naisujaki S. Lyimo",
        role: "Project Manager",
        email: "naisujaki.lyimo@atc.ac.tz",
        phone: "+255 123 456 791",
      },
      {
        name: "Dr. Labani Kanyonga",
        role: "Research Coordinator",
        email: "labani.kanyonga@atc.ac.tz",
        phone: "+255 123 456 792",
      },
    ],
    address: "Arusha Technical College, Arusha, Tanzania",
  },
  {
    institution: "University of Graz",
    color: "green",
    contacts: [
      {
        name: "Prof. Dr. Heike Wendt",
        role: "Research Leader",
        email: "heike.wendt@uni-graz.at",
        phone: "+43 123 456 789",
      },
      {
        name: "Dr. Anna Aleksanyan",
        role: "Project Manager",
        email: "anna.aleksanyan@uni-graz.at",
        phone: "+43 123 456 790",
      },
    ],
    address: "University of Graz, Graz, Austria",
  },
]

const institutionColors = {
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Thank you for your message! We will get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Get in touch with our team for inquiries, collaboration opportunities, or support. We're here to help and
              would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Send className="h-6 w-6 mr-3 text-blue-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border-0 shadow-lg text-center p-6">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Response Time</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Within 24 hours</p>
              </Card>

              <Card className="border-0 shadow-lg text-center p-6">
                <Globe className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Languages</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">English, Swahili, German</p>
              </Card>

              <Card className="border-0 shadow-lg text-center p-6">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">General Email</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">info@step-study.org</p>
              </Card>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Direct Contact Information</h2>

            {contactInfo.map((institution, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Badge className={`mr-3 ${institutionColors[institution.color as keyof typeof institutionColors]}`}>
                      {institution.institution === "University of Dodoma" && "🟠"}
                      {institution.institution === "Arusha Technical College" && "🔵"}
                      {institution.institution === "University of Graz" && "🟢"}
                    </Badge>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{institution.institution}</h3>
                  </div>

                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{institution.address}</p>
                  </div>

                  <div className="space-y-3">
                    {institution.contacts.map((contact, contactIndex) => (
                      <div key={contactIndex} className="border-l-2 border-blue-200 dark:border-blue-800 pl-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{contact.name}</h4>
                        <p className="text-blue-600 dark:text-blue-400 text-xs mb-2">{contact.role}</p>
                        <div className="space-y-1">
                          <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            {contact.email}
                          </a>
                          <a
                            href={`tel:${contact.phone}`}
                            className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
