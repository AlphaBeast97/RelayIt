"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecretKey = process.env.STREAM_SECRET_KEY;

export const TokenProvider = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User not Authenticated");
  if (!apiKey || !apiSecretKey) {
    throw new Error("Stream API key or secret key is not defined");
  }

  const client = new StreamClient(apiKey, apiSecretKey);
  const token = client.generateUserToken({ user_id: user.id });
  return token;
};
