"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useFormStore } from "@/providers/intake-form-store-provider";

interface FormValues {
  landlord_name?: string;
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
}

export const IntakeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      landlord_name: "",
      city: [],
      lease_type: [],
      unit_type: [],
      habitability_issues: [],
      maintenance_issues: [],
      violations: [],
      loss_reduced_housing_services: [],
      length_of_tenancy: "",
      family_income_level: "",
      monthly_rent: "",
    },
  });

  const { setFormState } = useFormStore((state) => state);

  function onSubmit(values: FormValues) {
    setFormState(values);
  }

  const habitabilityIssues = [
    "Ineffective waterproofing to prevent wet or moldy walls",
    "Inadequate weather protection of roof and exterior walls or ceiling, including broken windows and doors",
    "Defective plumbing, drains, sewage system or toilet facilities",
    "Loss of or insufficient hot water or water supply",
    "Defective or broken heater or gas facilities",
    "Unsafe or inoperative electrical lighting, wiring or outlets and other equipment",
    "Building, yard, garage, hallways, stairs, and common areas are not clean, sanitary, or free from all accumulations of debris, filth, rubbish, garbage, rodents, and vermin, such as cockroaches or rats",
    "Inadequate trash receptacles in clean condition and good repair",
    "Floors; stairways, or railings are broken, rotting, or missing",
  ];

  const maintenanceIssues = [
    "Broken locks or security devices on the windows or doors",
    "Holes in floors, walls or ceilings",
    "Defective plumbing, drains, sewage system or toilet, sink, bathtub or shower",
    "Carpets or other floor coverings with holes, cracks, gaps, shredded or disintegrated material",
    "Deteriorated/broken cabinets or drawers",
    "Deteriorated countertops",
    "Window coverings with stains, holes, tears, or disintegrating fabric, or window coverings that have been removed",
    "Defective or inoperative appliance in unit",
    "Peeling, crumbling, stained, worn, scraped or cracked paint or peeling, torn, stained wall covering",
    "Missing or cracked, broken tile",
    "Bathtub or shower with glazing chipped or peeling",
    "Broken fan or vent",
    "Inoperative/missing exterior lights",
  ];

  const violations = [
    "Failure to comply with code violations that materially affect tenants' health and safety, including Health and Safety Code Sec. 17920.3. (Attach copy of Notice to Correct from City Building Inspector or Code Enforcement Officer, or County Environmental Health Inspector",
  ];

  const lossReducedHousingServices = [
    "Parking",
    "Broken or defective security gates, door or fencing",
    "Defective or inoperative elevator",
    "Broken or defective intercom",
    "Storage",
    "Laundry facilities",
    "Swimming pool or recreational facilities",
    "Play areas, yards, patios, balconies",
    "Landscaping or yard-care services",
    "Broken or missing mailbox",
    "No on-site resident manager services for rental properties with16 or more units",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-6">
        <FormField
          control={form.control}
          name="landlord_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landlord Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <div className="space-y-2">
                {["Mountain View", "Palo Alto"].map((city) => (
                  <FormField
                    key={city}
                    control={form.control}
                    name="city"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={city}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(city)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, city])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== city
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{city}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lease_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Lease</FormLabel>
              <div className="space-y-2">
                {["Written", "Verbal"].map((city) => (
                  <FormField
                    key={city}
                    control={form.control}
                    name="city"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={city}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(city)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, city])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== city
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{city}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Unit</FormLabel>
              <div className="space-y-2">
                {[
                  "Apartment",
                  "Duplex",
                  "Single Family Home",
                  "Subsidized Housing",
                ].map((city) => (
                  <FormField
                    key={city}
                    control={form.control}
                    name="city"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={city}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(city)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, city])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== city
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{city}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <h3 className="font-semibold">Tenant Issues</h3>
        <FormField
          control={form.control}
          name="habitability_issues"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habitability Problems</FormLabel>
              <div className="space-y-2">
                {habitabilityIssues.map((city) => (
                  <FormField
                    key={city}
                    control={form.control}
                    name="city"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={city}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(city)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, city])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== city
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{city}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maintenance_issues"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maintenance-Related Problems</FormLabel>
              <div className="space-y-2">
                {maintenanceIssues.map((city) => (
                  <FormField
                    key={city}
                    control={form.control}
                    name="city"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={city}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(city)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, city])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== city
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{city}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="violations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code Violations</FormLabel>
              <div className="space-y-2">
                {violations.map((city) => (
                  <FormField
                    key={city}
                    control={form.control}
                    name="city"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={city}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(city)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, city])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== city
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{city}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loss_reduced_housing_services"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loss of or Reduced Housing Services</FormLabel>
              <div className="space-y-2">
                {lossReducedHousingServices.map((city) => (
                  <FormField
                    key={city}
                    control={form.control}
                    name="city"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={city}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(city)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, city])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== city
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{city}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="length_of_tenancy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Length of Tenancy</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="family_income_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Family Income Level</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monthly_rent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Rent</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Run
        </Button>
      </form>
    </Form>
  );
};
