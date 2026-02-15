import styled from "styled-components";
import { Switch } from "antd";
import {
  BellOutlined,
  SoundOutlined,
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

const StyledSwitch = styled(Switch)`
  &&.ant-switch-checked {
    background: var(--wa-green);
  }
`;

export default function SettingsNotifications() {
  return (
    <Container>
      <SectionHeader>Message notifications</SectionHeader>

      <Row>
        <RowIcon><BellOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Message notifications</RowLabel>
          <RowDesc>Show notifications for incoming messages</RowDesc>
        </RowContent>
        <StyledSwitch defaultChecked />
      </Row>

      <Row>
        <RowContent>
          <RowLabel>Show Preview</RowLabel>
          <RowDesc>Show message text in notifications</RowDesc>
        </RowContent>
        <StyledSwitch defaultChecked />
      </Row>

      <Row>
        <RowIcon><SoundOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Sound</RowLabel>
        </RowContent>
        <RowValue>Default</RowValue>
        <RowArrow><RightOutlined /></RowArrow>
      </Row>

      <Divider />
      <SectionHeader>Group notifications</SectionHeader>

      <Row>
        <RowIcon><BellOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Group notifications</RowLabel>
          <RowDesc>Show notifications for group messages</RowDesc>
        </RowContent>
        <StyledSwitch defaultChecked />
      </Row>

      <Row>
        <RowContent>
          <RowLabel>Show Preview</RowLabel>
          <RowDesc>Show message text in group notifications</RowDesc>
        </RowContent>
        <StyledSwitch defaultChecked />
      </Row>

      <Row>
        <RowIcon><SoundOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Sound</RowLabel>
        </RowContent>
        <RowValue>Default</RowValue>
        <RowArrow><RightOutlined /></RowArrow>
      </Row>
    </Container>
  );
}
