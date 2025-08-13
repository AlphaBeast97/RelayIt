import StreamVidProvider from "@/providers/StreamClientProvider";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVidProvider>{children}</StreamVidProvider>
    </main>
  );
};

export default RootLayout;
