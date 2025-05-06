// @ts-nocheck
"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { toast } from "sonner"

import { registerPatientAction } from "@/actions/patient/user.actions"

export default function RegistrationForm() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 4

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        bloodType: "",
        height: "",
        weight: "",
        country: "",
        
        profileImage: null,
    })

    const [imagePreview, setImagePreview] = useState(null)
    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const selectRef = useRef(null)

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

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleRoleChange = (value) => {
        setFormData((prev) => ({ ...prev, role: value }))
    }

    const handleSpecializationChange = (value) => {
        setFormData((prev) => ({ ...prev, specialization: value }))
        setIsSelectOpen(false)
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const fullName = `${formData.firstName} ${formData.lastName}`
        const patientData = {
            name: fullName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            birthday: new Date("22/01/2004"), 
            gender: "male",
            bloodType: "O+",
            height: 177,
            weight: 83,
            country: "Algeria",
            hcpId: `DOC-${Date.now()}`,
        }

        const { error } = await registerPatientAction(patientData)
        console.log("error", error)
        if (error) {
            toast.error(error.message)
        } 
    }

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const stepInfo = [
        { title: "Personal Information", description: "Enter your basic personal details" },
        { title: "Account Details", description: "Create your account credentials" },
        { title: "Professional Information", description: "Tell us about your professional role" },
        { title: "Profile Image", description: "Upload a professional photo" },
    ]

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
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        currentStep > index + 1
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

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {currentStep === 1 && (
                            <>
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                                </div>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} required />
                                </div>
                            </>
                        )}
                        {currentStep === 3 && (
                            <>
                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                                </div>
                            </>
                        )}
                        {currentStep === 4 && (
                            <>
                                <Label htmlFor="profileImage">Profile Image</Label>
                                <Input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} />
                                {imagePreview && (
                                    <div className="flex justify-center">
                                        <img src={imagePreview} alt="Profile Preview" className="w-32 h-32 rounded-full object-cover border" />
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        {currentStep > 1 && (
                            <Button variant="outline" type="button" onClick={prevStep}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                        )}
                        {currentStep < totalSteps ? (
                            <Button type="button" onClick={nextStep}>
                                Next <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button type="submit">
                                Submit
                            </Button>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
