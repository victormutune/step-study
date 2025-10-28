import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-10 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-10 w-56 h-56 bg-blue-200/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Transform Education?
          </h2>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-blue-100 mb-12 leading-relaxed">
            Join our collaborative research initiative and be part of the educational transformation. Together, we can
            strengthen teacher capacity and improve learning outcomes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm bg-transparent"
            >
              <Link href="/research">
                Explore Research
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-16 pt-8 border-t border-blue-400/20">
            <p className="text-blue-200 text-sm">
              For immediate inquiries, reach out to our team leaders at each institution
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
