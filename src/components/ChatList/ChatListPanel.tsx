import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import type {RootState} from "../../store";
import { selectChat, setSearchQuery } from "../../store/chatSlice";
import ChatItem from "./ChatItem";
import { EditOutlined, FilterOutlined, SearchOutlined } from "@ant-design/icons";

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

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-search);
  border-radius: var(--radius-sm);
  padding: 0 12px;
  height: 36px;
  transition: box-shadow var(--transition-fast);

  &:focus-within {
    box-shadow: 0 0 0 2px rgba(37, 211, 102, 0.2);
  }
`;

const SearchIcon = styled.span`
  color: var(--text-muted);
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-family: var(--font-family);

  &::placeholder {
    color: var(--text-muted);
  }
`;

const ChatListScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default function ChatListPanel() {
  const dispatch = useDispatch();
  const { contacts, selectedChatId, searchQuery } = useSelector(
    (s: RootState) => s.chat
  );

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <SearchWrapper>
          <SearchIcon>
            <SearchOutlined />
          </SearchIcon>
          <SearchInput
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </SearchWrapper>
      </SearchContainer>
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
    </PanelContainer>
  );
}
