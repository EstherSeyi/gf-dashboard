import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetContacts } from "src/hooks/contact";

export default function ContactList() {
  const { contacts } = useGetContacts();
  return (
    <Table>
      <TableCaption>A list of your recently added contacts.</TableCaption>
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
      <TableBody>
        {contacts && contacts.length ? (
          contacts.map(
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
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.locationDetails[0].address}</TableCell>
                <TableCell>{contact.locationDetails[0].longitude}</TableCell>
                <TableCell>{contact.locationDetails[0].latitude}</TableCell>
              </TableRow>
            )
          )
        ) : (
          <TableRow>
            <span>No contacts found</span>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
