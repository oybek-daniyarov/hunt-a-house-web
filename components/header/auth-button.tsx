"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';
import Link from "next/link";

export default function AuthButton() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = getCookie('auth_token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <Button 
            variant="outline" 
            size="sm" 
            asChild
        >
            <Link href={isAuthenticated ? '/dashboard' : '/auth/login'}>
                {isAuthenticated ? 'Dashboard' : 'Login'}
            </Link>
        </Button>
    );
} 