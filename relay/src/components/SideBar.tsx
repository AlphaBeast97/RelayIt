"use client";

import { SideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/dist/client/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const pathName = usePathname();
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {SideBarLinks.map((link) => {
          const isActive =
            link.route === "/"
              ? pathName === link.route
              : pathName.startsWith(link.route);
          return (
            <Link
              key={link.label}
              href={link.route}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                {
                  "bg-blue-1": isActive,
                }
              )}
            >
              <Image
                width={24}
                height={24}
                src={link.imgUrl}
                alt={link.label}
              />
              <span className="text-lg font-semibold hidden lg:inline">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SideBar;
