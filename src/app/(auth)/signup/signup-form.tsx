// @ts-nocheck
"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, ArrowRight, Check, User, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function RegistrationForm() {
    const router = useRouter();

    // Current step state
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 4

    // Form data state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        specialization: "",
        profileImage: null,
    })

    // Image preview state
    const [imagePreview, setImagePreview] = useState(null)

    // Select dropdown state
    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const selectRef = useRef(null)

    // Close select dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsSelectOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Handle role selection
    const handleRoleChange = (value) => {
        setFormData((prev) => ({ ...prev, role: value }))
    }

    // Handle specialization selection
    const handleSpecializationChange = (value) => {
        setFormData((prev) => ({ ...prev, specialization: value }))
        setIsSelectOpen(false)
    }

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData((prev) => ({ ...prev, profileImage: file }))

            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the data to your backend
        console.log("Form submitted:", formData)
        router.push('/verification')
        // alert("Registration successful!")
    }

    // Navigation functions
    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    // Step titles and descriptions
    const stepInfo = [
        {
            title: "Personal Information",
            description: "Enter your basic personal details",
        },
        {
            title: "Account Details",
            description: "Create your account credentials",
        },
        {
            title: "Professional Information",
            description: "Tell us about your professional role",
        },
        {
            title: "Profile Image",
            description: "Upload a professional photo",
        },
    ]

    // Specialization options
    const specializationOptions = [
        { value: "cardiology", label: "Cardiology" },
        { value: "dermatology", label: "Dermatology" },
        { value: "neurology", label: "Neurology" },
        { value: "orthopedics", label: "Orthopedics" },
        { value: "pediatrics", label: "Pediatrics" },
        { value: "psychiatry", label: "Psychiatry" },
        { value: "surgery", label: "Surgery" },
        { value: "other", label: "Other" },
    ]

    return (
        <div className="flex justify-center items-center p-4 w-full max-w-md">
            <Card className="w-full border-none shadow-none">
                <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                        {Array.from({ length: totalSteps }).map((_, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep > index + 1
                                        ? "bg-primary text-primary-foreground"
                                        : currentStep === index + 1
                                            ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                                            : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {currentStep > index + 1 ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
                                </div>
                                {index < totalSteps - 1 && (
                                    <div className={`h-1 w-16 mt-4 -mx-2 ${currentStep > index + 1 ? "bg-primary" : "bg-muted"}`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <CardTitle className="text-center">{stepInfo[currentStep - 1].title}</CardTitle>
                    <CardDescription className="text-center">{stepInfo[currentStep - 1].description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="John"
                                        required
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Doe"
                                        required
                                        className="h-12"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Account Details */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="john.doe@example.com"
                                        required
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="h-12"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 3: Professional Information */}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+1 (555) 123-4567"
                                        required
                                        className="h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Professional Role</Label>
                                    <RadioGroup
                                        value={formData.role}
                                        onValueChange={handleRoleChange}
                                        className="flex space-x-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="doctor" id="doctor" />
                                            <Label htmlFor="doctor">Doctor</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="pharmacist" id="pharmacist" />
                                            <Label htmlFor="pharmacist">Pharmacist</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {formData.role === "doctor" && (
                                    <div className="space-y-2" ref={selectRef}>
                                        <Label htmlFor="specialization">Specialization</Label>
                                        <div className="relative">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setIsSelectOpen(!isSelectOpen)}
                                                className="w-full justify-between h-12"
                                            >
                                                <span>
                                                    {formData.specialization
                                                        ? specializationOptions.find((opt) => opt.value === formData.specialization)?.label
                                                        : "Select specialization"}
                                                </span>
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform ${isSelectOpen ? "transform rotate-180" : ""}`}
                                                />
                                            </Button>

                                            {isSelectOpen && (
                                                <div className="absolute z-10 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-60 overflow-auto">
                                                    {specializationOptions.map((option) => (
                                                        <div
                                                            key={option.value}
                                                            className="px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                                                            onClick={() => handleSpecializationChange(option.value)}
                                                        >
                                                            {option.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 4: Profile Image */}
                        {currentStep === 4 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="profileImage">Profile Image</Label>
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-muted shadow-md transition-all duration-300 hover:shadow-primary/20 flex items-center justify-center bg-muted">
                                            {imagePreview ? (
                                                <img
                                                    src={imagePreview}
                                                    alt="Profile preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <User className="h-16 w-16 text-muted-foreground" />
                                            )}
                                        </div>
                                        <Input
                                            id="profileImage"
                                            name="profileImage"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="cursor-pointer h-12"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {currentStep > 1 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                            className="flex items-center h-12"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    )}

                    {currentStep < totalSteps ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                            className={`flex items-center h-12 ${currentStep === 1 ? "w-full justify-center" : "ml-auto"}`}
                        >
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="flex items-center h-12"
                            onClick={handleSubmit}
                        >
                            Register <Check className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}
