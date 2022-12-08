import Link from "next/link";
import { useRouter } from "next/router";

interface NavlinkOptions {
  title: string;
  path: string;
  active?: string;
}

export const Navlink = ({ title, path, active = "blue" }: NavlinkOptions) => {
  const router = useRouter();
  return (
    <Link
      href={path}
      className={router.pathname == path ? `text-blue-200` : ""}
    >
      {title}
    </Link>
  );
};
