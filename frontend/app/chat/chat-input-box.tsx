"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightCircleIcon } from "lucide-react";

import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

interface ChatInputBoxProps {
  input: string;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ChatInputBox({
  input,
  handleInputChange,
  handleSubmit,
}: ChatInputBoxProps) {
  return (
    <form className="relative w-full" onSubmit={handleSubmit}>
      <Input
        className="w-full pr-10 py-6 border-2 focus-visible:ring-offset-0 focus-visible:ring-1"
        name="prompt"
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <Button
          size="icon"
          disabled={!input.trim()}
          className="p-0"
          variant="ghost"
          type="submit"
        >
          <ArrowRightCircleIcon
            className={cn(
              "h-8 w-8 cursor-pointer",
              input.trim() ? "text-foreground/80" : "text-foreground/50"
            )}
          />
        </Button>
      </div>
    </form>
  );
}
