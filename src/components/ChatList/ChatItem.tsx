import styled from "styled-components";
import type {Contact} from "../../data/mockData";
import { StarFilled, StopOutlined } from "@ant-design/icons";

const ItemContainer = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 14px;
  gap: 12px;
  cursor: pointer;
  background: ${(p) => (p.$active ? "var(--bg-active)" : "transparent")};
  transition: background var(--transition-fast);
  position: relative;

  &:hover {
    background: ${(p) => (p.$active ? "var(--bg-active)" : "var(--bg-hover)")};
  }
`;

const AvatarWrapper = styled.div<{ $online?: boolean }>`
  position: relative;
  width: var(--avatar-size);
  height: var(--avatar-size);
  min-width: var(--avatar-size);

  &::after {
    content: "";
    display: ${(p) => (p.$online ? "block" : "none")};
    position: absolute;
    bottom: 1px;
    right: 1px;
    width: 12px;
    height: 12px;
    background: var(--wa-green);
    border: 2px solid white;
    border-radius: var(--radius-full);
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: var(--radius-full);
  object-fit: cover;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 10px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;
`;

const ContactName = styled.span`
  font-size: var(--font-size-md);
  font-weight: 400;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Timestamp = styled.span<{ $unread?: boolean }>`
  font-size: var(--font-size-xs);
  color: ${(p) => (p.$unread ? "var(--text-unread-timestamp)" : "var(--text-timestamp)")};
  white-space: nowrap;
  margin-left: 6px;
  font-weight: ${(p) => (p.$unread ? 600 : 400)};
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`;

const LastMessage = styled.span`
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 3px;
`;

const ReadReceipt = styled.span<{ $read?: boolean }>`
  color: ${(p) => (p.$read ? "#53BDEB" : "var(--text-muted)")};
  font-size: 14px;
  margin-right: 2px;
  display: inline-flex;
`;

const Indicators = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 4px;
`;

const UnreadBadge = styled.span`
  min-width: var(--badge-size);
  height: var(--badge-size);
  background: var(--badge-bg);
  color: var(--badge-text);
  font-size: 11px;
  font-weight: 700;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
`;

const MentionBadge = styled.span`
  width: 20px;
  height: 20px;
  background: var(--badge-bg);
  color: var(--badge-text);
  font-size: 11px;
  font-weight: 700;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PinIcon = styled.span`
  color: var(--text-muted);
  font-size: 12px;
`;

const DeletedIcon = styled.span`
  color: var(--text-muted);
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  margin-right: 2px;
`;

interface ChatItemProps {
  contact: Contact;
  active: boolean;
  onClick: () => void;
}

export default function ChatItem({ contact, active, onClick }: ChatItemProps) {
  const hasUnread = contact.unreadCount > 0;

  return (
    <ItemContainer $active={active} onClick={onClick}>
      <AvatarWrapper $online={contact.online}>
        <Avatar src={contact.avatar} alt={contact.name} />
      </AvatarWrapper>
      <Content>
        <TopRow>
          <ContactName>{contact.name}</ContactName>
          <Timestamp $unread={hasUnread}>{contact.lastMessageTime}</Timestamp>
        </TopRow>
        <BottomRow>
          <LastMessage>
            {contact.lastMessageSent && !contact.isDeleted && (
              <ReadReceipt $read={contact.lastMessageRead}>✓✓</ReadReceipt>
            )}
            {contact.isDeleted && (
              <DeletedIcon><StopOutlined /></DeletedIcon>
            )}
            {contact.lastMessage}
          </LastMessage>
          <Indicators>
            {contact.hasMention && <MentionBadge>@</MentionBadge>}
            {hasUnread && <UnreadBadge>{contact.unreadCount}</UnreadBadge>}
            {contact.isPinned && <PinIcon><StarFilled /></PinIcon>}
          </Indicators>
        </BottomRow>
      </Content>
    </ItemContainer>
  );
}
