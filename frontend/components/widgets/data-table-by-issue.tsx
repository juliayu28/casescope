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

const fakeData = [
  {
    Category: "Habitability",
    Issue: "mold",
    "Total Issues": 32,
    "Success Rate": 0.89,
    "Avg Duration (Years)": 3.2,
    // typical_evidence: {
    //   photos: {
    //     frequency: 0.98,
    //     description: "Photographic evidence of mold",
    //   },
    //   health_reports: {
    //     frequency: 0.45,
    //     description: "Medical documentation",
    //   },
    //   inspection_reports: {
    //     frequency: 0.76,
    //     description: "Professional inspection findings",
    //   },
    //   humidity_readings: {
    //     frequency: 0.23,
    //     description: "Moisture measurements",
    //   },
    //   repair_requests: {
    //     frequency: 0.92,
    //     description: "Documentation of maintenance requests",
    //   },
    // },
    "Common Landlord Defenses": {
      "Tenant Ventilation": "65%",
      "Recent Painting": "40%",
      "Denied Knowledge": "35%",
      "Blamed Weather": "30%",
    },
    "Relief Percentage Range": {
      min: "5%",
      max: "15%",
    },
    "Relief Avg Dollar Amount": "3200",
    "Code Violations": [
      "H&S Code §17920.3(a)(13)",
      "Civil Code §1941.1(a)(1)",
      "Property Code §3762",
    ],
  },
];

export const DataTableByIssue = () => {
  const supabase = createClient();

  const { data: issues } = useQuery(fetchIssues(supabase));

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
                    {typeof value === "object" && value !== null ? (
                      <div
                        className="flex flex-col gap-1"
                        key={JSON.stringify(value)}
                      >
                        {Object.entries(value).map(([key, value]) => (
                          <p key={key}>
                            {key}: {value}
                          </p>
                        ))}
                      </div>
                    ) : Array.isArray(value) ? (
                      <div className="flex flex-col gap-1">
                        {value.map((v) => (
                          <p key={v}>{v}</p>
                        ))}
                      </div>
                    ) : (
                      value
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
