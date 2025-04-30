"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Prescription } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface PrescriptionListProps {
  prescriptions: Prescription[]
}

export function PrescriptionList({ prescriptions }: PrescriptionListProps) {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)

  if (prescriptions.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
        <p className="text-sm text-muted-foreground">No prescriptions found</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex flex-col justify-between space-y-2 md:flex-row md:space-y-0">
                  <h3 className="font-semibold">Visit on {formatDate(prescription.visitDate)}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Specialty:</span> {prescription.specialty}
                </p>
                <Button onClick={() => setSelectedPrescription(prescription)} variant="outline">
                  View Prescription
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={selectedPrescription !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedPrescription(null)
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Prescription Details</DialogTitle>
          </DialogHeader>
          {selectedPrescription && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <h4 className="font-medium">Medications</h4>
                <div className="space-y-4">
                  {selectedPrescription.medications.map((medication, index) => (
                    <div key={index} className="rounded-md border p-4">
                      <div className="space-y-2">
                        <p className="font-semibold">{medication.name}</p>
                        <p className="text-sm">
                          <span className="font-medium">Dosage:</span> {medication.dosage}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Duration:</span> {medication.duration}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Instructions:</span> {medication.instructions}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Prescribed on {formatDate(selectedPrescription.visitDate)}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
