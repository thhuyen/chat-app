import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import type { RootState } from "../../store";
import { setActiveTab, toggleTheme, setSettingsPage, type SidebarTab } from "../../store/chatSlice";
import {
  MessageOutlined,
  PhoneOutlined,
  FieldTimeOutlined,
  InboxOutlined,
  StarOutlined,
  SettingOutlined,
  BulbOutlined,
  BulbFilled,
} from "@ant-design/icons";
import { Tooltip, Badge as AntBadge } from "antd";

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

const StyledBadge = styled(AntBadge)`
  .ant-badge-count {
    background: var(--badge-bg);
    color: var(--badge-text);
    font-size: 10px;
    font-weight: 700;
    min-width: 18px;
    height: 18px;
    line-height: 18px;
    box-shadow: none;
  }
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
  gap: 2px;
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
  const theme = useSelector((s: RootState) => s.chat.theme);
  const dispatch = useDispatch();

  return (
    <SidebarContainer>
      <NavGroup>
        {navItems.map((item) => (
          <Tooltip key={item.id} title={item.id.charAt(0).toUpperCase() + item.id.slice(1)} placement="right">
            <NavButton
              $active={activeTab === item.id}
              onClick={() => dispatch(setActiveTab(item.id))}
            >
              <StyledBadge count={item.badge || 0} size="small" offset={[2, -2]}>
                {item.icon}
              </StyledBadge>
              {item.hasMissedCall && !item.badge ? <MissedCallDot /> : null}
            </NavButton>
          </Tooltip>
        ))}
      </NavGroup>
      <BottomNav>
        <Tooltip title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} placement="right">
          <NavButton onClick={() => dispatch(toggleTheme())}>
            {theme === "light" ? <BulbOutlined /> : <BulbFilled />}
          </NavButton>
        </Tooltip>
        <Tooltip title="Settings" placement="right">
          <NavButton onClick={() => dispatch(setSettingsPage("profile"))}>
            <SettingOutlined />
          </NavButton>
        </Tooltip>
      </BottomNav>
    </SidebarContainer>
  );
}

