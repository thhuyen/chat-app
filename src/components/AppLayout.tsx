import { useSelector } from "react-redux";
import styled from "styled-components";
import type { RootState } from "../store";
import Sidebar from "./Sidebar/Sidebar";
import ChatListPanel from "./ChatList/ChatListPanel";
import ChatView from "./Chat/ChatView";
import WelcomeView from "./Chat/WelcomeView";

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var(--bg-app);
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  min-width: 0;
`;

export default function AppLayout() {
  const selectedChatId = useSelector((s: RootState) => s.chat.selectedChatId);

  return (
    <LayoutContainer>
      <Sidebar />
      <ChatListPanel />
      <MainContent>
        {selectedChatId ? <ChatView /> : <WelcomeView />}
      </MainContent>
    </LayoutContainer>
  );
}
