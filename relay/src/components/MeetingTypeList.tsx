"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callsDetails, setCallsDetails] = useState<Call>();
  const router = useRouter();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast.error("Invalid meeting time", {
          id: "invalid-time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Call creation failed");

      const startsAt =
        values.dateTime.toISOString() || new Date().toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          members: [{ user_id: user.id, role: "admin" }],
          custom: {
            description,
          },
        },
      });

      setCallsDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast.success("Meeting created successfully", {
        id: "created-meeting",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to create meeting", {
        id: "failed-meeting",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callsDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-1"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-pink-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Checkout your recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-purple-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-1"
      />

      {!callsDetails ? (
        <MeetingModel
          isOpen={meetingState === "isScheduleMeeting"}
          onclose={() => setMeetingState(undefined)}
          title="Schedule a Meeting"
          className="text-center"
          handleClick={() => createMeeting()}
          buttonText="Schedule Meeting"
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 p-2 focus:outline-none focus:ring-2 focus:ring-sky-1"
              placeholder="Enter meeting description"
              value={values.description}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Select Date and Time
            </label>
            <DatePicker
              selected={values.dateTime}
              onChange={(date) =>
                setValues((prev) => ({ ...prev, dateTime: date! }))
              }
              showTimeSelect
              dateFormat="MMMM d, YYYY h:mm aa"
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none focus:ring-2 focus:ring-sky-1"
            />
          </div>
        </MeetingModel>
      ) : (
        <MeetingModel
          isOpen={meetingState === "isScheduleMeeting"}
          onclose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(`${meetingLink}`);
            toast.success("Meeting link copied to clipboard", {
              id: "copied-meeting-link",
            });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        ></MeetingModel>
      )}
      <MeetingModel
        isOpen={meetingState === "isInstantMeeting"}
        onclose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={() => createMeeting()}
      >
        <p>Start your meeting instantly with a single click.</p>
      </MeetingModel>
      <MeetingModel
        isOpen={meetingState === "isJoiningMeeting"}
        onclose={() => setMeetingState(undefined)}
        title="Join a Meeting"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => {
          router.push(values.link);
        }}
      >
        <Input
          placeholder="Meeting Link"
          type="text"
          className="border-none bg-dark-3"
          onChange={(e) => {
            setValues({ ...values, link: e.target.value })
          }} />
        <p>Paste your meeting link here.</p>
      </MeetingModel>


    </section>
  );
};

export default MeetingTypeList;
