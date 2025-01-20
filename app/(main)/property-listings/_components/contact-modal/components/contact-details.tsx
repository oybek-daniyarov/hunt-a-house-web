import { Phone, Mail, MessageSquare, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ContactDetailsProps {
    contact: {
        name: string
        role: string
        company: string
        phone: string
        whatsapp: string
        telegram: string
        email: string
    }
}

const contactDetails = [
    {
        icon: Phone,
        label: "Phone",
        getValue: (contact: ContactDetailsProps['contact']) => contact.phone,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
    },
    {
        icon: MessageSquare,
        label: "WhatsApp",
        getValue: (contact: ContactDetailsProps['contact']) => contact.whatsapp,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        icon: MessageSquare,
        label: "Telegram",
        getValue: (contact: ContactDetailsProps['contact']) => contact.telegram,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        icon: Mail,
        label: "Email",
        getValue: (contact: ContactDetailsProps['contact']) => contact.email,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
    }
]

export function ContactDetails({ contact }: ContactDetailsProps) {
    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
        toast.success(`${label} copied to clipboard`)
    }

    return (
        <div className="space-y-4 pt-6 border-t">
            <div className="space-y-1.5">
                <h3 className="text-lg font-medium tracking-tight">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">{contact.role} • {contact.company}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactDetails.map(({ icon: Icon, label, getValue, color }) => (
                    <div key={label} className="group flex items-center gap-3">
                        <div className={cn("rounded-full p-2 bg-opacity-10", color.replace('text-', 'bg-'))}>
                            <Icon className={cn("h-4 w-4", color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-muted-foreground">{label}</p>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium truncate">{getValue(contact)}</p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => copyToClipboard(getValue(contact), label)}
                                >
                                    <Copy className="h-3 w-3" />
                                    <span className="sr-only">Copy {label}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 