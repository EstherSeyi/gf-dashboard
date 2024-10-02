import { beforeAll, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

beforeAll(() => {
  vi.mock("next/router", () => ({
    useRouter: vi.fn(() => {
      return {
        route: "/",
        pathname: "/",
        query: "",
        asPath: "",
        push: vi.fn(),
        events: {
          on: vi.fn(),
          off: vi.fn(),
        },
        beforePopState: vi.fn(() => null),
        prefetch: vi.fn(() => null),
      };
    }),
  }));
});
