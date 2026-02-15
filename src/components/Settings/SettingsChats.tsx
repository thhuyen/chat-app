import styled from "styled-components";
import {
  PictureOutlined,
  FontSizeOutlined,
  InboxOutlined,
  DeleteOutlined,
  ClearOutlined,
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

const RowValue = styled.span`
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
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

const DangerRow = styled(Row)`
  color: #e74c3c;
`;

const DangerIcon = styled(RowIcon)`
  color: #e74c3c;
`;

const DangerLabel = styled(RowLabel)`
  color: #e74c3c;
`;

export default function SettingsChats() {
  return (
    <Container>
      <SectionHeader>Display</SectionHeader>

      <Row>
        <RowIcon><PictureOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Chat Wallpaper</RowLabel>
          <RowDesc>Set a background for your chat view</RowDesc>
        </RowContent>
        <RowArrow><RightOutlined /></RowArrow>
      </Row>

      <Row>
        <RowIcon><FontSizeOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Font Size</RowLabel>
        </RowContent>
        <RowValue>Medium</RowValue>
        <RowArrow><RightOutlined /></RowArrow>
      </Row>

      <Divider />
      <SectionHeader>Keyboard</SectionHeader>

      <Row>
        <RowContent>
          <RowLabel>Enter is Send</RowLabel>
          <RowDesc>Use the Enter key to send messages</RowDesc>
        </RowContent>
        <Toggle $on />
      </Row>

      <Divider />
      <SectionHeader>Chat actions</SectionHeader>

      <Row>
        <RowIcon><InboxOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Archive All Chats</RowLabel>
        </RowContent>
      </Row>

      <DangerRow>
        <DangerIcon><ClearOutlined /></DangerIcon>
        <RowContent>
          <DangerLabel>Clear All Chats</DangerLabel>
        </RowContent>
      </DangerRow>

      <DangerRow>
        <DangerIcon><DeleteOutlined /></DangerIcon>
        <RowContent>
          <DangerLabel>Delete All Chats</DangerLabel>
        </RowContent>
      </DangerRow>
    </Container>
  );
}
