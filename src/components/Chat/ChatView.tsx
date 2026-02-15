import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import type { RootState } from "../../store";
import { sendMessage, setReplyTo, clearReplyTo, toggleContactInfo } from "../../store/chatSlice";
import MessageBubble from "./MessageBubble";
import PollMessage from "./PollMessage";
import LinkPreviewMessage from "./LinkPreviewMessage";
import ImageMessage from "./ImageMessage";
import {
  SearchOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  MoreOutlined,
  SmileOutlined,
  PlusOutlined,
  AudioOutlined,
  CloseOutlined,
  FileOutlined,
  CameraOutlined,
  ContactsOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-main);
  position: relative;
`;

/* Chat background pattern */
const ChatBg = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:%23000%7D%3C/style%3E%3C/defs%3E%3Ccircle class='a' cx='20' cy='20' r='4'/%3E%3Ccircle class='a' cx='60' cy='40' r='3'/%3E%3Ccircle class='a' cx='100' cy='15' r='5'/%3E%3Ccircle class='a' cx='140' cy='50' r='3'/%3E%3Ccircle class='a' cx='180' cy='25' r='4'/%3E%3Ccircle class='a' cx='30' cy='80' r='3'/%3E%3Ccircle class='a' cx='80' cy='90' r='4'/%3E%3Ccircle class='a' cx='120' cy='75' r='3'/%3E%3Ccircle class='a' cx='160' cy='100' r='5'/%3E%3Ccircle class='a' cx='50' cy='140' r='4'/%3E%3Ccircle class='a' cx='100' cy='130' r='3'/%3E%3Ccircle class='a' cx='150' cy='150' r='4'/%3E%3Ccircle class='a' cx='20' cy='170' r='3'/%3E%3Ccircle class='a' cx='90' cy='180' r='5'/%3E%3Ccircle class='a' cx='170' cy='180' r='3'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: var(--bg-header);
  border-bottom: 1px solid var(--border-light);
  z-index: 2;
  gap: 14px;
`;

const HeaderAvatar = styled.img`
  width: var(--avatar-size-sm);
  height: var(--avatar-size-sm);
  border-radius: var(--radius-full);
  object-fit: cover;
  cursor: pointer;
`;

const HeaderInfo = styled.div`
  flex: 1;
  min-width: 0;
  cursor: pointer;
`;

const HeaderName = styled.div`
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--text-primary);
`;

const HeaderStatus = styled.div`
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: background var(--transition-fast), color var(--transition-fast);

  &:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 1;
`;

const DateDivider = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0 12px;
  z-index: 1;
`;

const DateLabel = styled.span`
  background: var(--bg-bubble-received);
  color: var(--text-secondary);
  font-size: var(--font-size-xs);
  padding: 5px 12px;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.08);
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

/* Unread divider */
const UnreadDivider = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 60px;
  gap: 12px;
  z-index: 1;
`;

const UnreadLine = styled.div`
  flex: 1;
  height: 1px;
  background: var(--wa-teal);
  opacity: 0.4;
`;

const UnreadLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--wa-teal);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  white-space: nowrap;
`;

/* Reply preview */
const ReplyPreview = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: var(--bg-header);
  border-top: 1px solid var(--border-light);
  z-index: 2;
  gap: 8px;
`;

const ReplyBar = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  background: var(--bg-input);
  border-radius: var(--radius-sm);
  overflow: hidden;
  min-height: 40px;
`;

const ReplyColorBar = styled.div`
  width: 4px;
  background: var(--wa-green);
  flex-shrink: 0;
`;

const ReplyContent = styled.div`
  padding: 6px 10px;
  flex: 1;
  min-width: 0;
`;

const ReplyName = styled.div`
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--wa-green);
  margin-bottom: 2px;
`;

const ReplyText = styled.div`
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReplyCloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--text-primary);
  }
`;

/* Input bar */
const InputBarContainer = styled.div`
  position: relative;
  z-index: 2;
`;

const InputBar = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
  background: var(--bg-header);
  border-top: 1px solid var(--border-light);
`;

const InputIconButton = styled.button`
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
  font-size: 18px;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--text-primary);
  }
`;

const TextInputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: var(--bg-input);
  border-radius: var(--radius-sm);
  padding: 0 12px;
  min-height: 42px;
`;

const TextInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: var(--font-size-md);
  color: var(--text-primary);
  font-family: var(--font-family);

  &::placeholder {
    color: var(--text-muted);
  }
`;

/* Attachment menu */
const AttachMenu = styled.div`
  position: absolute;
  bottom: 100%;
  left: 12px;
  margin-bottom: 8px;
  background: var(--bg-header);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  min-width: 200px;
  z-index: 10;
  animation: slideUp 0.15s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AttachMenuBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9;
`;

const AttachMenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 18px;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: var(--font-size-md);
  font-family: var(--font-family);
  cursor: pointer;
  transition: background var(--transition-fast);

  &:hover {
    background: var(--bg-hover);
  }
`;

