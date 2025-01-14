import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ClientLandingPage() {
    return (
        <div className="container">
            <div className="py-20 lg:py-32">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
                    <div className="flex flex-col justify-center space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Sell or Rent Your Property with Top Agents
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Connect with experienced, verified real estate agents who will help you 
                                get the best value for your property, whether selling or renting.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 min-[400px]:flex-row">
                            <Button size="lg" asChild>
                                <Link href="/auth/register/client">
                                    List Your Property
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/auth/login">
                                    Sign In
                                </Link>
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <p className="text-sm text-muted-foreground">
                                    Connect with verified, experienced agents
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                                <p className="text-sm text-muted-foreground">
                                    Get market-based property valuation
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4"/><path d="M5 21V10.85"/><path d="M19 21V10.85"/><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>
                                <p className="text-sm text-muted-foreground">
                                    Professional property marketing
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative h-[450px] w-full overflow-hidden rounded-xl bg-muted">
                            {/* Add home search preview image here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 