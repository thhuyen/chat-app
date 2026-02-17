import styled from "styled-components";

const ImageBubble = styled.div<{ $sent: boolean }>`
  max-width: 330px;
  background: ${(p) => (p.$sent ? "var(--bg-bubble-sent)" : "var(--bg-bubble-received)")};
  border-radius: 8px;
  overflow: hidden;
  align-self: ${(p) => (p.$sent ? "flex-end" : "flex-start")};
  margin-left: ${(p) => (p.$sent ? "auto" : "60px")};
  margin-right: ${(p) => (p.$sent ? "60px" : "auto")};
  box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.08);
  cursor: pointer;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.35));
  border-radius: 0 0 0 8px;
`;

const Timestamp = styled.span`
  font-size: 11px;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const Ticks = styled.span<{ $read: boolean }>`
  font-size: 14px;
  color: ${(p) => (p.$read ? "#53BDEB" : "rgba(255,255,255,0.8)")};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const Caption = styled.div`
  padding: 6px 10px 8px;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  line-height: 1.35;
`;

const CaptionMeta = styled.span`
  float: right;
  font-size: 11px;
  color: var(--text-muted);
  margin-left: 8px;
`;

const CaptionTicks = styled.span<{ $read: boolean }>`
  font-size: 14px;
  color: ${(p) => (p.$read ? "var(--wa-teal)" : "var(--text-muted)")};
  margin-left: 3px;
`;

interface ImageMessageProps {
  imageUrl: string;
  caption?: string;
  timestamp: string;
  sent: boolean;
  read?: boolean;
}

export default function ImageMessage({ imageUrl, caption, timestamp, sent, read = false }: ImageMessageProps) {
  return (
    <ImageBubble $sent={sent}>
      <ImageContainer>
        <img src={imageUrl} alt={caption || "Photo"} />
        {!caption && (
          <ImageOverlay>
            <Timestamp>{timestamp}</Timestamp>
            {sent && <Ticks $read={read}>✓✓</Ticks>}
          </ImageOverlay>
        )}
      </ImageContainer>
      {caption && (
        <Caption>
          {caption}
          <CaptionMeta>
            {timestamp}
            {sent && <CaptionTicks $read={read}>✓✓</CaptionTicks>}
          </CaptionMeta>
        </Caption>
      )}
    </ImageBubble>
  );
}
