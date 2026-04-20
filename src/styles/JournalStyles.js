import styled, { css } from 'styled-components';
import { colors } from './GlobalStyle';

const SPINE = 28;

const paperBackground = css`
  background: #fdf8ef;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 31px,
    rgba(170, 155, 130, 0.2) 31px,
    rgba(170, 155, 130, 0.2) 32px
  );
  background-attachment: local;
`;

const paperPadding = css`
  padding: 32px 28px 40px 44px;
  box-sizing: border-box;
  overflow-y: auto;

  .page-date {
    font-size: 13px;
    font-weight: 700;
    color: ${colors.darkest};
    letter-spacing: 0.2px;
    line-height: 32px;
  }

  .page-time {
    font-size: 11px;
    color: ${colors.medium};
    line-height: 32px;
    margin-bottom: 8px;
  }

  .page-badges {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .page-text {
    font-size: 14px;
    line-height: 32px;
    color: ${colors.darkest};
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .page-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 20px;

    .tag {
      font-size: 11px;
      color: ${colors.light};
      font-style: italic;
    }
  }

  @media (max-width: 768px) {
    padding: 24px 16px 32px 36px;

    .page-text {
      font-size: 13px;
    }
  }
`;

/* ─── Book container ────────────────────────────────────── */

export const BookScene = styled.div`
  position: relative;
  width: 100%;
  max-width: 520px;
  height: min(580px, 70vh);
  min-height: 380px;

  /* 3D perspective for children */
  perspective: 1500px;
  perspective-origin: center center;

  /* Subtle bottom shadow to suggest a book sitting on a surface */
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 4%;
    right: 4%;
    height: 12px;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, transparent 70%);
    pointer-events: none;
  }
`;

/* ─── Spine (left binding) ───────────────────────────────── */

export const BookSpine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${SPINE}px;
  z-index: 10;
  background: linear-gradient(
    to right,
    rgba(90, 78, 58, 0.55) 0%,
    rgba(140, 125, 100, 0.25) 70%,
    transparent 100%
  );
  border-right: 1px solid rgba(100, 88, 65, 0.3);
  pointer-events: none;
`;

/* ─── Behind page (revealed as flip progresses) ─────────── */

export const BehindPage = styled.div`
  position: absolute;
  top: 0;
  left: ${SPINE}px;
  width: calc(100% - ${SPINE}px);
  height: 100%;
  z-index: 1;
  ${paperBackground}
  ${paperPadding}

  /* Margin line */
  &::before {
    content: '';
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(200, 80, 80, 0.22);
    pointer-events: none;
  }
`;

/* Shadow cast by the flipping page onto the behind page */
export const ShadowLayer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.12) 30%,
    transparent 65%
  );
  pointer-events: none;
  z-index: 1;
`;

/* ─── The flipping page ──────────────────────────────────── */

export const FlipPage = styled.div`
  position: absolute;
  top: 0;
  left: ${SPINE}px;
  width: calc(100% - ${SPINE}px);
  height: 100%;
  z-index: 2;

  /* 3D flip hinge is the left edge (the spine) */
  transform-origin: left center;
  transform-style: preserve-3d;

  /* Front face: hide when rotated past 90° */
  backface-visibility: hidden;

  ${paperBackground}
  ${paperPadding}

  /* Margin line */
  &::before {
    content: '';
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(200, 80, 80, 0.25);
    pointer-events: none;
  }

  /* Right-edge lift shadow — suggests a page you can grab */
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08), 6px 0 24px rgba(0, 0, 0, 0.07);
`;

/* Back face of the flipping page (shown when page rotates past 90°) */
export const PageBack = styled.div`
  position: absolute;
  inset: 0;
  /* Rotate 180° to face backwards — only visible when FlipPage is past 90° */
  transform: rotateY(180deg);
  backface-visibility: hidden;

  /* Slightly different paper tone for the back */
  background: #ede5d0;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 31px,
    rgba(150, 135, 110, 0.2) 31px,
    rgba(150, 135, 110, 0.2) 32px
  );

  /* Spine-side shadow on the back */
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 20%;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.08), transparent);
    pointer-events: none;
  }
`;

/* ─── Navigation ─────────────────────────────────────────── */

export const PageNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 520px;
  margin-top: 20px;
  padding: 0 4px;
`;

export const NavArrow = styled.button`
  background: none;
  border: 1px solid
    ${({ disabled }) => (disabled ? 'rgba(116,140,171,0.3)' : colors.light)};
  color: ${({ disabled }) => (disabled ? 'rgba(116,140,171,0.35)' : colors.medium)};
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 15px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition: all 0.15s ease;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background: rgba(62, 92, 118, 0.06);
    border-color: ${colors.medium};
    color: ${colors.darkest};
  }
`;

export const PageIndicator = styled.div`
  font-size: 12px;
  color: ${colors.medium};
  font-weight: 500;
  letter-spacing: 0.3px;
`;

/* ─── Badges ─────────────────────────────────────────────── */

export const EntryBadge = styled.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  display: inline-block;

  ${({ energyType }) => {
    switch (energyType) {
      case 'low':
        return `background-color: #d63031; color: #fdf8ef;`;
      case 'mid':
        return `background-color: #fdcb6e; color: ${colors.darkest};`;
      case 'high':
        return `background-color: #00b894; color: #fdf8ef;`;
      default:
        return `background-color: ${colors.light}; color: #fdf8ef;`;
    }
  }}
`;

/* ─── Empty state & header ───────────────────────────────── */

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
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

    p { font-size: 14px; &.hint { font-size: 12px; } }
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

    h1 { font-size: 26px; }
  }
`;
