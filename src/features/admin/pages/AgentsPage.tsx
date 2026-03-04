import AdminLayout from "@/components/layout/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AgentsPage = () => (
  <AdminLayout>
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Agents"
        subtitle="Create agent accounts and manage match assignments."
        action={
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1.5" />
            New Agent
          </Button>
        }
      />
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm border-2 border-dashed border-border rounded-xl">
        Agents table — coming soon
      </div>
    </div>
  </AdminLayout>
);

export default AgentsPage;
