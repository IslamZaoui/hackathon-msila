"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Droplets } from "lucide-react"
import type { Patient } from "./page"

interface PatientsListProps {
  patients: Patient[]
}

export default function PatientsList({ patients }: PatientsListProps) {
  const router = useRouter()

  if (patients.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No patients found.</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {patients.map((patient) => (
        <Card key={patient.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Image
                src={patient.image || "/placeholder.svg"}
                alt={patient.name}
                width={80}
                height={80}
                className="rounded-full mb-4"
              />
              <h3 className="font-medium text-lg mb-1">{patient.name}</h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.age} years</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Gender:</span>
                  <span>{patient.gender}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 justify-center mt-1">
                  <Droplets className="h-4 w-4 text-destructive" />
                  <span>
                    Blood Type: <strong>{patient.bloodType}</strong>
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-center">
            <Button onClick={() => router.push(`/patients/${patient.id}`)}>View Details</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