const AttachMenuIcon = styled.span<{ $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
`;

export default function ChatView() {
  const dispatch = useDispatch();
  const { contacts, selectedChatId, replyToMessageId } = useSelector((s: RootState) => s.chat);
  const contact = contacts.find((c) => c.id === selectedChatId);
  const [text, setText] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [contact?.messages.length]);

  if (!contact) return null;

  const replyMessage = replyToMessageId
    ? contact.messages.find((m) => m.id === replyToMessageId)
    : null;

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || !selectedChatId) return;
    dispatch(sendMessage({ chatId: selectedChatId, text: trimmed }));
    dispatch(clearReplyTo());
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleHeaderClick = () => {
    dispatch(toggleContactInfo());
  };

  // Find the index of first unread message for the divider
  const firstUnreadIdx = contact.messages.findIndex((m) => !m.sent && m.read === false);

  return (
    <Container>
      <ChatBg />
      <Header>
        <HeaderAvatar src={contact.avatar} alt={contact.name} onClick={handleHeaderClick} />
        <HeaderInfo onClick={handleHeaderClick}>
          <HeaderName>{contact.name}</HeaderName>
          <HeaderStatus>{contact.online ? "online" : "click here for contact info"}</HeaderStatus>
        </HeaderInfo>
        <HeaderActions>
          <IconButton title="Video call"><VideoCameraOutlined /></IconButton>
          <IconButton title="Voice call"><PhoneOutlined /></IconButton>
          <IconButton title="Search"><SearchOutlined /></IconButton>
          <IconButton title="Menu"><MoreOutlined /></IconButton>
        </HeaderActions>
      </Header>
      <MessagesArea>
        <DateDivider>
          <DateLabel>Today</DateLabel>
        </DateDivider>
        {contact.messages.map((msg, idx) => {
          const showUnreadDivider = idx === firstUnreadIdx && contact.unreadCount > 0;

          return (
            <div key={msg.id}>
              {showUnreadDivider && (
                <UnreadDivider>
                  <UnreadLine />
                  <UnreadLabel>
                    {contact.unreadCount} unread message{contact.unreadCount > 1 ? "s" : ""}
                  </UnreadLabel>
                  <UnreadLine />
                </UnreadDivider>
              )}

              {/* Poll message */}
              {msg.type === "poll" && msg.poll && (
                <PollMessage poll={msg.poll} timestamp={msg.timestamp} sent={msg.sent} />
              )}

              {/* Link preview message */}
              {msg.type === "link" && msg.link && (
                <LinkPreviewMessage link={msg.link} timestamp={msg.timestamp} sent={msg.sent} />
              )}

              {/* Image message */}
              {msg.type === "image" && msg.image && (
                <ImageMessage
                  imageUrl={msg.image.url}
                  caption={msg.image.caption}
                  timestamp={msg.timestamp}
                  sent={msg.sent}
                  read={msg.read}
                />
              )}

              {/* Regular, deleted, or system message */}
              {(!msg.type || msg.type === "text" || msg.type === "deleted" || msg.type === "system") && (
                <MessageBubble
                  id={msg.id}
                  text={msg.text}
                  timestamp={msg.timestamp}
                  sent={msg.sent}
                  read={msg.read}
                  contactName={contact.name}
                  type={msg.type}
                  onReply={(id) => dispatch(setReplyTo(id))}
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </MessagesArea>
      {replyMessage && (
        <ReplyPreview>
          <ReplyBar>
            <ReplyColorBar />
            <ReplyContent>
              <ReplyName>{replyMessage.sent ? "You" : contact.name}</ReplyName>
              <ReplyText>{replyMessage.text}</ReplyText>
            </ReplyContent>
          </ReplyBar>
          <ReplyCloseButton onClick={() => dispatch(clearReplyTo())} title="Cancel reply">
            <CloseOutlined />
          </ReplyCloseButton>
        </ReplyPreview>
      )}
      <InputBarContainer>
        {showAttachMenu && (
          <>
            <AttachMenuBackdrop onClick={() => setShowAttachMenu(false)} />
            <AttachMenu>
              <AttachMenuItem onClick={() => setShowAttachMenu(false)}>
                <AttachMenuIcon $color="#5157AE"><FileOutlined /></AttachMenuIcon>
                File
              </AttachMenuItem>
              <AttachMenuItem onClick={() => setShowAttachMenu(false)}>
                <AttachMenuIcon $color="#007BFC"><CameraOutlined /></AttachMenuIcon>
                Photo and video
              </AttachMenuItem>
              <AttachMenuItem onClick={() => setShowAttachMenu(false)}>
                <AttachMenuIcon $color="#009DE2"><ContactsOutlined /></AttachMenuIcon>
                Contact
              </AttachMenuItem>
              <AttachMenuItem onClick={() => setShowAttachMenu(false)}>
                <AttachMenuIcon $color="#E8A030"><BarChartOutlined /></AttachMenuIcon>
                Poll
              </AttachMenuItem>
            </AttachMenu>
          </>
        )}
        <InputBar>
          <InputIconButton
            title="Attach"
            onClick={() => setShowAttachMenu((v) => !v)}
            style={{ color: showAttachMenu ? "var(--text-primary)" : undefined }}
          >
            {showAttachMenu ? <CloseOutlined /> : <PlusOutlined />}
          </InputIconButton>
          <TextInputWrapper>
            <TextInput
              placeholder="Type a message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </TextInputWrapper>
          <InputIconButton title="Emoji"><SmileOutlined /></InputIconButton>
          <InputIconButton title="Voice message"><AudioOutlined /></InputIconButton>
        </InputBar>
      </InputBarContainer>
    </Container>
  );
}
