"use client";

import { useEffect } from "react";

export default function N8nChat() {
  useEffect(() => {
    import("@n8n/chat").then(({ createChat }) => {
      createChat({
        webhookUrl: "/api/chat",
        mode: "window",
        showWelcomeScreen: false,
        loadPreviousSession: false,
        initialMessages: [
          "Hey there! ☕ Welcome to Brew & Co.",
          "Ask me anything — our menu, opening hours, events, or how to book a table.",
        ],
        i18n: {
          en: {
            title: "Brew & Co",
            subtitle: "We're here to help.",
            footer: "",
            getStarted: "Start Chatting",
            inputPlaceholder: "Ask us anything…",
            closeButtonTooltip: "Close chat",
          },
        },
      });
    });
  }, []);

  return null;
}
