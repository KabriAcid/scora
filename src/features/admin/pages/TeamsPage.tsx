import AdminLayout from "@/components/layout/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const TeamsPage = () => (
  <AdminLayout>
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Teams"
        subtitle="Manage clubs, assign leagues and build squads."
        action={
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1.5" />
            New Team
          </Button>
        }
      />
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm border-2 border-dashed border-border rounded-xl">
        Teams table — coming soon
      </div>
    </div>
  </AdminLayout>
);

export default TeamsPage;
