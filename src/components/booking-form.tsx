"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { TimeSlot } from "@/components/time-slot-picker"

interface BookingFormProps {
  doctorId: string
  selectedDate: Date | undefined
  selectedTimeSlot: TimeSlot | null
  onCancel: () => void
}

export function BookingForm({ doctorId, selectedDate, selectedTimeSlot, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    reason: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Handle successful booking
      alert("Appointment booked successfully!")
      onCancel()
    } catch (error) {
      console.error("Error booking appointment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!selectedDate || !selectedTimeSlot) {
    return null
  }

  return (
    <div className="mt-6 border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Booking Confirmation</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reason">Reason for Visit</Label>
          <Textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} rows={3} required />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </Button>
        </div>
      </form>
    </div>
  )
}
