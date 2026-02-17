import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { contacts, type Contact, type Message } from "../data/mockData";

export type SidebarTab = "chats" | "calls" | "status" | "archived" | "starred" | "settings";

export type SettingsPage = "profile" | "account" | "privacy" | "chats" | "notifications" | "storage" | null;

interface ChatState {
  activeTab: SidebarTab;
  selectedChatId: string | null;
  searchQuery: string;
  contacts: Contact[];
  theme: "light" | "dark";
  replyToMessageId: string | null;
  showContactInfo: boolean;
  settingsPage: SettingsPage;
}

const initialState: ChatState = {
  activeTab: "chats",
  selectedChatId: null,
  searchQuery: "",
  contacts,
  theme: "light",
  replyToMessageId: null,
  showContactInfo: false,
  settingsPage: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<SidebarTab>) {
      state.activeTab = action.payload;
      if (action.payload !== "settings") {
        state.settingsPage = null;
      }
    },
    selectChat(state, action: PayloadAction<string>) {
      state.selectedChatId = action.payload;
      state.showContactInfo = false;
      // Mark messages as read when selecting a chat
      const contact = state.contacts.find((c) => c.id === action.payload);
      if (contact) {
        contact.unreadCount = 0;
        contact.hasMention = false;
        contact.messages.forEach((m) => {
          m.read = true;
        });
      }
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    sendMessage(state, action: PayloadAction<{ chatId: string; text: string }>) {
      const contact = state.contacts.find((c) => c.id === action.payload.chatId);
      if (contact) {
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;
        const newMessage: Message = {
          id: `${action.payload.chatId}-${Date.now()}`,
          text: action.payload.text,
          timestamp: timeStr,
          sent: true,
          read: false,
        };
        contact.messages.push(newMessage);
        contact.lastMessage = action.payload.text;
        contact.lastMessageTime = timeStr;
        contact.lastMessageSent = true;
        contact.lastMessageRead = false;
        contact.isDeleted = false;
      }
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setReplyTo(state, action: PayloadAction<string | null>) {
      state.replyToMessageId = action.payload;
    },
    clearReplyTo(state) {
      state.replyToMessageId = null;
    },
    toggleContactInfo(state) {
      state.showContactInfo = !state.showContactInfo;
    },
    setSettingsPage(state, action: PayloadAction<SettingsPage>) {
      state.settingsPage = action.payload;
      if (action.payload) {
        state.activeTab = "settings";
      }
    },
  },
});

export const {
  setActiveTab,
  selectChat,
  setSearchQuery,
  sendMessage,
  toggleTheme,
  setReplyTo,
  clearReplyTo,
  toggleContactInfo,
  setSettingsPage,
} = chatSlice.actions;
export default chatSlice.reducer;
