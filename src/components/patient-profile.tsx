import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import type { Patient } from "@/lib/types"

interface PatientProfileProps {
  patient: Patient
}

export function PatientProfile({ patient }: PatientProfileProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <Avatar className="h-24 w-24">
            <AvatarImage src={patient.profilePicture || "/placeholder.svg"} alt={patient.name} />
            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{patient.name}</h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground md:justify-start">
              <div className="flex items-center">
                <span className="mr-1 font-medium">Gender:</span> {patient.gender}
              </div>
              <div className="flex items-center">
                <span className="mr-1 font-medium">Age:</span> {patient.age}
              </div>
              <div className="flex items-center">
                <span className="mr-1 font-medium">Blood Type:</span>{" "}
                <span className="font-semibold">{patient.bloodType}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
