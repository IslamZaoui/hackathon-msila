import { getPatientVisits } from "@/lib/data"
import { VisitList } from "@/components/visit-list"

export default async function VisitsPage() {
  // Fetch visits data server-side
  const visits = await getPatientVisits()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Medical Visits</h1>
      </div>
      <VisitList visits={visits} />
    </div>
  )
}
