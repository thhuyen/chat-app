import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import type { RootState } from "../../store";
import { selectChat, setSearchQuery } from "../../store/chatSlice";
import ChatItem from "./ChatItem";
import { EditOutlined, FilterOutlined, SearchOutlined, LockOutlined } from "@ant-design/icons";
import { Input } from "antd";

const PanelContainer = styled.div`
  width: var(--chat-list-width);
  min-width: var(--chat-list-width);
  height: 100%;
  background: var(--bg-chat-list);
  border-right: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px 10px;
`;

const Title = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ActionButton = styled.button`
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
  font-size: 17px;
  transition: background var(--transition-fast), color var(--transition-fast);

  &:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
  }
`;

const SearchContainer = styled.div`
  padding: 6px 14px 8px;
`;

const StyledSearch = styled(Input)`
  && {
    background: var(--bg-search);
    border: none;
    border-radius: var(--radius-sm);
    height: 36px;
    font-size: var(--font-size-sm);
    color: var(--text-primary);
    padding: 0 12px;

    &:focus, &:hover, &.ant-input-focused {
      border-color: transparent;
      box-shadow: 0 0 0 2px rgba(37, 211, 102, 0.2);
    }

    .ant-input-prefix {
      color: var(--text-muted);
      font-size: 14px;
      margin-inline-end: 10px;
    }

    input {
      background: transparent;
      color: var(--text-primary);
      font-family: var(--font-family);

      &::placeholder {
        color: var(--text-muted);
      }
    }
  }
`;

const FilterChips = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px 14px 8px;
`;

const Chip = styled.button<{ $active?: boolean }>`
  padding: 4px 14px;
  border-radius: 16px;
  border: none;
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
  background: ${(p) => (p.$active ? "var(--wa-green)" : "var(--bg-search)")};
  color: ${(p) => (p.$active ? "var(--text-white)" : "var(--text-secondary)")};
  font-weight: ${(p) => (p.$active ? 600 : 400)};

  &:hover {
    background: ${(p) => (p.$active ? "var(--wa-green)" : "var(--bg-hover)")};
  }
`;

const ChatListScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const EncryptionFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 12px 14px;
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  border-top: 1px solid var(--border-light);

  .anticon {
    font-size: 10px;
  }
`;

type FilterType = "all" | "unread" | "groups";

export default function ChatListPanel() {
  const dispatch = useDispatch();
  const { contacts, selectedChatId, searchQuery } = useSelector(
    (s: RootState) => s.chat
  );
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  let filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (activeFilter === "unread") {
    filtered = filtered.filter((c) => c.unreadCount > 0);
  }

  return (
    <PanelContainer>
      <Header>
        <Title>Chats</Title>
        <HeaderActions>
          <ActionButton title="New chat">
            <EditOutlined />
          </ActionButton>
          <ActionButton title="Filter">
            <FilterOutlined />
          </ActionButton>
        </HeaderActions>
      </Header>
      <SearchContainer>
        <StyledSearch
          prefix={<SearchOutlined />}
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          allowClear
        />
      </SearchContainer>
      <FilterChips>
        <Chip $active={activeFilter === "all"} onClick={() => setActiveFilter("all")}>All</Chip>
        <Chip $active={activeFilter === "unread"} onClick={() => setActiveFilter("unread")}>Unread</Chip>
        <Chip $active={activeFilter === "groups"} onClick={() => setActiveFilter("groups")}>Groups</Chip>
      </FilterChips>
      <ChatListScroll>
        {filtered.map((contact) => (
          <ChatItem
            key={contact.id}
            contact={contact}
            active={selectedChatId === contact.id}
            onClick={() => dispatch(selectChat(contact.id))}
          />
        ))}
      </ChatListScroll>
      <EncryptionFooter>
        <LockOutlined />
        Your personal messages are end-to-end encrypted
      </EncryptionFooter>
    </PanelContainer>
  );
}
