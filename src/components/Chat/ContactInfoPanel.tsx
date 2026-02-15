import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import type { RootState } from "../../store";
import { toggleContactInfo } from "../../store/chatSlice";
import {
  CloseOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  BellOutlined,
  FieldTimeOutlined,
  UserOutlined,
  StopOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  RightOutlined,
  PictureOutlined,
  LinkOutlined,
  FileOutlined,
} from "@ant-design/icons";

const Panel = styled.aside`
  width: 340px;
  min-width: 340px;
  height: 100%;
  background: var(--bg-header);
  border-left: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  animation: slideIn 0.2s ease;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  gap: 20px;
  border-bottom: 1px solid var(--border-light);
  flex-shrink: 0;
`;

const CloseBtn = styled.button`
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
  font-size: 16px;
  transition: background var(--transition-fast);

  &:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
  }
`;

const PanelTitle = styled.div`
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 20px;
  gap: 6px;
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
`;

const ContactName = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
`;

const ContactPhone = styled.div`
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const ActionBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--wa-teal);
  padding: 8px 16px;
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);

  &:hover {
    background: var(--bg-hover);
  }
`;

const ActionBtnIcon = styled.span`
  font-size: 22px;
`;

const ActionBtnLabel = styled.span`
  font-size: var(--font-size-xs);
`;

const Divider = styled.div`
  height: 8px;
  background: var(--bg-main);
  flex-shrink: 0;
`;

const Section = styled.div`
  padding: 14px 20px;
`;

const SectionLabel = styled.div`
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 8px;
`;

const AboutText = styled.div`
  font-size: var(--font-size-md);
  color: var(--text-primary);
`;

/* Media tabs */
const MediaTabs = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border-light);
`;

const MediaTab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 12px 0;
  border: none;
  background: transparent;
  color: ${(p) => (p.$active ? "var(--wa-teal)" : "var(--text-secondary)")};
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid ${(p) => (p.$active ? "var(--wa-teal)" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--wa-teal);
  }
`;

const MediaEmpty = styled.div`
  padding: 24px 20px;
  text-align: center;
  color: var(--text-muted);
  font-size: var(--font-size-sm);
`;

/* Settings rows */
const SettingRow = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  gap: 16px;
  cursor: pointer;
  transition: background var(--transition-fast);

  &:hover {
    background: var(--bg-hover);
  }
`;

const SettingIcon = styled.span`
  font-size: 18px;
  color: var(--text-secondary);
  width: 24px;
  display: flex;
  justify-content: center;
`;

const SettingLabel = styled.span`
  flex: 1;
  font-size: var(--font-size-md);
  color: var(--text-primary);
`;

const SettingValue = styled.span`
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
`;

const SettingArrow = styled.span`
  font-size: 12px;
  color: var(--text-muted);
`;

/* Destructive actions */
const DangerRow = styled(SettingRow)`
  color: #e74c3c;
`;

const DangerIcon = styled(SettingIcon)`
  color: #e74c3c;
`;

const DangerLabel = styled(SettingLabel)`
  color: #e74c3c;
`;

export default function ContactInfoPanel() {
  const dispatch = useDispatch();
  const { contacts, selectedChatId } = useSelector((s: RootState) => s.chat);
  const contact = contacts.find((c) => c.id === selectedChatId);

  if (!contact) return null;

  return (
    <Panel>
      <PanelHeader>
        <CloseBtn onClick={() => dispatch(toggleContactInfo())} title="Close">
          <CloseOutlined />
        </CloseBtn>
        <PanelTitle>Contact info</PanelTitle>
      </PanelHeader>

      <ProfileSection>
        <Avatar src={contact.avatar} alt={contact.name} />
        <ContactName>{contact.name}</ContactName>
        <ContactPhone>{contact.phone || "No phone number"}</ContactPhone>
        <ActionButtons>
          <ActionBtn>
            <ActionBtnIcon><PhoneOutlined /></ActionBtnIcon>
            <ActionBtnLabel>Audio</ActionBtnLabel>
          </ActionBtn>
          <ActionBtn>
            <ActionBtnIcon><VideoCameraOutlined /></ActionBtnIcon>
            <ActionBtnLabel>Video</ActionBtnLabel>
          </ActionBtn>
          <ActionBtn>
            <ActionBtnIcon><SearchOutlined /></ActionBtnIcon>
            <ActionBtnLabel>Search</ActionBtnLabel>
          </ActionBtn>
        </ActionButtons>
      </ProfileSection>

      <Divider />

      <Section>
        <SectionLabel>About</SectionLabel>
        <AboutText>{contact.about || "Hey there! I am using WhatsApp"}</AboutText>
      </Section>

      <Divider />

      <MediaTabs>
        <MediaTab $active>
          <PictureOutlined /> Media
        </MediaTab>
        <MediaTab>
          <LinkOutlined /> Links
        </MediaTab>
        <MediaTab>
          <FileOutlined /> Docs
        </MediaTab>
      </MediaTabs>
      <MediaEmpty>No media, links, or docs</MediaEmpty>

      <Divider />

      <SettingRow>
        <SettingIcon><BellOutlined /></SettingIcon>
        <SettingLabel>Notifications</SettingLabel>
        <SettingValue>{contact.isMuted ? "Off" : "Default"}</SettingValue>
        <SettingArrow><RightOutlined /></SettingArrow>
      </SettingRow>

      <SettingRow>
        <SettingIcon><FieldTimeOutlined /></SettingIcon>
        <SettingLabel>Disappearing Messages</SettingLabel>
        <SettingValue>Off</SettingValue>
        <SettingArrow><RightOutlined /></SettingArrow>
      </SettingRow>

      <SettingRow>
        <SettingIcon><UserOutlined /></SettingIcon>
        <SettingLabel>Contact Details</SettingLabel>
        <SettingArrow><RightOutlined /></SettingArrow>
      </SettingRow>

      <Divider />

      <DangerRow>
        <DangerIcon><StopOutlined /></DangerIcon>
        <DangerLabel>Block {contact.name.replace(/[❤️💕🔬]/g, "").trim()}</DangerLabel>
      </DangerRow>

      <DangerRow>
        <DangerIcon><ExclamationCircleOutlined /></DangerIcon>
        <DangerLabel>Report {contact.name.replace(/[❤️💕🔬]/g, "").trim()}</DangerLabel>
      </DangerRow>

      <DangerRow>
        <DangerIcon><DeleteOutlined /></DangerIcon>
        <DangerLabel>Clear Chat</DangerLabel>
      </DangerRow>
    </Panel>
  );
}
