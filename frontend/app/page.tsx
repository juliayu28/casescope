import { IntakeForm } from "@/components/intake-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AggregatedDataTable } from "@/components/widgets/aggregated-data-table";
import { DataTableByIssue } from "@/components/widgets/data-table-by-issue";

export default function Index() {
  return (
    <div className="flex h-screen max-w-screen">
      <div className="w-[300px] px-4 h-full ">
        <ScrollArea className="h-full border-r border-gray-200 pr-2">
          <IntakeForm />
        </ScrollArea>
      </div>
      <div className="px-4 py-6 w-full">
        <ScrollArea className="h-full">
          {/* <div className="h-full bg-gray-100 px-6 py-6 rounded-lg w-full space-y-4"> */}
          <Tabs defaultValue="aggregated">
            <TabsList>
              <TabsTrigger value="aggregated">Aggregated</TabsTrigger>
              <TabsTrigger value="by-issue">By Issue</TabsTrigger>
            </TabsList>
            <TabsContent value="aggregated">
              <AggregatedDataTable />
            </TabsContent>
            <TabsContent value="by-issue">
              <DataTableByIssue />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
}
