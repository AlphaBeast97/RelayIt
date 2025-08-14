"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
  participants?: Array<{
    user_id: string;
    user?: {
      image?: string;
      name?: string;
    };
    role?: string;
    created_at?: string;
    callId?: string;
  }>;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
  participants = [],
}: MeetingCardProps) => {
  // Sort participants by creation date only
  const sortedParticipants = [...participants].sort((a, b) => {
    if (a.created_at && b.created_at) {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    return 0;
  });

  // Get unique participants (prefer admin roles and newer entries)
  const uniqueParticipants = Array.from(
    new Map(sortedParticipants.map((p) => [p.user_id, p])).values()
  ).slice(0, 5);

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className="flex w-full flex-col space-y-4">
        <div className="relative flex w-full max-sm:hidden">
          {uniqueParticipants.map(
            (participant, index) =>
              participant?.user?.image && (
                <div key={participant.user_id} className="relative">
                  <Image
                    src={participant.user.image}
                    alt={participant.user?.name || "Participant"}
                    width={40}
                    height={40}
                    className={cn("rounded-full border-2 border-white", {
                      absolute: index > 0,
                    })}
                    style={{ top: 0, left: index * 28, zIndex: 5 - index }}
                  />
                </div>
              )
          )}
          {participants.length > 5 && (
            <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
              +{participants.length - 5}
            </div>
          )}
        </div>
        {!isPreviousMeeting && (
          <div className="flex items-center justify-end gap-2">
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Link Copied");
              }}
              className="bg-dark-4 px-6 text-white"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
