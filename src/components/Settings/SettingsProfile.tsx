import styled from "styled-components";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 30px;
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--wa-green), var(--wa-teal));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 64px;
`;

const CameraOverlay = styled.button`
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--wa-teal);
  border: 3px solid var(--bg-header);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: transform var(--transition-fast);

  &:hover {
    transform: scale(1.1);
  }
`;

const FieldGroup = styled.div`
  margin-bottom: 28px;
`;

const FieldLabel = styled.div`
  font-size: var(--font-size-xs);
  color: var(--wa-teal);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  font-weight: 500;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-light);
`;

const FieldValue = styled.div`
  font-size: var(--font-size-md);
  color: var(--text-primary);
`;

const EditLink = styled.button`
  font-size: var(--font-size-sm);
  color: var(--wa-teal);
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-family);

  &:hover {
    text-decoration: underline;
  }
`;

export default function SettingsProfile() {
  return (
    <Container>
      <AvatarSection>
        <AvatarWrapper>
          <Avatar>
            <UserOutlined />
          </Avatar>
          <CameraOverlay title="Change profile photo">
            <CameraOutlined />
          </CameraOverlay>
        </AvatarWrapper>
      </AvatarSection>

      <FieldGroup>
        <FieldLabel>Your Name</FieldLabel>
        <FieldRow>
          <FieldValue>Vincent Vega</FieldValue>
          <EditLink>Edit</EditLink>
        </FieldRow>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Phone Number</FieldLabel>
        <FieldRow>
          <FieldValue>+1 (555) 000-1234</FieldValue>
        </FieldRow>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>About</FieldLabel>
        <FieldRow>
          <FieldValue>Hey there! I am using WhatsApp</FieldValue>
          <EditLink>Edit</EditLink>
        </FieldRow>
      </FieldGroup>
    </Container>
  );
}
