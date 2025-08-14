"use client";
import {
  CallingState,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { UsersRoundIcon } from "lucide-react";
import Loader from "./Loader";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const { useCallCallingState } = useCallStateHooks();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  if (!isMeetingOwner) return null;
  return (
    <Button
      className="bg-red-500 text-white cursor-pointer"
      onClick={async () => {
        try {
          await call?.leave();
          await call?.endCall();
          router.push("/");
        } catch (error) {
          console.error("Error ending call:", error);
          router.push("/");
        }
      }}
    >
      <UsersRoundIcon />
      End Call For Everyone
    </Button>
  );
};

export default EndCallButton;
