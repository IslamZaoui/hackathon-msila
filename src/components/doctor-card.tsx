import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export interface Doctor {
  id: string
  name: string
  photo: string
  clinicName: string
  address: string
  phone: string
  specialty: string
}

interface DoctorCardProps {
  doctor: Doctor
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image src={doctor.photo || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{doctor.name}</h3>
          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
          <div className="mt-2">
            <p className="font-medium text-sm">{doctor.clinicName}</p>
            <p className="text-sm text-muted-foreground">{doctor.address}</p>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <Phone size={14} />
            <span>{doctor.phone}</span>
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
