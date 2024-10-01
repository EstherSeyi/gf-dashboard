import Link from "next/link";

export default function Header() {
  return (
    <nav className="py-8 md:hidden">
      <ul className="flex flex-col min-[320px]:flex-row gap-4 gap-x-8 justify-center px-4 text-center min-[320px]:text-left">
        <li className="font-bold">
          <Link
            className="active:underline focus:underline transition-all hover:underline underline-offset-8"
            href="/"
          >
            Dashboard
          </Link>
        </li>
        <li className=" font-bold">
          <Link
            className="active:underline focus:underline transition-all hover:underline underline-offset-8"
            href="/add-contact"
          >
            Add Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
