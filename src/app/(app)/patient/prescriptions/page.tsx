import { getPatientPrescriptions } from "@/lib/data"
import { PrescriptionList } from "@/components/prescription-list"

export default async function PrescriptionsPage() {
  // Fetch prescriptions data server-side
  const prescriptions = await getPatientPrescriptions()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Prescriptions</h1>
      </div>
      <PrescriptionList prescriptions={prescriptions} />
    </div>
  )
}
