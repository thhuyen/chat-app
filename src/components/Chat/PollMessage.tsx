import styled from "styled-components";
import type { PollData } from "../../data/mockData";

const PollBubble = styled.div<{ $sent: boolean }>`
  max-width: 340px;
  background: ${(p) => (p.$sent ? "var(--bg-bubble-sent)" : "var(--bg-bubble-received)")};
  border-radius: 8px;
  padding: 10px 12px;
  align-self: ${(p) => (p.$sent ? "flex-end" : "flex-start")};
  margin: 0 60px;
  box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.08);
`;

const PollIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

const Question = styled.div`
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Option = styled.div<{ $voted: boolean }>`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  padding: 10px 12px;
  background: var(--bg-hover);
  cursor: pointer;
`;

const OptionBar = styled.div<{ $percent: number; $voted: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(p) => p.$percent}%;
  background: ${(p) => (p.$voted ? "var(--wa-green)" : "var(--bg-hover)")};
  opacity: ${(p) => (p.$voted ? 0.2 : 0.5)};
  transition: width 0.3s ease;
  border-radius: 8px;
`;

const OptionRow = styled.div`
  display: flex;
  align-items: center;
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`;

const OptionText = styled.span<{ $voted: boolean }>`
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: ${(p) => (p.$voted ? 600 : 400)};
`;

const OptionVotes = styled.span`
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
`;

const RadioDot = styled.span<{ $voted: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${(p) => (p.$voted ? "var(--wa-green)" : "var(--text-muted)")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 10px;

  &::after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(p) => (p.$voted ? "var(--wa-green)" : "transparent")};
  }
`;

const VoteFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid var(--border-light);
`;

const ViewVotes = styled.button`
  font-size: var(--font-size-xs);
  color: var(--wa-teal);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: var(--font-family);

  &:hover {
    text-decoration: underline;
  }
`;

const Timestamp = styled.span`
  font-size: 11px;
  color: var(--text-muted);
`;

interface PollMessageProps {
  poll: PollData;
  timestamp: string;
  sent: boolean;
}

export default function PollMessage({ poll, timestamp, sent }: PollMessageProps) {
  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  return (
    <PollBubble $sent={sent}>
      <PollIcon>
        <span>📊</span> POLL
      </PollIcon>
      <Question>{poll.question}</Question>
      <OptionList>
        {poll.options.map((option, i) => {
          const percent = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          return (
            <Option key={i} $voted={option.voted}>
              <OptionBar $percent={percent} $voted={option.voted} />
              <OptionContent>
                <OptionRow>
                  <RadioDot $voted={option.voted} />
                  <OptionText $voted={option.voted}>{option.text}</OptionText>
                </OptionRow>
                <OptionVotes>{option.votes} votes</OptionVotes>
              </OptionContent>
            </Option>
          );
        })}
      </OptionList>
      <VoteFooter>
        <ViewVotes>View votes</ViewVotes>
        <Timestamp>{timestamp}</Timestamp>
      </VoteFooter>
    </PollBubble>
  );
}
