import styled from "styled-components";
import {
  DatabaseOutlined,
  WifiOutlined,
  PictureOutlined,
  SoundOutlined,
  VideoCameraOutlined,
  FileOutlined,
  RightOutlined,
} from "@ant-design/icons";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 30px 0;
`;

const SectionHeader = styled.div`
  padding: 10px 30px;
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-top: 8px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 30px;
  gap: 16px;
  cursor: pointer;
  transition: background var(--transition-fast);

  &:hover {
    background: var(--bg-hover);
  }
`;

const RowIcon = styled.span`
  font-size: 18px;
  color: var(--text-secondary);
  width: 24px;
  display: flex;
  justify-content: center;
`;

const RowContent = styled.div`
  flex: 1;
`;

const RowLabel = styled.div`
  font-size: var(--font-size-md);
  color: var(--text-primary);
`;

const RowDesc = styled.div`
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin-top: 2px;
`;

const RowArrow = styled.span`
  font-size: 12px;
  color: var(--text-muted);
`;

const Divider = styled.div`
  height: 1px;
  margin: 8px 30px;
  background: var(--border-light);
`;

/* Storage bar */
const StorageBarContainer = styled.div`
  margin: 12px 30px 6px;
`;

const StorageBarBg = styled.div`
  width: 100%;
  height: 24px;
  background: var(--bg-hover);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
`;

const StorageBarSegment = styled.div<{ $width: number; $color: string }>`
  width: ${(p) => p.$width}%;
  height: 100%;
  background: ${(p) => p.$color};
  transition: width 0.3s ease;
`;

const StorageLabels = styled.div`
  display: flex;
  gap: 16px;
  margin: 10px 30px 0;
  flex-wrap: wrap;
`;

const StorageLabelItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
`;

const StorageDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => p.$color};
`;

const StorageTotal = styled.div`
  padding: 6px 30px 16px;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: 500;
`;

const Toggle = styled.button<{ $on?: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: none;
  background: ${(p) => (p.$on ? "var(--wa-green)" : "var(--text-muted)")};
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
  flex-shrink: 0;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${(p) => (p.$on ? "22px" : "2px")};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    transition: left 0.2s ease;
  }
`;

export default function SettingsStorage() {
  return (
    <Container>
      <SectionHeader>Storage</SectionHeader>

      <Row>
        <RowIcon><DatabaseOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Manage Storage</RowLabel>
          <RowDesc>1.2 GB used</RowDesc>
        </RowContent>
        <RowArrow><RightOutlined /></RowArrow>
      </Row>

      <StorageBarContainer>
        <StorageBarBg>
          <StorageBarSegment $width={35} $color="#25D366" />
          <StorageBarSegment $width={25} $color="#34B7F1" />
          <StorageBarSegment $width={15} $color="#E74C3C" />
          <StorageBarSegment $width={10} $color="#FFA726" />
        </StorageBarBg>
      </StorageBarContainer>

      <StorageLabels>
        <StorageLabelItem><StorageDot $color="#25D366" /> Photos (420 MB)</StorageLabelItem>
        <StorageLabelItem><StorageDot $color="#34B7F1" /> Videos (300 MB)</StorageLabelItem>
        <StorageLabelItem><StorageDot $color="#E74C3C" /> Audio (180 MB)</StorageLabelItem>
        <StorageLabelItem><StorageDot $color="#FFA726" /> Documents (120 MB)</StorageLabelItem>
      </StorageLabels>

      <StorageTotal>1.2 GB of 5 GB used</StorageTotal>

      <Divider />
      <SectionHeader>Network usage</SectionHeader>

      <Row>
        <RowIcon><WifiOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Network Usage</RowLabel>
          <RowDesc>3.4 GB sent · 5.1 GB received</RowDesc>
        </RowContent>
        <RowArrow><RightOutlined /></RowArrow>
      </Row>

      <Divider />
      <SectionHeader>Media auto-download</SectionHeader>

      <Row>
        <RowIcon><PictureOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Photos</RowLabel>
          <RowDesc>Automatically download photos</RowDesc>
        </RowContent>
        <Toggle $on />
      </Row>

      <Row>
        <RowIcon><SoundOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Audio</RowLabel>
          <RowDesc>Automatically download audio</RowDesc>
        </RowContent>
        <Toggle $on />
      </Row>

      <Row>
        <RowIcon><VideoCameraOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Video</RowLabel>
          <RowDesc>Automatically download videos</RowDesc>
        </RowContent>
        <Toggle />
      </Row>

      <Row>
        <RowIcon><FileOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Documents</RowLabel>
          <RowDesc>Automatically download documents</RowDesc>
        </RowContent>
        <Toggle $on />
      </Row>
    </Container>
  );
}
