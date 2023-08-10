import Link from "next/link";

import getCategories from "@/actions/getCategories";
import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/components/ui/Container";
import MainNav from "./MainNav";
import NavbarActions from "./NavbarActions";

const Navbar = async () => {
  const categories = await getCategories();
  const user = await getCurrentUser();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions user={user} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
