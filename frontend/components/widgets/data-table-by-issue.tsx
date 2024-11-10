import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

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
  return (
    <>
      <h2 className="text-2xl font-bold px-2 mb-4">By Issue</h2>
      <Table className="w-full h-fit bg-background rounded-sm">
        <TableHeader>
          <TableRow>
            {Object.keys(fakeData[0]).map((key) => (
              <TableHead className="w-auto py-2">{key}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {fakeData.map((row) => (
            <TableRow>
              {Object.values(row).map((value) => (
                <TableCell className="font-medium w-fit">
                  {typeof value === "object" && value !== null ? (
                    <div className="flex flex-col gap-1">
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
  );
};
