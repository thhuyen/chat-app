import styled from "styled-components";
import type { LinkData } from "../../data/mockData";

const LinkBubble = styled.div<{ $sent: boolean }>`
  max-width: 340px;
  background: ${(p) => (p.$sent ? "var(--bg-bubble-sent)" : "var(--bg-bubble-received)")};
  border-radius: 8px;
  overflow: hidden;
  align-self: ${(p) => (p.$sent ? "flex-end" : "flex-start")};
  margin: 0 60px;
  box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.08);
  cursor: pointer;
  transition: opacity var(--transition-fast);

  &:hover {
    opacity: 0.9;
  }
`;

const PreviewImage = styled.div`
  width: 100%;
  height: 140px;
  background: linear-gradient(135deg, #1db954 0%, #191414 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PreviewImageIcon = styled.div`
  font-size: 48px;
  color: white;
  opacity: 0.9;
`;

const PreviewContent = styled.div`
  padding: 8px 12px 10px;
`;

const PreviewDomain = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  text-transform: lowercase;
  margin-bottom: 2px;
`;

const PreviewTitle = styled.div`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PreviewDescription = styled.div`
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UrlRow = styled.div`
  padding: 6px 12px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UrlText = styled.a`
  font-size: var(--font-size-xs);
  color: var(--wa-teal);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;

  &:hover {
    text-decoration: underline;
  }
`;

const Timestamp = styled.span`
  font-size: 11px;
  color: var(--text-muted);
  margin-left: 8px;
  flex-shrink: 0;
`;

interface LinkPreviewMessageProps {
  link: LinkData;
  timestamp: string;
  sent: boolean;
}

export default function LinkPreviewMessage({ link, timestamp, sent }: LinkPreviewMessageProps) {
  return (
    <LinkBubble $sent={sent}>
      <PreviewImage>
        <PreviewImageIcon>🎵</PreviewImageIcon>
      </PreviewImage>
      <PreviewContent>
        <PreviewDomain>{link.domain}</PreviewDomain>
        <PreviewTitle>{link.title}</PreviewTitle>
        <PreviewDescription>{link.description}</PreviewDescription>
      </PreviewContent>
      <UrlRow>
        <UrlText href={link.url} target="_blank" rel="noopener noreferrer">
          {link.url}
        </UrlText>
        <Timestamp>{timestamp}</Timestamp>
      </UrlRow>
    </LinkBubble>
  );
}
