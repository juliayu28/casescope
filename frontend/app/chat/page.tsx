"use client";

import { v4 as uuidv4 } from "uuid";

import { ChatInputBox } from "./chat-input-box";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Fragment, memo, useCallback, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, MessageCirclePlus } from "lucide-react";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
// import { fetchAIChats } from "@/lib/queries";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

// TODO: Separate them into different components

type Message = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
};

const Chat = memo(function Chat() {
  // Wrap Chat with memo
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const supabase = createClient();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!input.trim()) return;

      const userMessage = {
        id: uuidv4(),
        role: "user",
        content: input,
      } satisfies Message;
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");

      try {
        // const {
        //   data: { session },
        // } = await supabase.auth.getSession();

        // if (!session) throw new Error("No session found");
        const body = JSON.stringify({
          messages: [{ role: "user", content: input }],
        });

        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: [{ role: "user", content: input }],
            }),
          }
        );

        if (!response.ok || !response.body)
          throw new Error("Network response was not ok");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let assistantMessage = {
          id: uuidv4(),
          role: "assistant",
          content: "",
        } as Message;
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                // FIX: breaks on [DONE]
                const data = JSON.parse(line.slice(6));

                if (data.delta) {
                  assistantMessage.content += data.delta;
                  setMessages((prevMessages) => [
                    ...prevMessages.slice(0, -1),
                    { ...assistantMessage },
                  ]);
                }
              } catch (err) {
                console.error("Error: " + line + err);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [input, messages]
  );

  return (
    <div className="flex flex-col h-full pr-2 py-10 max-w-2xl mx-auto">
      <Button
        variant="outline"
        className="w-fit"
        onClick={() => {
          setMessages([]);
        }}
      >
        + New Chat
      </Button>

      <ScrollArea className="h-full">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  message.role === "user" ? "bg-accent" : "bg-background",
                  "max-w-full rounded-lg px-3 py-2 border"
                )}
              >
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  className={cn(
                    // message.role === "user" ? "" : "[&>p]:mb-4",
                    "text-sm break-words"
                  )}
                >
                  {message.content}
                </Markdown>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <ChatInputBox
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
});

export default Chat;

// import { Textarea } from "@/components/ui/textarea"

// export default function TextareaDemo() {
//   return <Textarea placeholder="Type your message here." />
// }
