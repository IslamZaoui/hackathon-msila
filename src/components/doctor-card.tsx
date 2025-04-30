import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { DoctorUser } from "@/actions/auth.action"

interface DoctorCardProps {
  doctor: DoctorUser
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <span className="text-4xl font-medium">
              {doctor.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{doctor.name}</h3>
          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
          <div className="mt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{doctor.country}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{doctor.phone}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/doctors/${doctor.id}`} className="w-full">
          <Button className="w-full">Book Appointment</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
