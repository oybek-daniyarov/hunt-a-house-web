"use client"

import * as React from "react"
import { useState } from "react"
import { PhoneInputWithCountry } from "@/app/(main)/auth/_components/phone-input/phone-input"

interface PhoneInputProps {
    error?: boolean;
    onChange?: (value: string, isValid: boolean) => void;
    className?: string;
    value?: string;
    disabled?: boolean;
    name?: string;
    required?: boolean;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(({
    error,
    onChange,
    className,
    disabled,
    value,
    name,
    required,
}, ref) => {
    const [isPhoneValid, setIsPhoneValid] = useState(false)

    const handlePhoneChange = (value: string, isValid: boolean) => {
        setIsPhoneValid(isValid)
        onChange?.(value, isValid)
    }

    return (
        <div className={className}>
            <PhoneInputWithCountry
                name={name}
                value={value}
                disabled={disabled}
                required={required}
                placeholder="(555) 000-0000"
                onValueChange={handlePhoneChange}
            />
            {!isPhoneValid && value && (
                <p className="text-xs text-destructive">
                    Please enter a valid phone number
                </p>
            )}
        </div>
    )
})

PhoneInput.displayName = "PhoneInput"

export { PhoneInput } 