"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { fetchCases } from "@/lib/queries";

const fakeData = [
  {
    Category: "Habitability",
    Issue: "mold",
    "Total Issues": 32,
    "Success Rate": "89%",
    "Avg Duration (Years)": 3.2,
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

export const AggregatedDataTable = () => {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const supabase = createClient();

  const { data: cases } = useQuery(fetchCases(supabase));

  return (
    <>
      <h2 className="text-2xl font-bold px-2 mb-4">Aggregated Data</h2>
      <Table className="w-full h-fit bg-background rounded-md border mb-4">
        <TableHeader>
          <TableRow>
            {Object.keys(fakeData[0]).map((key) => (
              <TableHead key={key} className="w-auto py-2 bg-gray-100">
                {key}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {/* <ScrollArea className="h-1/3"> */}
        <TableBody>
          {fakeData.map((row) => (
            <TableRow>
              {Object.values(row).map((value) => (
                <TableCell
                  key={JSON.stringify(value)}
                  className="font-medium w-fit"
                >
                  {Array.isArray(value) ? (
                    <div className="flex flex-col gap-1">
                      {value.map((v) => (
                        <p key={v}>{v}</p>
                      ))}
                    </div>
                  ) : (
                    JSON.stringify(value)
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {/* </ScrollArea> */}
      </Table>
      <Table className="w-full h-fit bg-background rounded-md border">
        <TableHeader>
          <TableRow>
            {[
              "Hearing_Dates",
              "Hearing_Officer",
              "Landlord_Name",
              "Property_Address",
              "Case_Number",
              "Decision",
              "Reasoning_behind_the_decision",
              "Total_relief_granted",
            ].map((key) => (
              <TableHead className="w-auto py-2 bg-gray-100">{key}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {/* <ScrollArea className="h-1/3"> */}
        <TableBody>
          {/* @ts-ignore */}
          {cases?.map((row) => (
            <TableRow>
              {Object.values(row).map((value) => (
                <TableCell className="font-medium w-fit">
                  {Array.isArray(value) ? (
                    <div className="flex flex-col gap-1">
                      {value.map((v) => (
                        <p key={v}>{v}</p>
                      ))}
                    </div>
                  ) : (
                    JSON.stringify(value)
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {/* </ScrollArea> */}
      </Table>
    </>
  );
};