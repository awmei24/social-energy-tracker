import styled from 'styled-components';
import { colors } from './GlobalStyle';

export const JournalContainer = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const JournalEntryCard = styled.div`
  background-color: rgba(240, 235, 216, 0.5);
  border: 1px solid ${colors.light};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 8px;
  }

  .date-info {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .date {
      font-weight: 600;
      color: ${colors.darkest};
      font-size: 14px;
    }

    .time {
      font-size: 12px;
      color: ${colors.medium};
      font-weight: 500;
    }
  }

  .context-badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .tags-section {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .tag {
      background-color: ${colors.medium};
      color: ${colors.lightest};
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
    }
  }

  .content-section {
    margin-top: 12px;
    padding-top: 16px;
    border-top: 1px solid ${colors.light};

    p {
      margin: 0;
      font-size: 15px;
      color: ${colors.darkest};
      line-height: 1.6;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }

  @media (max-width: 768px) {
    padding: 18px;
    gap: 14px;

    .entry-header {
      gap: 12px;
      flex-direction: column;
    }

    .date-info {
      .date {
        font-size: 13px;
      }

      .time {
        font-size: 11px;
      }
    }

    .context-badges {
      justify-content: flex-start;
    }

    .tags-section {
      gap: 6px;

      .tag {
        padding: 5px 10px;
        font-size: 11px;
      }
    }

    .content-section {
      margin-top: 10px;
      padding-top: 12px;

      p {
        font-size: 14px;
      }
    }
  }
`;

export const EntryBadge = styled.span`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;

  ${({ energyType }) => {
    switch (energyType) {
      case 'low':
        return `
          background-color: #d63031;
          color: ${colors.lightest};
        `;
      case 'mid':
        return `
          background-color: #fdcb6e;
          color: ${colors.darkest};
        `;
      case 'high':
        return `
          background-color: #00b894;
          color: ${colors.lightest};
        `;
      default:
        return `
          background-color: ${colors.light};
          color: ${colors.lightest};
        `;
    }
  }}

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 11px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${colors.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  p {
    margin: 0;
    font-size: 15px;
    color: ${colors.medium};

    &.hint {
      font-size: 13px;
    }
  }

  @media (max-width: 768px) {
    padding: 48px 20px;

    p {
      font-size: 14px;

      &.hint {
        font-size: 12px;
      }
    }
  }
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 48px;

  h1 {
    font-size: 32px;
    font-weight: 600;
    color: ${colors.darkest};
    letter-spacing: -0.5px;
    margin: 0;
  }

  .subtitle {
    font-size: 14px;
    color: ${colors.medium};
    margin: 0;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    margin-bottom: 36px;

    h1 {
      font-size: 26px;
    }
  }
`;