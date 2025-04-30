"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePicker } from "@/components/date-picker"
import { TimeSlotPicker, type TimeSlot } from "@/components/time-slot-picker"
import { BookingForm } from "@/components/booking-form"
import type { DoctorUser } from "@/actions/auth.action"
import { createAppointment } from "@/actions/doctor/doctor-appointment.actions"

interface DoctorProfileProps {
  doctor: DoctorUser
}

const STATIC_TIME_SLOTS: TimeSlot[] = [
  { id: "1", time: "09:00", period: "morning", available: true },
  { id: "2", time: "10:00", period: "morning", available: true },
  { id: "3", time: "11:00", period: "morning", available: true },
  { id: "4", time: "14:00", period: "afternoon", available: true },
  { id: "5", time: "15:00", period: "afternoon", available: true },
  { id: "6", time: "16:00", period: "afternoon", available: true },
  { id: "7", time: "17:00", period: "evening", available: true },
  { id: "8", time: "18:00", period: "evening", available: true },
]

export function DoctorProfile({ doctor }: DoctorProfileProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTimeSlot(null)
    setShowBookingForm(false)
  }

  const handleSelectTimeSlot = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot)
    setShowBookingForm(true)
  }

  const handleCancelBooking = () => {
    setShowBookingForm(false)
  }

  const handleBookAppointment = async (data: { name: string; email: string; phone: string }) => {
    if (!selectedDate || !selectedTimeSlot) return

    // Combine date and time
    const appointmentDate = new Date(selectedDate)
    const [hours, minutes] = selectedTimeSlot.time.split(":")
    appointmentDate.setHours(parseInt(hours), parseInt(minutes))

    try {
      await createAppointment(doctor.id, appointmentDate)
      setShowBookingForm(false)
      // Show success message
    } catch (error) {
      // Show error message
      console.error("Failed to book appointment:", error)
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
                    <h3 className="text-lg font-semibold">Available Time Slots</h3>
                  </div>
                  <TimeSlotPicker timeSlots={STATIC_TIME_SLOTS} onSelectTimeSlot={handleSelectTimeSlot} />
                </div>
              )}

              {showBookingForm && (
                <BookingForm
                  doctorId={doctor.id}
                  selectedDate={selectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                  onCancel={handleCancelBooking}
                  onSubmit={handleBookAppointment}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
