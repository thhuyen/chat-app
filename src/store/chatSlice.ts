import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { contacts, type Contact, type Message } from "../data/mockData";

export type SidebarTab = "chats" | "calls" | "status" | "archived" | "starred";

interface ChatState {
  activeTab: SidebarTab;
  selectedChatId: string | null;
  searchQuery: string;
  contacts: Contact[];
}

const initialState: ChatState = {
  activeTab: "chats",
  selectedChatId: null,
  searchQuery: "",
  contacts,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<SidebarTab>) {
      state.activeTab = action.payload;
    },
    selectChat(state, action: PayloadAction<string>) {
      state.selectedChatId = action.payload;
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
  },
});

export const { setActiveTab, selectChat, setSearchQuery, sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
