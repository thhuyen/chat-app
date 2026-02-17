import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import type { RootState } from "../../store";
import { setSettingsPage, setActiveTab, type SettingsPage } from "../../store/chatSlice";
import {
  UserOutlined,
  SafetyOutlined,
  LockOutlined,
  MessageOutlined,
  BellOutlined,
  DatabaseOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import SettingsProfile from "./SettingsProfile";
import SettingsAccount from "./SettingsAccount";
import SettingsPrivacy from "./SettingsPrivacy";
import SettingsChats from "./SettingsChats";
import SettingsNotifications from "./SettingsNotifications";
import SettingsStorage from "./SettingsStorage";

const Container = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
`;

const NavPanel = styled.div`
  width: 300px;
  min-width: 300px;
  background: var(--bg-chat-list);
  border-right: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const NavHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  gap: 16px;
  border-bottom: 1px solid var(--border-light);
`;

const BackButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background var(--transition-fast);

  &:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
  }
`;

const NavTitle = styled.div`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
`;

const NavProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  gap: 14px;
  cursor: pointer;
  transition: background var(--transition-fast);
  border-bottom: 1px solid var(--border-light);

  &:hover {
    background: var(--bg-hover);
  }
`;

const NavProfileAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--wa-green), var(--wa-teal));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  font-weight: 600;
`;

const NavProfileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const NavProfileName = styled.div`
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--text-primary);
`;

const NavProfileStatus = styled.div`
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
`;

const NavList = styled.div`
  padding: 6px 0;
`;

const NavItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 20px;
  border: none;
  background: ${(p) => (p.$active ? "var(--bg-hover)" : "transparent")};
  color: ${(p) => (p.$active ? "var(--wa-teal)" : "var(--text-primary)")};
  font-size: var(--font-size-md);
  font-family: var(--font-family);
  cursor: pointer;
  transition: background var(--transition-fast);
  text-align: left;

  &:hover {
    background: var(--bg-hover);
  }
`;

const NavItemIcon = styled.span<{ $active?: boolean }>`
  font-size: 18px;
  width: 24px;
  display: flex;
  justify-content: center;
  color: ${(p) => (p.$active ? "var(--wa-teal)" : "var(--text-secondary)")};
`;

const DetailPanel = styled.div`
  flex: 1;
  background: var(--bg-main);
  overflow-y: auto;
`;

interface NavItemData {
  id: SettingsPage;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItemData[] = [
  { id: "account", label: "Account", icon: <SafetyOutlined /> },
  { id: "privacy", label: "Privacy", icon: <LockOutlined /> },
  { id: "chats", label: "Chats", icon: <MessageOutlined /> },
  { id: "notifications", label: "Notifications", icon: <BellOutlined /> },
  { id: "storage", label: "Storage and Data", icon: <DatabaseOutlined /> },
];

export default function SettingsLayout() {
  const dispatch = useDispatch();
  const settingsPage = useSelector((s: RootState) => s.chat.settingsPage);

  const handleBack = () => {
    dispatch(setActiveTab("chats"));
    dispatch(setSettingsPage(null));
  };

  const renderDetail = () => {
    switch (settingsPage) {
      case "profile":
        return <SettingsProfile />;
      case "account":
        return <SettingsAccount />;
      case "privacy":
        return <SettingsPrivacy />;
      case "chats":
        return <SettingsChats />;
      case "notifications":
        return <SettingsNotifications />;
      case "storage":
        return <SettingsStorage />;
      default:
        return <SettingsProfile />;
    }
  };

  return (
    <Container>
      <NavPanel>
        <NavHeader>
          <BackButton onClick={handleBack} title="Back to chats">
            <ArrowLeftOutlined />
          </BackButton>
          <NavTitle>Settings</NavTitle>
        </NavHeader>

        <NavProfileSection onClick={() => dispatch(setSettingsPage("profile"))}>
          <NavProfileAvatar>
            <UserOutlined />
          </NavProfileAvatar>
          <NavProfileInfo>
            <NavProfileName>Vincent Vega</NavProfileName>
            <NavProfileStatus>Hey there! I am using WhatsApp</NavProfileStatus>
          </NavProfileInfo>
        </NavProfileSection>

        <NavList>
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              $active={settingsPage === item.id}
              onClick={() => dispatch(setSettingsPage(item.id))}
            >
              <NavItemIcon $active={settingsPage === item.id}>{item.icon}</NavItemIcon>
              {item.label}
            </NavItem>
          ))}
        </NavList>
      </NavPanel>
      <DetailPanel>{renderDetail()}</DetailPanel>
    </Container>
  );
}
