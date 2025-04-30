"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePicker } from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import type { DoctorUser } from "@/actions/auth.action"
import { createAppointment } from "@/actions/patient/patient-appointments.actions"

interface DoctorProfileProps {
  doctor: DoctorUser
}

export function DoctorProfile({ doctor }: DoctorProfileProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleBookAppointment = async () => {
    if (!selectedDate) return

    setIsSubmitting(true)
    try {
      await createAppointment(doctor.id, selectedDate)
      alert("Appointment booked successfully!")
      setSelectedDate(undefined)
    } catch (error) {
      console.error("Failed to book appointment:", error)
      alert("Failed to book appointment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-primary">
                  {doctor.specialization}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Phone:</span>
                <span>{doctor.phone}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">{doctor.country}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="about">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="booking" id="booking">
            Book Appointment
          </TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">About Doctor</h3>
              <p>Dr. {doctor.name} is a {doctor.specialization} based in {doctor.country}.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="booking" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Select Appointment Date</h3>
              <div className="mb-6">
                <DatePicker onSelectDate={handleSelectDate} />
              </div>

              {selectedDate && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Selected Date</h3>
                  </div>
                  <div className="text-center text-lg font-medium mb-4">
                    {selectedDate.toLocaleDateString()}
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleBookAppointment}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Booking..." : "Confirm Booking"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
