import {RegisterForm} from "@/app/(main)/auth/_components/register-form"
import {redirect} from "next/navigation"

interface RegisterPageProps {
    params: Promise<{ type: string }>
}

export default async function RegisterPage({params}: RegisterPageProps) {
    const {type} = await params
    
    // Validate and redirect if type is not valid
    if (!['agent', 'client'].includes(type)) {
        redirect('/auth/register/client')
    }

    return <RegisterForm userType={type as 'agent' | 'client'}/>
} 
