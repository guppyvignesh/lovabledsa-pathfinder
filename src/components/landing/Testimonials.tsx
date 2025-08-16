import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "SDE at Microsoft",
    image: "PS",
    content: "DSA Pathfinder helped me crack Microsoft's interview! The Striver A2Z sheet was comprehensive and the problem categorization made my preparation so much more structured.",
    rating: 5,
    company: "Microsoft"
  },
  {
    name: "Arjun Kumar",
    role: "Frontend Developer at Google",
    image: "AK",
    content: "The roadmaps feature is incredible. I followed the Frontend Developer path and landed at Google within 6 months. The community support was amazing throughout my journey.",
    rating: 5,
    company: "Google"
  },
  {
    name: "Sarah Chen",
    role: "Data Scientist at Meta",
    image: "SC",
    content: "From the job portal to the company-wise problem sets, everything is perfectly curated. The analytics feature helped me track my weak areas and improve systematically.",
    rating: 5,
    company: "Meta"
  },
  {
    name: "Rahul Verma",
    role: "SDE-2 at Amazon",
    image: "RV",
    content: "The platform's job tracking feature and income calculator helped me negotiate better offers. Got 40% hike in my current role. Absolutely worth the premium subscription!",
    rating: 5,
    company: "Amazon"
  },
  {
    name: "Emily Rodriguez",
    role: "Backend Engineer at Netflix",
    image: "ER",
    content: "I love how they integrate real company problems with difficulty levels. The WhatsApp community is super active and helpful for doubt clearing. Highly recommended!",
    rating: 5,
    company: "Netflix"
  },
  {
    name: "Karan Singh",
    role: "Full Stack Developer at Uber",
    image: "KS",
    content: "Started as a complete beginner and now working at Uber! The progressive difficulty in sheets and detailed solutions made complex topics easy to understand.",
    rating: 5,
    company: "Uber"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Hear from People Who 
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Transformed Their Careers
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who landed their dream jobs using DSA Pathfinder
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 bg-gradient-subtle hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${testimonial.image}`} />
                    <AvatarFallback className="bg-gradient-primary text-white text-sm">
                      {testimonial.image}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-4">
            Ready to join them?
          </p>
          <div className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              50,000+
            </span>
          </div>
          <p className="text-muted-foreground">
            developers have already started their journey
          </p>
        </div>
      </div>
    </section>
  );
};