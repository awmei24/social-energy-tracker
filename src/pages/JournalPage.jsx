import { useState, useRef } from "react";
import drainedLight from "../assets/drained-lightest.svg";
import neutralDark from "../assets/neutral-dark.svg";
import energizedLight from "../assets/energized-lightest.svg";
import { getLogs } from "../hooks/storage";
import {
  BookScene,
  BookSpine,
  BehindPage,
  FlipPage,
  PageBack,
  ShadowLayer,
  PageNav,
  NavArrow,
  PageIndicator,
  EntryBadge,
  EmptyState,
  PageHeader,
} from "../styles/JournalStyles";

// Drag: 1 full page-width of drag = full 180° flip
const EASING = "transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

function PageContent({ entry }) {
  return (
    <>
      <div className="page-date">
        {new Date(entry.timestamp).toLocaleDateString([], {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <div className="page-time">
        {new Date(entry.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
      <div className="page-badges">
        <EntryBadge energyType={entry.energy}>
          <img
            src={entry.energy === "low" ? drainedLight : entry.energy === "mid" ? neutralDark : energizedLight}
            alt=""
            style={{ width: 14, height: 14, marginRight: 5, verticalAlign: "middle" }}
          />
          {entry.energy === "low" ? "Drained" : entry.energy === "mid" ? "Neutral" : "Energized"}
        </EntryBadge>
        <EntryBadge energyType="type">{entry.type}</EntryBadge>
      </div>
      <div className="page-text">{entry.journal}</div>
      {entry.tags?.length > 0 && (
        <div className="page-tags">
          {entry.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

export default function JournalPage() {
  const logs = getLogs();
  const journalEntries = logs.filter((log) => log.journal && log.journal.trim());
  const sortedEntries = [...journalEntries].sort((a, b) => b.timestamp - a.timestamp);

  // flipAngle: 0 = flat (front visible), -180 = fully flipped (back visible)
  // flipMode: 'next' = current page flipping away (reveal next)
  //           'prev' = prev page flipping in (entering from spine side)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipAngle, setFlipAngle] = useState(0);
  const [flipMode, setFlipMode] = useState("next");
  const [transition, setTransition] = useState(EASING);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef(null);
  const dragStartX = useRef(0);
  const pointerIsDown = useRef(false); // true between pointerdown and pointerup on this element

  const getPageW = () =>
    (containerRef.current?.offsetWidth ?? 360) - 28; // subtract spine width

  // After a flip animation lands, instantly reset without visual jump
  const finishFlip = (newIndex) => {
    setTransition("none");
    setFlipAngle(0);
    setFlipMode("next");
    setIsAnimating(false);
    setCurrentIndex(newIndex);
    // Re-enable transition on the next paint
    requestAnimationFrame(() => setTransition(EASING));
  };

  // ── Next: current page rotates 0 → -180, revealing next beneath ──
  const animateToNext = () => {
    setTransition(EASING);
    setIsAnimating(true);
    setFlipAngle(-180);
    setTimeout(() => finishFlip(currentIndex + 1), 430);
  };

  const flipToNext = () => {
    if (currentIndex >= sortedEntries.length - 1 || isAnimating) return;
    setFlipMode("next");
    animateToNext();
  };

  // ── Prev: prev page starts at -180 (tucked behind spine), animates to 0 ──
  const flipToPrev = () => {
    if (currentIndex <= 0 || isAnimating) return;
    setFlipMode("prev");
    setFlipAngle(-180);      // jump instantly to the hidden position
    setTransition("none");
    setIsAnimating(true);
    // Two rAFs: first lets the DOM render the -180 state, second starts the animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransition(EASING);
        setFlipAngle(0);     // animate in: prev page unfolds onto the stack
        setTimeout(() => finishFlip(currentIndex - 1), 430);
      });
    });
  };

  // ── Drag interaction ─────────────────────────────────────────────────
  const handlePointerDown = (e) => {
    if (isAnimating) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartX.current = e.clientX;
    pointerIsDown.current = true;
    // Don't activate the flip yet — wait for actual drag movement
  };

  const handlePointerMove = (e) => {
    if (!pointerIsDown.current) return;
    const delta = e.clientX - dragStartX.current;

    if (!isDragging) {
      // Only activate after dragging at least 8px to the left
      if (delta < -8) {
        setTransition("none");
        setFlipMode("next");
        setFlipAngle(0);
        setIsDragging(true);
      }
      return;
    }

    if (delta > 0) return; // only allow leftward drag
    const pageW = getPageW();
    const angle = Math.max(-180, (delta / pageW) * 180);
    setFlipAngle(angle);
  };

  const handlePointerUp = () => {
    pointerIsDown.current = false;
    if (!isDragging) return; // was a click, not a drag — do nothing
    setIsDragging(false);

    if (flipAngle < -90 && currentIndex < sortedEntries.length - 1) {
      animateToNext();
    } else {
      setTransition(EASING);
      setFlipAngle(0);
    }
  };

  // ── Derived display values ───────────────────────────────────────────

  // Which entry is the "flipping" page vs the "revealed" page?
  const flipEntry =
    flipMode === "next"
      ? sortedEntries[currentIndex]          // current page flips away
      : sortedEntries[currentIndex - 1];    // prev page flips in

  const behindEntry =
    flipMode === "next"
      ? sortedEntries[currentIndex + 1]     // next page is revealed beneath
      : sortedEntries[currentIndex];        // current page stays put beneath

  // Shadow peaks at 90° (sin(90°) = 1), fades at 0° and 180°
  const shadowOpacity = Math.sin((-flipAngle / 180) * Math.PI) * 0.38;

  return (
    <div>
      <PageHeader>
        <h1>Journal</h1>
        <p className="subtitle">
          {journalEntries.length}{" "}
          {journalEntries.length === 1 ? "entry" : "entries"}
        </p>
      </PageHeader>

      {sortedEntries.length === 0 ? (
        <EmptyState>
          <p>No journal entries yet.</p>
          <p className="hint">
            Log an interaction and add a journal entry to see it here.
          </p>
        </EmptyState>
      ) : (
        <>
          <BookScene ref={containerRef}>
            <BookSpine />

            {/* The page that gets revealed as the flip page rotates */}
            {behindEntry && (
              <BehindPage>
                <PageContent entry={behindEntry} />
                <ShadowLayer style={{ opacity: shadowOpacity }} />
              </BehindPage>
            )}

            {/* The 3D flipping page */}
            {flipEntry && (
              <FlipPage
                style={{
                  transform: `rotateY(${flipAngle}deg)`,
                  transition,
                  cursor: isDragging ? "grabbing" : "grab",
                  userSelect: "none",
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                <PageContent entry={flipEntry} />
                {/* Back face — visible when page rotates past 90° */}
                <PageBack />
              </FlipPage>
            )}
          </BookScene>

          <PageNav>
            <NavArrow
              disabled={currentIndex === 0 || isAnimating}
              onClick={flipToPrev}
            >
              ← Prev
            </NavArrow>
            <PageIndicator>
              {currentIndex + 1} of {sortedEntries.length}
            </PageIndicator>
            <NavArrow
              disabled={currentIndex === sortedEntries.length - 1 || isAnimating}
              onClick={flipToNext}
            >
              Next →
            </NavArrow>
          </PageNav>
        </>
      )}
    </div>
  );
}
