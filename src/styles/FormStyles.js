import styled from 'styled-components';
import { colors } from './GlobalStyle';

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

export const SelectorGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: ${colors.darkest};
    margin: 0;
    letter-spacing: 0.3px;
  }

  @media (max-width: 768px) {
    gap: 20px;
    margin-bottom: 24px;

    h3 {
      font-size: 15px;
    }
  }
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 12px;
  }
`;

export const OptionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 16px;
  background-color: ${colors.lightest};
  border: 2px solid ${colors.light};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 120px;
  color: ${colors.darkest};
  font-weight: 500;

  .emoji {
    font-size: 36px;
    display: block;
  }

  .label {
    font-size: 14px;
    text-align: center;
  }

  &:hover {
    border-color: ${colors.medium};
    background-color: rgba(62, 92, 118, 0.05);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    background-color: ${colors.medium};
    border-color: ${colors.medium};
    color: ${colors.lightest};

    &:hover {
      background-color: ${colors.dark};
      border-color: ${colors.dark};
    }
  `}

  @media (max-width: 768px) {
    padding: 16px 12px;
    min-height: 100px;
    gap: 8px;

    .emoji {
      font-size: 28px;
    }

    .label {
      font-size: 12px;
    }
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const TagButton = styled.button`
  padding: 10px 18px;
  background-color: ${colors.lightest};
  border: 2px solid ${colors.light};
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${colors.darkest};
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;

  &:hover {
    border-color: ${colors.medium};
    background-color: rgba(62, 92, 118, 0.05);
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    background-color: ${colors.medium};
    border-color: ${colors.medium};
    color: ${colors.lightest};

    &:hover {
      background-color: ${colors.dark};
      border-color: ${colors.dark};
    }
  `}

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

export const CustomTagInput = styled.div`
  display: flex;
  gap: 12px;

  input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid ${colors.light};
    border-radius: 6px;
    background-color: ${colors.lightest};
    color: ${colors.darkest};
    font-size: 14px;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${colors.medium};
      box-shadow: 0 0 0 3px rgba(62, 92, 118, 0.1);
    }

    &::placeholder {
      color: ${colors.light};
    }
  }

  @media (max-width: 768px) {
    gap: 10px;

    input {
      padding: 10px 14px;
      font-size: 13px;
    }
  }
`;

export const JournalTextarea = styled.textarea`
  min-height: 200px;
  padding: 16px;
  border: 2px solid ${colors.light};
  border-radius: 8px;
  background-color: ${colors.lightest};
  color: ${colors.darkest};
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.medium};
    box-shadow: 0 0 0 3px rgba(62, 92, 118, 0.1);
  }

  &::placeholder {
    color: ${colors.light};
  }

  @media (max-width: 768px) {
    min-height: 160px;
    padding: 14px;
    font-size: 13px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 768px) {
    gap: 10px;
    flex-direction: row;

    button {
      flex: 1;
    }
  }
`;

export const BackButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${colors.medium};
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 20px;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    color: ${colors.darkest};
    transform: translateX(-4px);
  }

  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 16px;
  }
`;

export const PrimaryButton = styled.button`
  padding: 14px 28px;
  background-color: ${colors.medium};
  color: ${colors.lightest};
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.3px;

  &:hover {
    background-color: ${colors.dark};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(62, 92, 118, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 14px;
  }
`;

export const SecondaryButton = styled.button`
  padding: 14px 28px;
  background-color: ${colors.lightest};
  color: ${colors.darkest};
  border: 2px solid ${colors.light};
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.3px;

  &:hover {
    border-color: ${colors.medium};
    background-color: rgba(62, 92, 118, 0.05);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 14px;
  }
`;

export const ProgressIndicator = styled.div`
  font-size: 12px;
  color: ${colors.light};
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;
