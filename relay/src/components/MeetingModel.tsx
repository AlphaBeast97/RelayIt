"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";

interface MeetingModelProps {
  isOpen: boolean;
  onclose: () => void;
  children?: React.ReactNode;
  title: string;
  className?: string;
  buttonText?: string;
  handleClick: () => void;
  image?: string;
  buttonIcon?: string;
}

const MeetingModel = ({
  isOpen,
  onclose,
  children,
  title,
  className,
  buttonText,
  handleClick,
  image,
  buttonIcon,
}: MeetingModelProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onclose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 py-9 px-6 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image
                src={image}
                alt="image"
                width={72}
                height={72}
                className="h-12 w-12"
              />
            </div>
          )}

          <h1 className={`text-3xl font-bold leading-[42px] ${className}`}>
            {title}
          </h1>
          {children}
          <Button
            className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="Button icon"
                width={13}
                height={13}
                className="mr-2"
              />
            )}{" "}
            &nbsp;
            {buttonText || "schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModel;
