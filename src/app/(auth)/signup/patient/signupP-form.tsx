//@ts-nocheck
"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, ArrowRight, Check, Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

import { registerPatientAction } from "@/actions/patient/user.actions"

export default function RegistrationForm() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalSteps = 5

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        birthday: "",
        gender: "",
        bloodType: "",
        height: "",
        weight: "",
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

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
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
        setPending(true);
        const fullName = `${formData.firstName} ${formData.lastName}`
        const patientData = {
            name: fullName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            birthday: new Date(formData.birthday),
            gender: formData.gender,
            bloodType: formData.bloodType,
            height: Number.parseInt(formData.height),
            weight: Number.parseInt(formData.weight),
            country: "Algeria",
            hcpId: `DOC-${Date.now()}`,
        }

        const { error } = await registerPatientAction(patientData)
        if (error) {
            setError(error);
        }
        setPending(false);
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
        { title: "Contact Information", description: "How can we reach you?" },
        { title: "Medical Information", description: "Tell us about your medical details" },
        { title: "Profile Image", description: "Upload a profile photo" },
    ]

    const bloodTypeOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

    return (
        <div className="flex justify-center items-center p-4 w-full max-w-md">
            <Card className="w-full border-none shadow-none">
                <CardHeader>
                    {error ? (
                        <Alert variant="destructive" className="mb-4 bg-red-400/10 border border-red-400">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>
                    ) : ""}
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
                                    <div className={`h-1 w-12 mt-4 -mx-2 ${currentStep > index + 1 ? "bg-primary" : "bg-muted"}`} />
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
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="birthday">Date of Birth</Label>
                                    <Input
                                        id="birthday"
                                        name="birthday"
                                        type="date"
                                        value={formData.birthday}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>Gender</Label>
                                    <RadioGroup
                                        value={formData.gender}
                                        onValueChange={(value) => handleSelectChange("gender", value)}
                                        className="flex gap-4 mt-2"
                                        required
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="male" id="male" />
                                            <Label htmlFor="male">Male</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="female" id="female" />
                                            <Label htmlFor="female">Female</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        {currentStep === 3 && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                                </div>
                            </>
                        )}
                        {currentStep === 4 && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="bloodType">Blood Type</Label>
                                    <Select
                                        value={formData.bloodType}
                                        onValueChange={(value) => handleSelectChange("bloodType", value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select blood type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bloodTypeOptions.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="height">Height (cm)</Label>
                                    <Input
                                        id="height"
                                        name="height"
                                        type="number"
                                        value={formData.height}
                                        onChange={handleInputChange}
                                        min="1"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input
                                        id="weight"
                                        name="weight"
                                        type="number"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                        min="1"
                                        required
                                    />
                                </div>
                            </>
                        )}
                        {currentStep === 5 && (
                            <>
                                <Label htmlFor="profileImage">Profile Image</Label>
                                <Input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} />
                                {imagePreview && (
                                    <div className="flex justify-center">
                                        <img
                                            src={imagePreview || "/placeholder.svg"}
                                            alt="Profile Preview"
                                            className="w-32 h-32 rounded-full object-cover border"
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>

                    <CardFooter className="flex justify-between mt-4">
                        {currentStep > 1 && (
                            <Button variant="outline" type="button" onClick={prevStep}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                        )}
                        {currentStep < totalSteps ? (
                            <Button type="button" onClick={nextStep} className="ml-auto">
                                Next <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : ("")}
                        {currentStep == totalSteps ? (
                            <Button type="submit" className="ml-auto" disabled={pending}>
                                {pending ? (<><Loader className="animate-spin"></Loader> Continue</>) : ("Continue")}
                            </Button>
                        ) : ("")}
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
