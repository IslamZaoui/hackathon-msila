"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Visit } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface VisitListProps {
  visits: Visit[]
}

export function VisitList({ visits }: VisitListProps) {
  if (visits.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
        <p className="text-sm text-muted-foreground">No visits found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {visits.map((visit) => (
        <Card key={visit.id}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col justify-between space-y-2 md:flex-row md:space-y-0">
                <h3 className="font-semibold">{visit.doctorName}</h3>
                <p className="text-sm text-muted-foreground">{formatDate(visit.visitDate)}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Specialty:</span> {visit.specialty}
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="report">
                  <AccordionTrigger>View Report</AccordionTrigger>
                  <AccordionContent>
                    <div className="max-h-60 overflow-y-auto rounded-md bg-muted p-4 text-sm">{visit.report}</div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
