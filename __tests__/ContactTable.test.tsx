import { beforeAll, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactList from "../src/components/contact/list";
import contacts from "./data/contacts.json";

beforeAll(() => {
  beforeAll(() => {
    vi.mock("src/hooks/contact", () => ({
      useGetPaginatedContacts: vi.fn(() => {
        return {
          data: contacts,
          meta_data: {
            current_page: 1,
            total_pages: 1,
            total_count: 2,
            count: 2,
          },
        };
      }),
    }));
  });
});

test("ContactList", () => {
  render(<ContactList />);

  const tableRow = screen.getAllByRole("row");
  const tableColHeader = screen.getAllByRole("columnheader");
  const pagNextBtn = screen.getByTestId("pagination-next-button");
  expect(tableRow.length).toBe(3);
  expect(tableColHeader.length).toBe(6);
  expect(tableColHeader[0]).toHaveTextContent("Name");
  expect(tableColHeader[5]).toHaveTextContent("Latitude");
  expect(pagNextBtn).toBeDisabled();

  expect(1).toBe(1);
});
