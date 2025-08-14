"use client";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    const loadCall = async () => {
      if (!client || !user?.id) return;

      setIsLoading(true);
      try {
        const { calls } = await client.queryCalls({
          sort: [
            {
              field: "starts_at",
              direction: -1,
            },
          ],
          filter_conditions: {
            $and: [
              { starts_at: { $exists: true } },
              {
                $or: [
                  { created_by_id: user.id },
                  { members: { $in: [user.id] } },
                ],
              },
            ],
          },
        });
        setCalls(calls);
      } catch (error) {
        console.error("Error loading calls:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCall();
  }, [client, user?.id]);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const membersData = await Promise.all(
          calls.map(async (call) => {
            // Query all members with sorting
            const response = await call.queryMembers({
              sort: [{ field: "created_at", direction: -1 }],
            });

            // Map the members to include the callId
            return {
              callId: call.id,
              members: response.members.map((member) => ({
                ...member,
                callId: call.id,
                created_at: new Date(member.created_at).getTime(),
              })),
            };
          })
        );

        // Combine all members and sort by creation date
        const allMembers = membersData
          .filter((data) => data.members.length > 0)
          .flatMap((data) => data.members)
          .sort((a, b) => b.created_at - a.created_at);

        setMembers(allMembers);
      } catch (error) {
        console.error("Error loading members:", error);
      }
    };

    if (calls.length > 0) {
      loadMembers();
    }
  }, [calls]);

  const now = new Date();

  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });
  const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    isLoading,
    members,
  };
};
