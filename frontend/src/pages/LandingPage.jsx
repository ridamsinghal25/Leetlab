import { faqs } from "@/components/landing/faqs";
import { features } from "@/components/landing/features";
import { stats } from "@/components/landing/stats";
import {
  FREE_PLAN_FEATURES,
  PRO_PLAN_FEATURES,
} from "@/components/pricing/planFeatures";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { Code2, Brain, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <div className="grid-background"></div>
      {/* Header */}
      <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">LeetLab</span>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full pt-36 md:pt-48 pb-10">
        <div className="space-y-6 text-center">
          <div className="space-y-6 mx-auto">
            <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-7xl gradient-title animate-gradient">
              Master Coding Challenges
              <br />
              with Leetlab
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
              Improve your programming skills and prepare for technical
              interviews with our collection of coding challenges.
            </p>
            <div className="space-x-4">
              <Link to={ROUTES.LOGIN}>
                <Button size="lg" className="px-8">
                  Start Practicing
                </Button>
              </Link>
              <Link to={ROUTES.LOGIN}>
                <Button variant="outline" size="lg" className="px-8">
                  View Problems
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Powerful Features for Your Career Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map(({ icon: Icon, ...feature }, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-colors duration-300"
              >
                <CardContent className="pt-6 text-center flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center">
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Trusted by Developers
              <span className="text-primary"> Worldwide</span>
            </h2>
            <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
              Join the community of successful developers who've advanced their
              careers with CodeMaster.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center group hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-xl font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Simple Steps to Coding Mastery
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our structured approach helps you systematically improve your
              coding skills and prepare for technical interviews.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card className="flex flex-col items-center space-y-4 rounded-lg bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold">Choose Your Path</h3>
              <p className="text-center text-muted-foreground">
                Select from curated problem sets based on your skill level,
                target companies, or specific topics.
              </p>
            </Card>
            <Card className="flex flex-col items-center space-y-4 rounded-lg bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold">Practice Daily</h3>
              <p className="text-center text-muted-foreground">
                Solve problems regularly with our interactive coding environment
                and get instant feedback.
              </p>
            </Card>
            <Card className="flex flex-col items-center space-y-4 rounded-lg bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold">Track & Improve</h3>
              <p className="text-center text-muted-foreground">
                Review your performance analytics, learn from detailed
                solutions, and continuously improve.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-12 md:py-24">
        <div>
          <div className="w-full">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  💰 Choose Your Plan
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Whether you're just starting out or ready to dive deeper into
                  technical prep, we've got the perfect plan for you.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
                {/* Free Plan */}
                <Card
                  className={`relative overflow-hidden border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-green-500" />
                      <CardTitle className="text-xl">Free Plan</CardTitle>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold">Always Free</h3>
                    </div>
                    <CardDescription className="text-sm font-medium text-muted-foreground">
                      Everything you need to start solving and improving.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {FREE_PLAN_FEATURES.map(
                        ({ icon: Icon, title, description }) => (
                          <div className="flex items-start gap-3" key={title}>
                            <Icon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">{title}</p>
                              <p className="text-sm text-muted-foreground">
                                {description}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground italic">
                        Perfect for students, self-learners, or anyone looking
                        to build a strong foundation at zero cost.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card
                  className={`relative overflow-hidden border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">Pro Plan</CardTitle>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold">₹2999</h3>
                    </div>
                    <CardDescription className="text-sm font-medium text-muted-foreground">
                      Unlock the full potential of your prep.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {PRO_PLAN_FEATURES.map(
                        ({ icon: Icon, title, description }) => (
                          <div className="flex items-start gap-3" key={title}>
                            <Icon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">{title}</p>
                              <p className="text-sm text-muted-foreground">
                                {description}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground italic">
                        Take your prep to the next level with data-backed
                        insights and tools built for serious candidates.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary text-primary-foreground">
        <div className="mx-auto py-24 gradient rounded-lg">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
              Join thousands of developers who have landed their dream jobs
              after practicing with Leetlab.
            </p>
            <Link to={ROUTES.SIGNUP}>
              <Button
                size="lg"
                variant="secondary"
                className="h-11 mt-5 animate-bounce"
              >
                Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LeetLab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
