import { useRouter } from "next/router";
import Pagination from "../ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetPaginatedContacts } from "src/hooks/contact";

export default function ContactList() {
  const router = useRouter();
  const { data: contacts, meta_data } = useGetPaginatedContacts(
    Number(router?.query?.page ?? 1)
  );

  const handlePageChange = (pageToGo: number) => {
    router.push(`${router.pathname}?page=${pageToGo}`, undefined, {
      shallow: true,
    });
  };
  return (
    <Pagination
      metaData={{
        ...meta_data,
      }}
      handlePageChange={handlePageChange}
    >
      <div>
        <h2 className="text-lg font-semibold mb-4">Contact List</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead>Latitude</TableHead>
              </TableRow>
            </TableHeader>
            {contacts && contacts.length ? (
              <TableBody>
                {contacts.map(
                  (contact: {
                    name: string;
                    phoneNumber: string;
                    email: string;
                    locationDetails: {
                      address: string;
                      longitude: string;
                      latitude: string;
                    }[];
                  }) => (
                    <TableRow key={contact.name}>
                      <TableCell className="font-medium">
                        {contact.name}
                      </TableCell>
                      <TableCell>{contact.phoneNumber}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell
                        title={contact.locationDetails[0].address || ""}
                        className="whitespace-nowrap max-w-[300px] truncate"
                      >
                        {contact.locationDetails[0].address}
                      </TableCell>
                      <TableCell>
                        {contact.locationDetails[0].longitude}
                      </TableCell>
                      <TableCell>
                        {contact.locationDetails[0].latitude}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No contacts found
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </div>
      </div>
    </Pagination>
  );
}
