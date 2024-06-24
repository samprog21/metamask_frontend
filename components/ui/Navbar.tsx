"use client"
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

// Import icons from React Icons
import { BiHomeAlt, BiUser, BiGridAlt, BiTable, BiLogIn, BiLogOut } from 'react-icons/bi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
export function Navbar() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <NavbarDemo className="top-2" />
    </div>
  );
}

function NavbarDemo({ className }: { className?: string }) {
  const { data: session } = useSession();
  const [active, setActive] = useState<string | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const pathname = usePathname();

  const handleToggleFilter = () => {
    setToggle(!toggle);
  };

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-xl px-8 mx-auto z-50 ", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home" href="/" className={pathname === "/" ? "underline underline-offset-4" : ""}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/" >
              <BiHomeAlt className="inline-block mr-2" /> Dashboard
            </HoveredLink>
          </div>
          <div className="  text-sm grid grid-cols-1 gap-10 p-4">
            <ProductItem
              title="Home"
              href="/"
              src="/item1.png"
              description="Go to Home or Dashboard"
            />
            </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Profile" href="/profile" className={pathname === "/profile" ? "underline underline-offset-4" : ""}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/users/editProfile" >
              <BiUser className="inline-block mr-2" /> View Profile
            </HoveredLink>
          </div>
          <div className="  text-sm grid grid-cols-1 gap-10 p-4">
            <ProductItem
              title="Edit Profile"
              href="/users/editProfile"
              src="/item3.png"
              description="Make changes to Profile"
            />
            </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Dashboard" href="/dashboard" className={pathname === "/dashboard" ? "underline underline-offset-4" : ""}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/dashboard" >
              <BiGridAlt className="inline-block mr-2" /> Dashboard
            </HoveredLink>
          </div>
          <div className="  text-sm grid grid-cols-1 gap-10 p-4">
            <ProductItem
              title="Dashboard"
              href="/dashboard"
              src="/item1.png"
              description="Go to Home or Dashboard"
            />
            </div>
        </MenuItem>
        <MenuItem  setActive={setActive} active={active} item="Users" href="/dashboard/users" className={pathname === "/dashboard/users" ? "underline underline-offset-4" : ""}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/users" >
              <BiTable className="inline-block mr-2" /> View Table
            </HoveredLink>
          </div>
          <div className="  text-sm grid grid-cols-1 gap-10 p-4">
            <ProductItem
              title="Users List"
              href="/users"
              src="/item4.png"
              description="See list of Users"
            />
            </div>
        </MenuItem>

        <MenuItem  setActive={setActive} active={active} item={session?"Logout":"Login"} href={session?"/logout":"/login"} className={pathname === "/login" ? "underline underline-offset-4" : ""}>
          <div className="flex flex-col space-y-4 text-sm" onClick={session?() => signOut():() => signIn()}>
            <HoveredLink href={session?"/logout":"/login"}  >
              <BiTable className="inline-block mr-2" /> {session?"logout":"login"} 
            </HoveredLink>
          </div>
          <div className="  text-sm grid grid-cols-1 gap-10 p-4">
            <ProductItem
              title={session?"Logout":"Login"}
              href={session?"/logout":"/login"}
              src={session?"/item6.jpeg":"/item7.jpeg"}
              description={session?"Leaving ? you session is safe with us":"Verify your self and get Login"}
            />
            </div>
        </MenuItem>
        
        {/* <div className="flex flex-col space-y-4 text-sm">
          {session ? (
            <button onClick={() => signOut()} className="text-sm font-medium">
              <BiLogOut className="inline-block mr-2" /> Logout
            </button>
          ) : (
            <button onClick={() => signIn()} className="text-sm font-medium">
              <BiLogIn className="inline-block mr-2" /> Login
            </button>
          )}
        </div> */}
      </Menu>
    </div>
  );
}

export default Navbar;
