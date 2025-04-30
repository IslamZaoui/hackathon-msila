"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePicker } from "@/components/date-picker"
import { TimeSlotPicker, type TimeSlot } from "@/components/time-slot-picker"
import { BookingForm } from "@/components/booking-form"

interface DoctorProfileProps {
  doctor: {
    id: string
    name: string
    specialty: string
    experience: number
    fee: string
    rating: number
    reviews: number
    about: string
  }
  timeSlots: TimeSlot[]
}

export function DoctorProfile({ doctor, timeSlots }: DoctorProfileProps) {
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

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-primary">
                  {doctor.specialty}
                </Badge>
                <Badge variant="outline">{doctor.experience} years experience</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Consultation Fee:</span>
                <span>{doctor.fee}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">{doctor.rating}%</div>
              <div className="text-sm text-muted-foreground">{doctor.reviews} patient reviews</div>
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
              <p>{doctor.about}</p>
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
                  <TimeSlotPicker timeSlots={timeSlots} onSelectTimeSlot={handleSelectTimeSlot} />
                </div>
              )}

              {showBookingForm && (
                <BookingForm
                  doctorId={doctor.id}
                  selectedDate={selectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                  onCancel={handleCancelBooking}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
