import { AdminLayout } from "@/components/admin/admin-layout"
import { ThemeDashboard } from "@/components/admin/theme-dashboard"

export default function AdminThemesPage() {
  return (
    <AdminLayout currentPage="themes">
      <ThemeDashboard />
    </AdminLayout>
  )
}
