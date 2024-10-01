import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useGetContacts } from "src/hooks/contact";
import { ContactType } from "./add";
import { useMemo } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

export default function Map() {
  const { contacts } = useGetContacts();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
  });

  const locations = useMemo(
    () =>
      contacts?.map((contact: ContactType) => ({
        lat: contact.locationDetails[0].latitude,
        lng: contact.locationDetails[0].longitude,
      })),
    [contacts]
  );

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Contact Map</h2>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={locations[0] || center}
        zoom={10}
      >
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </div>
  );
}
