import styled from "styled-components";
import {
  BellOutlined,
  SafetyOutlined,
  InfoCircleOutlined,
  SwapOutlined,
  LogoutOutlined,
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

const GreenRow = styled(Row)`
  color: var(--wa-teal);
`;

const GreenLabel = styled(RowLabel)`
  color: var(--wa-teal);
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

export default function SettingsAccount() {
  return (
    <Container>
      <SectionHeader>Account</SectionHeader>

      <Row>
        <RowIcon><BellOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Security Notifications</RowLabel>
          <RowDesc>Get notified when your security code changes</RowDesc>
        </RowContent>
        <RowArrow><RightOutlined /></RowArrow>
      </Row>

      <Row>
        <RowIcon><SafetyOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Two-step verification</RowLabel>
          <RowDesc>Add additional security to your account</RowDesc>
        </RowContent>
        <RowArrow><RightOutlined /></RowArrow>
      </Row>

      <Divider />

      <GreenRow>
        <RowIcon style={{ color: "var(--wa-teal)" }}><InfoCircleOutlined /></RowIcon>
        <RowContent>
          <GreenLabel>Request account info</GreenLabel>
          <RowDesc>Request a report of your account information</RowDesc>
        </RowContent>
        <RowArrow><RightOutlined /></RowArrow>
      </GreenRow>

      <Row>
        <RowIcon><SwapOutlined /></RowIcon>
        <RowContent>
          <RowLabel>Change number</RowLabel>
        </RowContent>
        <RowArrow><RightOutlined /></RowArrow>
      </Row>

      <Divider />

      <DangerRow>
        <DangerIcon><LogoutOutlined /></DangerIcon>
        <RowContent>
          <DangerLabel>Log Out</DangerLabel>
        </RowContent>
      </DangerRow>
    </Container>
  );
}
