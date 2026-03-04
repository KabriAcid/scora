import AdminLayout from "@/components/layout/AdminLayout";
import { PageHeader } from "@/features/admin/components/PageHeader";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const FixturesPage = () => (
  <AdminLayout>
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Fixtures"
        subtitle="Schedule matches, set venues and assign live agents."
        action={
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1.5" />
            New Fixture
          </Button>
        }
      />
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm border-2 border-dashed border-border rounded-xl">
        Fixtures table — coming soon
      </div>
    </div>
  </AdminLayout>
);

export default FixturesPage;
