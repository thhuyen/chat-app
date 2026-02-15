import styled from "styled-components";

const BubbleRow = styled.div<{ $sent: boolean }>`
  display: flex;
  justify-content: ${(p) => (p.$sent ? "flex-end" : "flex-start")};
  padding: 1px 60px 1px 60px;
  animation: fadeInUp 0.2s ease;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Bubble = styled.div<{ $sent: boolean }>`
  position: relative;
  max-width: 65%;
  min-width: 80px;
  padding: 6px 8px 8px;
  border-radius: 8px;
  background: ${(p) => (p.$sent ? "var(--bg-bubble-sent)" : "var(--bg-bubble-received)")};
  box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.08);
  word-wrap: break-word;

  /* Tail */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    ${(p) => (p.$sent ? "right: -8px" : "left: -8px")};
    width: 8px;
    height: 13px;
    background: ${(p) => (p.$sent ? "var(--bg-bubble-sent)" : "var(--bg-bubble-received)")};
    clip-path: ${(p) =>
      p.$sent
        ? "polygon(0 0, 100% 0, 0 100%)"
        : "polygon(100% 0, 0 0, 100% 100%)"};
  }
`;

const Text = styled.span`
  font-size: var(--font-size-base);
  color: var(--text-primary);
  line-height: 1.35;
`;

const Meta = styled.span`
  float: right;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin: 6px 0 -4px 8px;
`;

const Time = styled.span`
  font-size: var(--font-size-xs);
  color: var(--text-muted);
`;

const ReadReceipt = styled.span<{ $read?: boolean }>`
  font-size: 14px;
  color: ${(p) => (p.$read ? "#53BDEB" : "var(--text-muted)")};
  line-height: 1;
`;

interface MessageBubbleProps {
  text: string;
  timestamp: string;
  sent: boolean;
  read?: boolean;
}

export default function MessageBubble({ text, timestamp, sent, read }: MessageBubbleProps) {
  return (
    <BubbleRow $sent={sent}>
      <Bubble $sent={sent}>
        <Text>{text}</Text>
        <Meta>
          <Time>{timestamp}</Time>
          {sent && <ReadReceipt $read={read}>✓✓</ReadReceipt>}
        </Meta>
      </Bubble>
    </BubbleRow>
  );
}
