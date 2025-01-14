import { RegisterForm } from "@/app/(main)/auth/_components/register-form"
import { redirect } from "next/navigation"

interface RegisterPageProps {
    params: {
        type: string
    }
}

export default function RegisterPage({ params }: RegisterPageProps) {
    // Validate and redirect if type is not valid
    if (!['agent', 'client'].includes(params.type)) {
        redirect('/auth/register/client')
    }

    return <RegisterForm userType={params.type as 'agent' | 'client'} />
} 