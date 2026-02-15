import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import type { RootState } from "../../store";
import { setActiveTab, type SidebarTab } from "../../store/chatSlice";
import {
  MessageOutlined,
  PhoneOutlined,
  FieldTimeOutlined,
  InboxOutlined,
  StarOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const SidebarContainer = styled.aside`
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  height: 100%;
  background: var(--bg-sidebar-nav);
  border-right: 1px solid var(--border-sidebar);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  z-index: 10;
`;

const NavGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex: 1;
`;

const NavButton = styled.button<{ $active?: boolean }>`
  position: relative;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: var(--radius-md);
  background: ${(p) => (p.$active ? "var(--bg-sidebar-active)" : "transparent")};
  color: ${(p) => (p.$active ? "var(--text-primary)" : "var(--text-secondary)")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: background var(--transition-fast), color var(--transition-fast);

  &:hover {
    background: var(--bg-sidebar-hover);
    color: var(--text-primary);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  background: var(--badge-bg);
  color: var(--badge-text);
  font-size: 10px;
  font-weight: 700;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

const MissedCallDot = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background: #E74C3C;
  border-radius: var(--radius-full);
`;

const BottomNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 4px;
`;

interface NavItem {
  id: SidebarTab;
  icon: React.ReactNode;
  badge?: number;
  hasMissedCall?: boolean;
}

const navItems: NavItem[] = [
  { id: "chats", icon: <MessageOutlined />, badge: 1 },
  { id: "calls", icon: <PhoneOutlined />, hasMissedCall: true },
  { id: "status", icon: <FieldTimeOutlined /> },
  { id: "archived", icon: <InboxOutlined /> },
  { id: "starred", icon: <StarOutlined /> },
];

export default function Sidebar() {
  const activeTab = useSelector((s: RootState) => s.chat.activeTab);
  const dispatch = useDispatch();

  return (
    <SidebarContainer>
      <NavGroup>
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            $active={activeTab === item.id}
            onClick={() => dispatch(setActiveTab(item.id))}
            title={item.id.charAt(0).toUpperCase() + item.id.slice(1)}
          >
            {item.icon}
            {item.badge ? <Badge>{item.badge}</Badge> : null}
            {item.hasMissedCall && !item.badge ? <MissedCallDot /> : null}
          </NavButton>
        ))}
      </NavGroup>
      <BottomNav>
        <NavButton title="Settings">
          <SettingOutlined />
        </NavButton>
      </BottomNav>
    </SidebarContainer>
  );
}
