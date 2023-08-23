import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthProvider from "./AuthProvider";
import { getCurrentUser } from "@/lib/session";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";
import Button from "./Button";

export default async function Nav() {
  const session = await getCurrentUser();
  return (
    <nav className="navbar flexBetween">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={43} alt="logo" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((item) => (
            <Link href={item.href} key={item.key}>
              {item.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session}/>
            <Link href="/create-project">
              <Button title="Share Work" />
              </Link>
          </>
        ) : (
          <AuthProvider />
        )}
      </div>
    </nav>
  );
}
