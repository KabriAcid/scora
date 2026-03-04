import AdminLayout from "@/components/layout/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";

const SettingsPage = () => (
  <AdminLayout>
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Platform configuration, season management and admin profile."
      />
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm border-2 border-dashed border-border rounded-xl">
        Settings panel — coming soon
      </div>
    </div>
  </AdminLayout>
);

export default SettingsPage;
