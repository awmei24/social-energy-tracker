import styled from 'styled-components';
import { colors } from './GlobalStyle';

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 56px;

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

export const AnalyticsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
//   gap: 32px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  border-top: 1px solid ${colors.light};
  // border-bottom: 1px solid ${colors.light};

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: ${colors.darkest};
    margin: 0;
    letter-spacing: 0.3px;
  }
`;

export const Card = styled.div`
  background-color: ${colors.lightest};
  padding: 0px;
 
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

export const EnergyChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const EnergyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background-color: rgba(240, 235, 216, 0.5);
  border-radius: 6px;

  .energy-label {
    width: 110px;
    flex-shrink: 0;
    font-weight: 500;
    color: ${colors.darkest};
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;

    .emoji {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }
  }

  .energy-bar {
    flex: 1;
    height: 24px;
    background-color: ${colors.light};
    border-radius: 4px;
    overflow: hidden;

    .energy-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s ease;

      &.low {
        background-color: #7d0000;
      }

      &.mid {
        background-color: #fdcb6e;
      }

      &.high {
        background-color: #0a7033;
      }
    }
  }

  .energy-count {
    width: 70px;
    flex-shrink: 0;
    text-align: right;
    font-weight: 600;
    color: ${colors.darkest};
    font-size: 14px;

    .percent {
      font-size: 11px;
      color: ${colors.medium};
      margin-left: 4px;
      display: block;
    }
  }

  @media (max-width: 768px) {
    gap: 12px;
    padding: 10px;

    .energy-label {
      width: 90px;
      font-size: 13px;
    }

    .energy-bar {
      height: 20px;
    }

    .energy-count {
      width: 60px;
      font-size: 12px;
    }
  }
`;

export const TypeChart = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
`;

export const ChartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  background-color: rgba(116, 140, 171, 0.05);
  border: 1px solid ${colors.light};
  border-radius: 6px;

  .label {
    font-weight: 500;
    color: ${colors.darkest};
    font-size: 14px;
  }

  .count {
    background-color: ${colors.medium};
    color: ${colors.lightest};
    padding: 4px 10px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    padding: 12px;

    .label {
      font-size: 13px;
    }

    .count {
      font-size: 11px;
      padding: 3px 8px;
    }
  }
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TimelineItem = styled.div`
  display: flex;
  gap: 16px;

  .line-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 16px;
  }

  .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 2px solid ${colors.lightest};

    &.low { background-color: #d63031; box-shadow: 0 0 0 1px #d63031; }
    &.mid { background-color: #fdcb6e; box-shadow: 0 0 0 1px #fdcb6e; }
    &.high { background-color: #00b894; box-shadow: 0 0 0 1px #00b894; }
  }

  .connector {
    width: 2px;
    flex: 1;
    min-height: 16px;
    background-color: ${colors.light};
    opacity: 0.35;
    margin: 4px 0;
  }

  .content {
    flex: 1;
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .timeline-date {
    font-weight: 600;
    color: ${colors.darkest};
    font-size: 13px;
    margin-top: -1px;
  }

  .pips {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
  }

  .pip {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;

    &.low { background-color: #d63031; }
    &.mid { background-color: #fdcb6e; }
    &.high { background-color: #00b894; }
  }

  .extra {
    font-size: 11px;
    color: ${colors.medium};
    font-weight: 500;
  }

  .total-count {
    font-size: 12px;
    color: ${colors.medium};
  }

  @media (max-width: 768px) {
    gap: 12px;

    .dot {
      width: 12px;
      height: 12px;
    }

    .timeline-date {
      font-size: 12px;
    }

    .pip {
      width: 8px;
      height: 8px;
    }

    .content {
      padding-bottom: 20px;
    }
  }
`;

export const LogEntry = styled.div`
  background-color: rgba(240, 235, 216, 0.5);
  border-top: 1px solid ${colors.light};
  border-bottom: 1px solid ${colors.light};
//   border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 8px;

    .date-info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .date {
        font-weight: 600;
        color: ${colors.darkest};
        font-size: 13px;
      }

      .time {
        font-size: 12px;
        color: ${colors.medium};
      }
    }

    .badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    background-color: ${colors.medium};
    color: ${colors.lightest};
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
  }

  .journal {
    margin-top: 8px;
    padding-top: 12px;
    border-top: 1px solid ${colors.light};

    p {
      margin: 0;
      font-size: 13px;
      color: ${colors.darkest};
      line-height: 1.5;
      white-space: pre-wrap;
    }
  }

  @media (max-width: 768px) {
    padding: 14px;

    .entry-header {
      gap: 12px;

      .date-info {
        .date {
          font-size: 12px;
        }

        .time {
          font-size: 11px;
        }
      }
    }

    .tag {
      font-size: 10px;
      padding: 3px 8px;
    }

    .journal p {
      font-size: 12px;
    }
  }
`;

export const Badge = styled.span`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;

  ${({ type }) => {
    switch (type) {
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
