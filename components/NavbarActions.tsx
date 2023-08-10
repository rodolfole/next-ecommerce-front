"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { FC, useCallback, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";

import Avatar from "./Avatar";
import Button from "@/components/ui/Button";
import useAuthModal from "@/hooks/useAuthModal";
import useCart from "@/hooks/useCart";
import useUser from "@/hooks/useUser";
import MenuItem from "./MenuItem";
import { ICurrentUser } from "@/types";

interface NavbarActionsProps {
  user: ICurrentUser | null;
}

const NavbarActions: FC<NavbarActionsProps> = ({ user }) => {
  const [isMounted, setIsMounted] = useState(false);
  const onOpen = useAuthModal((state) => state.onOpen);
  const setUser = useUser((state) => state.setUser);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <HiOutlineShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.products.length}
        </span>
      </Button>
      <div
        onClick={toggleOpen}
        className="
            p-4
            md:py-1
            md:px-2
            border-[1px] 
            border-neutral-200 
            flex 
            flex-row 
            items-center 
            gap-3 
            rounded-full 
            cursor-pointer 
            hover:shadow-md 
            transition
            "
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar src={user?.image} />
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-32
            md:w-36
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
            z-10
          "
        >
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push("/favorites")}
                />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={() => onOpen("Login")} />
                <MenuItem label="Register" onClick={() => onOpen("Register")} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarActions;
