import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { notify } from "src/lib/utils";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function SearchAddress({
  onSelect,
  existingAddresses = [],
}: {
  onSelect: (value: {
    address: string;
    longitude: number;
    latitude: number;
    place_id: string;
  }) => void;
  existingAddresses?: string[];
}) {
  const {
    ready,
    value,
    suggestions: { data, loading, status },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 1000,
  });

  if (!ready) {
    return <p className="text-sm">Loading address input. Please wait...</p>;
  }

  return (
    <div>
      <Combobox
        value={value}
        onChange={(value) => {
          const address = data.find((item) => item.place_id === value);
          if (address) {
            const existing = existingAddresses.includes(address.place_id);
            if (existing) {
              notify({
                message: "Address already exists",
                type: "error",
              });
              return;
            }

            setValue(address.description);

            getGeocode({ address: address.description }).then((results) => {
              const { lat, lng } = getLatLng(results[0]);
              onSelect({
                address: address.description,
                longitude: lng,
                latitude: lat,
                place_id: address.place_id,
              });
              setValue("");
            });
          }
        }}
        onClose={() => clearSuggestions()}
      >
        <div className="relative">
          <ComboboxInput
            aria-label="Assignee"
            autoComplete="off"
            className="w-full rounded-lg p-2.5 placeholder:text-base outline-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed border border-grey-90 shadow"
            displayValue={(val: google.maps.places.AutocompletePrediction) =>
              val?.description ?? ""
            }
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            placeholder="Enter Address"
          />
        </div>

        <ComboboxOptions
          anchor="bottom start"
          className="w-[var(--input-width)] border empty:invisible bg-white"
        >
          {loading ? (
            <span className="text-center text-sm block py-2">Loading...</span>
          ) : status === "OK" && data?.length ? (
            data.map((item) => (
              <ComboboxOption
                key={item.place_id}
                value={item.place_id}
                className="data-[focus]:bg-blue-100"
              >
                {item.description}
              </ComboboxOption>
            ))
          ) : (
            <span className="text-center text-sm block py-2">
              No Address Found.
            </span>
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
