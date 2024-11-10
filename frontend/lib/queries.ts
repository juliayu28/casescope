export const fetchCases = (client: any) => {
  return client
    .from("hearing_data")
    .select(
      "Hearing_Dates, Hearing_Officer, Landlord_Name, Property_Address, Case_Number, Decision, Reasoning_behind_the_decision, Total_relief_granted"
    )
    .throwOnError();
};

export const fetchIssues = (client: any) => {
  return client
    .from("issues_info")
    .select(
      "Case_Number, Landlord_Name, City, Type_Of_Lease, Type_Of_Unit, Length_Of_Tenancy, Family_Income_Level, Monthly_Rent, category_of_tenant_issue"
    )
    .throwOnError();
};
