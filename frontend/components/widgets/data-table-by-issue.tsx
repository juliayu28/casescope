"use client";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { fetchIssues } from "@/lib/queries";
import { createClient } from "@/utils/supabase/client";

export const DataTableByIssue = () => {
  const supabase = createClient();

  const { data: issues } = useQuery(fetchIssues(supabase));

  console.log(issues);

  return (
    issues && (
      <>
        <h2 className="text-2xl font-bold px-2 mb-4">By Issue</h2>
        <Table className="w-full h-fit bg-background rounded-sm">
          <TableHeader>
            <TableRow>
              {Object.keys(issues?.[0]).map((key) => (
                <TableHead className="w-auto py-2" key={key}>
                  {key}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues?.map((row) => (
              <TableRow>
                {Object.values(row).map((value) => (
                  <TableCell className="font-medium w-fit">
                    {Array.isArray(value) ? (
                      <div className="flex flex-col gap-1">
                        {value.map((v: string | number) => (
                          <p key={v}>{v}</p>
                        ))}
                      </div>
                    ) : typeof value === "object" && value !== null ? (
                      Object.entries(value).map(
                        ([k, v]: [string, string | number]) => (
                          <div key={k}>
                            {k}: {v}
                          </div>
                        )
                      )
                    ) : (
                      String(value)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )
  );
};
