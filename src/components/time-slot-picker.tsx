"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface TimeSlot {
  id: string
  time: string
  period: "morning" | "afternoon" | "evening"
  available: boolean
}

interface TimeSlotPickerProps {
  timeSlots: TimeSlot[]
  onSelectTimeSlot: (timeSlot: TimeSlot) => void
}

export function TimeSlotPicker({ timeSlots, onSelectTimeSlot }: TimeSlotPickerProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)

  const morningSlots = timeSlots.filter((slot) => slot.period === "morning")
  const afternoonSlots = timeSlots.filter((slot) => slot.period === "afternoon")
  const eveningSlots = timeSlots.filter((slot) => slot.period === "evening")

  const handleSelectTimeSlot = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot.id)
    onSelectTimeSlot(timeSlot)
  }

  const renderTimeSlots = (slots: TimeSlot[]) => {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-2">
        {slots.map((slot) => (
          <Button
            key={slot.id}
            variant={selectedTimeSlot === slot.id ? "default" : "outline"}
            size="sm"
            disabled={!slot.available}
            onClick={() => handleSelectTimeSlot(slot)}
            className="w-full"
          >
            {slot.time}
          </Button>
        ))}
      </div>
    )
  }

  return (
    <Tabs defaultValue="morning" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="morning">Morning</TabsTrigger>
        <TabsTrigger value="afternoon">Afternoon</TabsTrigger>
        <TabsTrigger value="evening">Evening</TabsTrigger>
      </TabsList>
      <TabsContent value="morning">
        {morningSlots.length > 0 ? (
          renderTimeSlots(morningSlots)
        ) : (
          <p className="text-center py-4 text-muted-foreground">No morning slots available</p>
        )}
      </TabsContent>
      <TabsContent value="afternoon">
        {afternoonSlots.length > 0 ? (
          renderTimeSlots(afternoonSlots)
        ) : (
          <p className="text-center py-4 text-muted-foreground">No afternoon slots available</p>
        )}
      </TabsContent>
      <TabsContent value="evening">
        {eveningSlots.length > 0 ? (
          renderTimeSlots(eveningSlots)
        ) : (
          <p className="text-center py-4 text-muted-foreground">No evening slots available</p>
        )}
      </TabsContent>
    </Tabs>
  )
}
