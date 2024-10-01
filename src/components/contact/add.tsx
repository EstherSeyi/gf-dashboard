import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import isMobilePhone from "validator/lib/isMobilePhone";

import Input from "../ui/input";
import SearchAddress from "./search-address";
import Button from "../ui/button";
import { notify } from "src/lib/utils";

const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  phoneNumber: z.string().refine((val) => isMobilePhone(val), {
    message: "Valid phone number is required.",
  }),
  email: z.string().email({ message: "Valid email is required." }),
  locationDetails: z
    .array(
      z.object({
        address: z.string(),
        longitude: z.number(),
        latitude: z.number(),
      })
    )
    .min(1, {
      message: `You need to add at least 1 address.`,
    })
    .max(5, {
      message: `You can add at most 5 addressed.`,
    }),
});

export default function NewContact() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      locationDetails: [],
    },
    mode: "onChange",
  });

  const { fields, prepend, remove } = useFieldArray({
    name: "locationDetails",
    control,
    rules: {
      required: "Please add at least 1 address",
    },
  });

  const submitForm = (val: z.infer<typeof contactSchema>) => {
    try {
      const storageKey = "contactList";
      let parsedExistingContacts;

      const existingContacts = localStorage.getItem(storageKey);
      if (existingContacts) {
        parsedExistingContacts = JSON.parse(existingContacts);
      }

      if (parsedExistingContacts && Array.isArray(parsedExistingContacts)) {
        parsedExistingContacts.push(val);
      } else {
        parsedExistingContacts = [val];
      }

      localStorage.setItem(storageKey, JSON.stringify(parsedExistingContacts));
      notify({
        message: "Contact Added",
        type: "success",
      });
      reset();
    } catch {
      notify({
        message: "Failed to add contact",
        type: "error",
      });
    }
  };

  return (
    <div className="mt-10">
      <section className="flex flex-col items-center">
        <h1 className="text-lg w-full sm:max-w-3xl font-semibold mb-8">
          Add Contact
        </h1>
        <form
          className="w-full sm:max-w-3xl flex flex-col gap-4"
          onSubmit={handleSubmit(submitForm)}
        >
          <div>
            <Input
              {...register("name")}
              type="text"
              placeholder="Enter Name"
              className="border"
              label="Name"
              errorMessage={errors.name?.message}
            />
          </div>
          <div>
            <Input
              {...register("phoneNumber")}
              type="text"
              placeholder="Enter Phone Number"
              className="border"
              label="Phone Number"
              errorMessage={errors.phoneNumber?.message}
            />
          </div>
          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter Email"
              className="border"
              label="Email"
              errorMessage={errors.email?.message}
            />
          </div>

          <section>
            <div className="mb-4 flex gap-2 items-center">
              <h3 className="mb-0 text-lg">Addresses</h3>
              <span className="text-xs italic">
                ({fields.length < 5 ? "Max. 5" : "You have 5 addresses"})
              </span>
            </div>
            {fields.length < 5 ? (
              <SearchAddress
                onSelect={(val) => {
                  prepend(val);
                }}
              />
            ) : null}

            <div className="mt-4 flex flex-col gap-4">
              {fields.map((item, index) => {
                return (
                  <div key={item.id} className="flex flex-col gap-2">
                    <Input
                      type="text"
                      placeholder="0"
                      className="border"
                      label={
                        <span className="flex justify-between">
                          <span>Address {index + 1}</span>
                          <button
                            onClick={() => remove(index)}
                            className="text-red-600"
                          >
                            Remove
                          </button>
                        </span>
                      }
                      defaultValue={item.address}
                      disabled
                    />

                    <div className="grid min-[320px]:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        placeholder="0"
                        className="border"
                        label="Longitude"
                        defaultValue={item.longitude}
                        disabled
                      />

                      <Input
                        type="text"
                        placeholder="0"
                        className="border"
                        label="Latitude"
                        defaultValue={item.latitude}
                        disabled
                      />
                    </div>
                  </div>
                );
              })}
              {errors?.locationDetails?.message ? (
                <span className="text-red-500 text-sm mt-1 transition-all">
                  {errors?.locationDetails?.message}
                </span>
              ) : null}
            </div>
          </section>

          <Button>Submit</Button>
        </form>
      </section>
    </div>
  );
}
