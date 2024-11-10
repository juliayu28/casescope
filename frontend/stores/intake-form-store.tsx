import { createStore } from "zustand";

export type FormState = {
  landlord_name: string | undefined;
  city: string[];
  lease_type: string[];
  unit_type: string[];
  tenant_issues: string;
  habitability_issues: string[];
  maintenance_issues: string[];
  violations: string[];
  loss_reduced_housing_services: string[];
  length_of_tenancy: string;
  family_income_level: string;
  monthly_rent: string;
};

export type FormActions = {
  setFormState: (formState: FormState) => void;
};

export type FormStore = FormState & FormActions;

export const defaultFormState = {
  landlord_name: undefined,
  city: [],
  lease_type: [],
  unit_type: [],
  tenant_issues: "",
  habitability_issues: [],
  maintenance_issues: [],
  violations: [],
  loss_reduced_housing_services: [],
  length_of_tenancy: "",
  family_income_level: "",
  monthly_rent: "",
};

export const createFormStore = (initState: FormState = defaultFormState) => {
  return createStore<FormState & FormActions>()((set) => ({
    ...initState,
    setFormState: (formState: FormState) => set({ ...formState }),
  }));
};
