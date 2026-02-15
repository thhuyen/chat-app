import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import type { RootState } from "../../store";
import { sendMessage, setReplyTo, clearReplyTo } from "../../store/chatSlice";
import MessageBubble from "./MessageBubble";
import {
  SearchOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  MoreOutlined,
  SmileOutlined,
  PlusOutlined,
  AudioOutlined,
  CloseOutlined,
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

const Messages = styled.div`
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

const InputBar = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
  background: var(--bg-header);
  border-top: 1px solid var(--border-light);
  z-index: 2;
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

export default function ChatView() {
  const dispatch = useDispatch();
  const { contacts, selectedChatId, replyToMessageId } = useSelector((s: RootState) => s.chat);
  const contact = contacts.find((c) => c.id === selectedChatId);
  const [text, setText] = useState("");
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

  return (
    <Container>
      <ChatBg />
      <Header>
        <HeaderAvatar src={contact.avatar} alt={contact.name} />
        <HeaderInfo>
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
      <Messages>
        <DateDivider>
          <DateLabel>Today</DateLabel>
        </DateDivider>
        {contact.messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            id={msg.id}
            text={msg.text}
            timestamp={msg.timestamp}
            sent={msg.sent}
            read={msg.read}
            contactName={contact.name}
            onReply={(id) => dispatch(setReplyTo(id))}
          />
        ))}
        <div ref={messagesEndRef} />
      </Messages>
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
      <InputBar>
        <InputIconButton title="Attach"><PlusOutlined /></InputIconButton>
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
    </Container>
  );
}
