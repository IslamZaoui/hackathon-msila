// @ts-nocheck
"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, ArrowRight, Check, ChevronDown, Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { registerDoctorAction } from "@/actions/doctor/user.actions"
import { toast } from "sonner"
import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
export default function RegistrationForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 4

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        hcpId: "",
        specialization: "",
        profileImage: null,
    })
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState<boolean>(false);
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
        e.preventDefault();
        setPending(true);

        const fullName = `${formData.firstName} ${formData.lastName}`;
        const doctorData = {
            name: fullName,
            email: formData.email,
            password: formData.password,
            country: "Algeria",
            specialization: formData.specialization,
            hcpId: `DOC-${Date.now()}`,
        };


        const { error } = await registerDoctorAction(doctorData);
        if (error) {
            setError(error);
        }
        setPending(false);
    };

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

    const stepInfo = [
        { title: "Personal Information", description: "Enter your basic personal details" },
        { title: "Account Details", description: "Create your account credentials" },
        { title: "Professional Information", description: "Tell us about your professional informations" },
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
                        {/* Step 1 */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <div className="flex gap-2 flex-col">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                                </div>
                            </div>
                        )}

                        {/* Step 2 */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} required />
                                </div>
                            </div>
                        )}

                        {/* Step 3 */}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                                </div>
                                <div ref={selectRef}>
                                    <Label className="mb-2">Specialization</Label>
                                    <div className="relative">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsSelectOpen(!isSelectOpen)}
                                            className="w-full justify-between"
                                        >
                                            <span>{formData.specialization
                                                ? specializationOptions.find(opt => opt.value === formData.specialization)?.label
                                                : "Select specialization"}
                                            </span>
                                            <ChevronDown className={`h-4 w-4 transition-transform ${isSelectOpen ? "rotate-180" : ""}`} />
                                        </Button>
                                        {isSelectOpen && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md max-h-60 overflow-auto">
                                                {specializationOptions.map(option => (
                                                    <div
                                                        key={option.value}
                                                        className="px-3 py-2 cursor-pointer hover:bg-accent"
                                                        onClick={() => handleSpecializationChange(option.value)}
                                                    >
                                                        {option.label}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4 */}
                        {currentStep === 4 && (
                            <div className="space-y-4">
                                <Label htmlFor="profileImage">Profile Image</Label>
                                <Input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} />
                                {imagePreview && (
                                    <div className="flex justify-center">
                                        <img src={imagePreview} alt="Profile Preview" className="w-32 h-32 rounded-full object-cover border" />
                                    </div>
                                )}
                            </div>
                        )}
                    </form>
                </CardContent>

                <CardFooter className="flex justify-between">
                    {currentStep > 1 && (
                        <Button variant="outline" onClick={prevStep}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    )}
                    {currentStep < totalSteps ? (
                        <Button onClick={nextStep}>
                            Next <ArrowRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button type="submit" onClick={handleSubmit} disabled={pending}>
                            {pending ? (<><Loader className="animate-spin"></Loader> Continue</>) : "Continue"}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}
