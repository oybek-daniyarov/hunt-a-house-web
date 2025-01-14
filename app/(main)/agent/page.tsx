import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AgentLandingPage() {
    return (
        <div className="container">
            <div className="py-20 lg:py-32">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
                    <div className="flex flex-col justify-center space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Get Quality Leads, Close More Deals
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Connect with serious buyers and renters who are actively looking for properties. 
                                Our platform helps you focus on qualified leads and close deals faster.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 min-[400px]:flex-row">
                            <Button size="lg" asChild>
                                <Link href="/auth/register/agent">
                                    Start Getting Leads
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                <p className="text-sm text-muted-foreground">
                                    Connect with verified buyers and renters
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2L2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
                                <p className="text-sm text-muted-foreground">
                                    Manage and track all your leads in one place
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                                <p className="text-sm text-muted-foreground">
                                    Track performance and conversion rates
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative h-[450px] w-full overflow-hidden rounded-xl bg-muted">
                            {/* Add agent dashboard preview image here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 