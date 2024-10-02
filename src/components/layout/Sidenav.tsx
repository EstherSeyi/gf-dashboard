import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "src/lib/utils";

export default function SideNav() {
  const router = useRouter();

  return (
    <aside className="sticky self-start h-screen overflow-auto flex-col top-0 hidden md:flex shrink-0 flex-grow max-w-[240px] border-r-[1.5px] border-grey-90 transition-all bg-grey-98">
      <nav className="py-8">
        <ul className="flex flex-col gap-4 gap-x-8 justify-center text-center min-[320px]:text-left">
          <li>
            <Link
              className={cn(
                "font-bold px-4 py-2 cursor-pointer hover:bg-slate-100 block",
                {
                  "bg-slate-100": router.pathname === "/",
                }
              )}
              href="/"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className={cn(
                "font-bold px-4 cursor-pointer py-2 hover:bg-slate-100 block",
                {
                  "bg-slate-100": router.pathname === "/add-contact",
                }
              )}
              href="/add-contact"
            >
              Add Contact
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
