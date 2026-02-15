import { useSelector } from "react-redux";
import styled from "styled-components";
import type { RootState } from "../store";
import Sidebar from "./Sidebar/Sidebar";
import ChatListPanel from "./ChatList/ChatListPanel";
import ChatView from "./Chat/ChatView";
import WelcomeView from "./Chat/WelcomeView";

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-app);
  padding: 0;
`;

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--bg-app);
  border-radius: 10px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.2),
    0 0 0 0.5px rgba(0, 0, 0, 0.2),
    0 25px 50px rgba(0, 0, 0, 0.15);
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  min-width: 0;
`;

export default function AppLayout() {
  const selectedChatId = useSelector((s: RootState) => s.chat.selectedChatId);

  return (
    <AppWrapper>
      <LayoutContainer>
        <Sidebar />
        <ChatListPanel />
        <MainContent>
          {selectedChatId ? <ChatView /> : <WelcomeView />}
        </MainContent>
      </LayoutContainer>
    </AppWrapper>
  );
}

