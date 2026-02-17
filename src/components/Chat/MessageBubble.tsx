import styled from "styled-components";
import { EnterOutlined, StopOutlined } from "@ant-design/icons";
import type { MessageType } from "../../data/mockData";

const Wrapper = styled.div<{ $sent: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${(p) => (p.$sent ? "flex-end" : "flex-start")};
  padding: 0 20px;
  position: relative;
  gap: 6px;

  &:hover .msg-actions {
    opacity: 1;
  }
`;

const Bubble = styled.div<{ $sent: boolean }>`
  max-width: 65%;
  padding: 6px 8px 6px 10px;
  border-radius: 8px;
  background: ${(p) => (p.$sent ? "var(--bg-bubble-sent)" : "var(--bg-bubble-received)")};
  box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.08);
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 6px;
`;

const Text = styled.span`
  font-size: var(--font-size-md);
  color: var(--text-primary);
  line-height: 1.35;
  word-break: break-word;
`;

const DeletedText = styled.span`
  font-size: var(--font-size-md);
  color: var(--text-muted);
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DeletedIcon = styled.span`
  font-size: 14px;
  display: inline-flex;
`;

const Meta = styled.span<{ $sent: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
  font-size: 11px;
  color: var(--text-muted);
  margin-left: 4px;
  white-space: nowrap;
`;

const Ticks = styled.span<{ $read: boolean }>`
  font-size: 14px;
  color: ${(p) => (p.$read ? "var(--wa-teal)" : "var(--text-muted)")};
`;

const Actions = styled.div.attrs({ className: "msg-actions" })`
  opacity: 0;
  margin-top: 4px;
  transition: opacity var(--transition-fast);
`;

const ReplyButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  border-radius: var(--radius-full);
  background: var(--bg-bubble-received);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    color: var(--text-primary);
  }
`;

/* System message — centered, no bubble */
const SystemWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 6px 60px;
`;

const SystemBubble = styled.div`
  background: var(--bg-bubble-received);
  color: var(--text-secondary);
  font-size: var(--font-size-xs);
  padding: 6px 14px;
  border-radius: 8px;
  box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.08);
  text-align: center;
  max-width: 80%;
`;

interface Props {
  id: string;
  text: string;
  timestamp: string;
  sent: boolean;
  read?: boolean;
  contactName: string;
  type?: MessageType;
  onReply: (id: string) => void;
}

export default function MessageBubble({
  id,
  text,
  timestamp,
  sent,
  read = false,
  type,
  onReply,
}: Props) {
  // System messages render as centered labels
  if (type === "system") {
    return (
      <SystemWrapper>
        <SystemBubble>🔒 {text}</SystemBubble>
      </SystemWrapper>
    );
  }

  return (
    <Wrapper $sent={sent}>
      <Bubble $sent={sent}>
        {type === "deleted" ? (
          <DeletedText>
            <DeletedIcon><StopOutlined /></DeletedIcon>
            This message was deleted
          </DeletedText>
        ) : (
          <Text>{text}</Text>
        )}
        <Meta $sent={sent}>
          {timestamp}
          {sent && <Ticks $read={read}>✓✓</Ticks>}
        </Meta>
      </Bubble>
      {type !== "deleted" && (
        <Actions>
          <ReplyButton onClick={() => onReply(id)} title="Reply">
            <EnterOutlined />
          </ReplyButton>
        </Actions>
      )}
    </Wrapper>
  );
}
