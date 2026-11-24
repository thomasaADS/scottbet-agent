import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { site } from "@/site-config";

const BET = 50;
const START_BALANCE = 1000;

type GameId = "wheel" | "slots" | "crash" | "plinko" | "penalty" | "scratch";

interface GameProps {
  canPlay: boolean;
  /** Charge the bet. Returns false when the demo balance is too low. */
  stake: () => boolean;
  /** Pay out a multiple of the bet (0 = nothing). */
  payout: (multiplier: number) => void;
}

interface GameMeta {
  id: GameId;
  name: string;
  blurb: string;
  image: string;
}

const GAMES: GameMeta[] = [
  { id: "wheel", name: "גלגל המזל", blurb: "סיבוב אחד, שמונה אפשרויות.", image: "/assets/games/wheel.jpg" },
  { id: "slots", name: "מכונת מזל", blurb: "שלושה גלגלים, שלושה סמלים.", image: "/assets/games/slots.jpg" },
  { id: "crash", name: "קראש", blurb: "מושכים לפני שהטיל מתרסק.", image: "/assets/games/crash.jpg" },
  { id: "plinko", name: "פלינקו", blurb: "הכדור נופל, המכפיל מחליט.", image: "/assets/games/plinko.jpg" },
  { id: "penalty", name: "פנדל", blurb: "בוחרים פינה ובועטים.", image: "/assets/games/penalty.jpg" },
  { id: "scratch", name: "כרטיס גירוד", blurb: "שלושה זהים והכרטיס זוכה.", image: "/assets/games/scratch.jpg" },
];

function formatCoins(value: number): string {
  return Math.round(value).toLocaleString("he-IL");
}

/* ------------------------------------------------------------------ wheel */

const WHEEL_SEGMENTS = [0, 2, 0.5, 3, 0, 1.5, 0, 5];

function WheelGame({ canPlay, stake, payout }: GameProps) {
  const [angle, setAngle] = useState(0);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("לוחצים על סיבוב ומחכים לחץ.");
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);

  const spin = () => {
    if (busy || !stake()) return;
    setBusy(true);
    setNote("מסתובב...");
    const index = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const slice = 360 / WHEEL_SEGMENTS.length;
    const base = Math.ceil(angle / 360) * 360;
    const target = base + 360 * 5 + (360 - (index * slice + slice / 2));
    setAngle(target);
    timer.current = window.setTimeout(() => {
      const multiplier = WHEEL_SEGMENTS[index] ?? 0;
      payout(multiplier);
      setNote(multiplier > 0 ? `נחת על x${multiplier}. זכייה של ${formatCoins(BET * multiplier)} מטבעות דמו.` : "נחת על אפס. מנסים שוב?");
      setBusy(false);
    }, 4200);
  };

  return (
    <div className="dg-wheel">
      <div className="dg-wheel__frame">
        <span aria-hidden="true" className="dg-wheel__pointer" />
        <div className="dg-wheel__disc" style={{ transform: `rotate(${angle}deg)` }}>
          {WHEEL_SEGMENTS.map((value, index) => (
            <span
              className="dg-wheel__label"
              key={index}
              style={{ transform: `rotate(${index * 45 + 22.5}deg) translateY(-38%)` }}
            >
              x{value}
            </span>
          ))}
        </div>
        <span aria-hidden="true" className="dg-wheel__hub" />
      </div>
      <p aria-live="polite" className="dg-note">{note}</p>
      <button className="dg-play" disabled={busy || !canPlay} onClick={spin} type="button">
        סיבוב ({BET} דמו)
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ slots */

const SLOT_SYMBOLS = ["🍒", "🔔", "💎", "🍋", "⭐", "🍀"];

function randomSymbol(): string {
  return SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)] ?? "🍒";
}

function SlotsGame({ canPlay, stake, payout }: GameProps) {
  const [reels, setReels] = useState<string[]>(["🍒", "💎", "🔔"]);
  const [spinning, setSpinning] = useState<boolean[]>([false, false, false]);
  const [note, setNote] = useState("שלושה זהים משלמים x10, שניים זהים x2.");
  const timers = useRef<number[]>([]);

  useEffect(() => () => {
    timers.current.forEach((id) => window.clearInterval(id));
    timers.current.forEach((id) => window.clearTimeout(id));
  }, []);

  const busy = spinning.some(Boolean);

  const spin = () => {
    if (busy || !stake()) return;
    const final = [randomSymbol(), randomSymbol(), randomSymbol()];
    setSpinning([true, true, true]);
    setNote("הגלגלים רצים...");
    const ticker = window.setInterval(() => {
      setReels((current) => current.map((symbol, i) => (stopped[i] ? symbol : randomSymbol())));
    }, 80);
    timers.current.push(ticker);
    const stopped = [false, false, false];
    [0, 1, 2].forEach((i) => {
      const id = window.setTimeout(() => {
        stopped[i] = true;
        setReels((current) => current.map((symbol, j) => (j === i ? (final[i] ?? symbol) : symbol)));
        setSpinning((current) => current.map((value, j) => (j === i ? false : value)));
        if (i === 2) {
          window.clearInterval(ticker);
          const [a, b, c] = final;
          const multiplier = a === b && b === c ? 10 : a === b || b === c || a === c ? 2 : 0;
          payout(multiplier);
          setNote(multiplier > 0 ? `יש התאמה. זכייה של ${formatCoins(BET * multiplier)} מטבעות דמו.` : "אין התאמה הפעם.");
        }
      }, 700 + i * 450);
      timers.current.push(id);
    });
  };

  return (
    <div className="dg-slots">
      <div className="dg-slots__window">
        {reels.map((symbol, index) => (
          <span className="dg-slots__reel" data-spinning={spinning[index] ? "true" : "false"} key={index}>
            {symbol}
          </span>
        ))}
      </div>
      <p aria-live="polite" className="dg-note">{note}</p>
      <button className="dg-play" disabled={busy || !canPlay} onClick={spin} type="button">
        משיכת ידית ({BET} דמו)
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ crash */

function CrashGame({ canPlay, stake, payout }: GameProps) {
  const [phase, setPhase] = useState<"idle" | "flying" | "cashed" | "crashed">("idle");
  const [multiplier, setMultiplier] = useState(1);
  const [note, setNote] = useState("מתחילים טיסה ומושכים לפני ההתרסקות.");
  const frame = useRef<number | null>(null);
  const live = useRef({ crashAt: 1, value: 1, start: 0 });

  const stop = useCallback(() => {
    if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    frame.current = null;
  }, []);

  useEffect(() => stop, [stop]);

  const launch = () => {
    if (phase === "flying" || !stake()) return;
    const crashAt = Math.min(40, Math.max(1.05, 0.96 / (1 - Math.random())));
    live.current = { crashAt, value: 1, start: performance.now() };
    setMultiplier(1);
    setPhase("flying");
    setNote("הטיל באוויר...");
    const tick = (now: number) => {
      const value = Math.exp((now - live.current.start) * 0.00035);
      if (value >= live.current.crashAt) {
        live.current.value = live.current.crashAt;
        setMultiplier(live.current.crashAt);
        setPhase("crashed");
        setNote(`התרסק ב-x${live.current.crashAt.toFixed(2)}. ההימור אבד.`);
        payout(0);
        frame.current = null;
        return;
      }
      live.current.value = value;
      setMultiplier(value);
      frame.current = window.requestAnimationFrame(tick);
    };
    frame.current = window.requestAnimationFrame(tick);
  };

  const cashOut = () => {
    if (phase !== "flying") return;
    stop();
    const value = live.current.value;
    payout(value);
    setPhase("cashed");
    setNote(`משכתם ב-x${value.toFixed(2)}. זכייה של ${formatCoins(BET * value)} מטבעות דמו.`);
  };

  const lift = Math.min(1, Math.log(multiplier) / Math.log(12));
  const rocketStyle: CSSProperties = {
    transform: `translate(${lift * 78}%, ${-lift * 62}%)`,
  };

  return (
    <div className="dg-crash" data-phase={phase}>
      <div className="dg-crash__sky">
        <span className="dg-crash__value">x{multiplier.toFixed(2)}</span>
        <span aria-hidden="true" className="dg-crash__track">
          <span className="dg-crash__rocket" style={rocketStyle}>
            {phase === "crashed" ? "💥" : "🚀"}
          </span>
        </span>
      </div>
      <p aria-live="polite" className="dg-note">{note}</p>
      {phase === "flying" ? (
        <button className="dg-play dg-play--cash" onClick={cashOut} type="button">
          משיכה עכשיו
        </button>
      ) : (
        <button className="dg-play" disabled={!canPlay} onClick={launch} type="button">
          שיגור ({BET} דמו)
        </button>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- plinko */

const PLINKO_ROWS = 8;
const PLINKO_SLOTS = [5, 2, 1, 0.5, 0.2, 0.5, 1, 2, 5];

function PlinkoGame({ canPlay, stake, payout }: GameProps) {
  const [ball, setBall] = useState<{ row: number; offset: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [landed, setLanded] = useState<number | null>(null);
  const [note, setNote] = useState("משחררים כדור ורואים איפה הוא נוחת.");
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current !== null) window.clearInterval(timer.current);
  }, []);

  const drop = () => {
    if (busy || !stake()) return;
    setBusy(true);
    setLanded(null);
    setNote("הכדור בדרך למטה...");
    let row = 0;
    let rights = 0;
    setBall({ row: 0, offset: 0 });
    timer.current = window.setInterval(() => {
      row += 1;
      if (Math.random() < 0.5) rights += 1;
      setBall({ row, offset: rights - row / 2 });
      if (row >= PLINKO_ROWS) {
        if (timer.current !== null) window.clearInterval(timer.current);
        timer.current = null;
        const multiplier = PLINKO_SLOTS[rights] ?? 0;
        setLanded(rights);
        payout(multiplier);
        setNote(`נחת על x${multiplier}. ${multiplier >= 1 ? `זכייה של ${formatCoins(BET * multiplier)} מטבעות דמו.` : `חזרו ${formatCoins(BET * multiplier)} מטבעות דמו.`}`);
        setBusy(false);
      }
    }, 230);
  };

  const ballStyle: CSSProperties | undefined = ball
    ? {
        transform: `translate(${ball.offset * 100}%, ${ball.row * 100}%)`,
      }
    : undefined;

  return (
    <div className="dg-plinko">
      <div className="dg-plinko__board" dir="ltr">
        <div className="dg-plinko__pegs">
          {Array.from({ length: PLINKO_ROWS }, (_, row) => (
            <div className="dg-plinko__row" key={row}>
              {Array.from({ length: row + 2 }, (_unused, peg) => (
                <span className="dg-plinko__peg" key={peg} />
              ))}
            </div>
          ))}
          {ball ? (
            <span aria-hidden="true" className="dg-plinko__lane">
              <span className="dg-plinko__ball" style={ballStyle} />
            </span>
          ) : null}
        </div>
        <div className="dg-plinko__slots">
          {PLINKO_SLOTS.map((value, index) => (
            <span className="dg-plinko__slot" data-hit={landed === index ? "true" : "false"} key={index}>
              {value}
            </span>
          ))}
        </div>
      </div>
      <p aria-live="polite" className="dg-note">{note}</p>
      <button className="dg-play" disabled={busy || !canPlay} onClick={drop} type="button">
        שחרור כדור ({BET} דמו)
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------- penalty */

const PENALTY_SPOTS = [
  { id: "tl", label: "פינה שמאלית עליונה" },
  { id: "tr", label: "פינה ימנית עליונה" },
  { id: "c", label: "אמצע" },
  { id: "bl", label: "פינה שמאלית תחתונה" },
  { id: "br", label: "פינה ימנית תחתונה" },
];

function PenaltyGame({ canPlay, stake, payout }: GameProps) {
  const [shot, setShot] = useState<string | null>(null);
  const [keeper, setKeeper] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("בוחרים לאן לבעוט. גול משלם x1.5.");
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);

  const kick = (spot: string) => {
    if (busy || !stake()) return;
    const dive = PENALTY_SPOTS[Math.floor(Math.random() * PENALTY_SPOTS.length)]?.id ?? "c";
    setBusy(true);
    setShot(spot);
    setKeeper(dive);
    setNote("בעיטה...");
    timer.current = window.setTimeout(() => {
      const goal = dive !== spot;
      payout(goal ? 1.5 : 0);
      setNote(goal ? `גול! זכייה של ${formatCoins(BET * 1.5)} מטבעות דמו.` : "השוער עצר. מנסים שוב?");
      setBusy(false);
    }, 900);
  };

  return (
    <div className="dg-penalty">
      <div className="dg-penalty__goal" dir="ltr">
        {PENALTY_SPOTS.map((spot) => (
          <button
            aria-label={spot.label}
            className="dg-penalty__spot"
            data-spot={spot.id}
            disabled={busy || !canPlay}
            key={spot.id}
            onClick={() => kick(spot.id)}
            type="button"
          />
        ))}
        <span aria-hidden="true" className="dg-penalty__keeper" data-at={keeper ?? "c"}>🧤</span>
        <span aria-hidden="true" className="dg-penalty__ball" data-at={shot ?? "start"}>⚽</span>
      </div>
      <p aria-live="polite" className="dg-note">{note}</p>
      <p className="dg-hint">כל בעיטה עולה {BET} מטבעות דמו.</p>
    </div>
  );
}

/* ---------------------------------------------------------------- scratch */

const SCRATCH_SYMBOLS: { icon: string; multiplier: number }[] = [
  { icon: "💎", multiplier: 8 },
  { icon: "👑", multiplier: 4 },
  { icon: "🍀", multiplier: 2 },
  { icon: "🍒", multiplier: 1 },
];

function buildCard(): string[] {
  const cells: string[] = [];
  for (let i = 0; i < 9; i += 1) {
    cells.push(SCRATCH_SYMBOLS[Math.floor(Math.random() * SCRATCH_SYMBOLS.length)]?.icon ?? "🍒");
  }
  return cells;
}

function ScratchGame({ canPlay, stake, payout }: GameProps) {
  const [cells, setCells] = useState<string[] | null>(null);
  const [open, setOpen] = useState<boolean[]>([]);
  const [note, setNote] = useState("קונים כרטיס ומגרדים שלושה ריבועים. שלושה זהים זוכים.");
  const settled = useRef(true);

  const buy = () => {
    if (!settled.current || !stake()) return;
    settled.current = false;
    setCells(buildCard());
    setOpen(Array.from({ length: 9 }, () => false));
    setNote("בוחרים שלושה ריבועים לגירוד.");
  };

  const reveal = (index: number) => {
    if (!cells || settled.current || open[index]) return;
    const next = open.map((value, i) => (i === index ? true : value));
    setOpen(next);
    const picked = cells.filter((_cell, i) => next[i]);
    if (picked.length === 3) {
      settled.current = true;
      const same = picked[0] === picked[1] && picked[1] === picked[2];
      const multiplier = same ? (SCRATCH_SYMBOLS.find((s) => s.icon === picked[0])?.multiplier ?? 0) * 3 : 0;
      payout(multiplier);
      setOpen(Array.from({ length: 9 }, () => true));
      setNote(multiplier > 0 ? `שלושה זהים! זכייה של ${formatCoins(BET * multiplier)} מטבעות דמו.` : "לא יצאו שלושה זהים. כרטיס חדש?");
    }
  };

  const finished = cells !== null && open.length > 0 && open.every(Boolean);

  return (
    <div className="dg-scratch">
      <div className="dg-scratch__card">
        {(cells ?? Array.from({ length: 9 }, () => "")).map((symbol, index) => (
          <button
            aria-label={open[index] ? `ריבוע ${index + 1}: ${symbol}` : `גירוד ריבוע ${index + 1}`}
            className="dg-scratch__cell"
            data-open={open[index] ? "true" : "false"}
            disabled={!cells || finished}
            key={index}
            onClick={() => reveal(index)}
            type="button"
          >
            <span>{open[index] ? symbol : ""}</span>
          </button>
        ))}
      </div>
      <p aria-live="polite" className="dg-note">{note}</p>
      {!cells || finished ? (
        <button className="dg-play" disabled={!canPlay} onClick={buy} type="button">
          כרטיס חדש ({BET} דמו)
        </button>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------- section */

function renderGame(id: GameId, props: GameProps): ReactNode {
  switch (id) {
    case "wheel":
      return <WheelGame {...props} />;
    case "slots":
      return <SlotsGame {...props} />;
    case "crash":
      return <CrashGame {...props} />;
    case "plinko":
      return <PlinkoGame {...props} />;
    case "penalty":
      return <PenaltyGame {...props} />;
    case "scratch":
      return <ScratchGame {...props} />;
    default:
      return null;
  }
}

export function DemoGames() {
  const [active, setActive] = useState<GameId | null>(null);
  const [balance, setBalance] = useState(START_BALANCE);
  const balanceRef = useRef(START_BALANCE);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const update = useCallback((next: number) => {
    balanceRef.current = next;
    setBalance(next);
  }, []);

  const stake = useCallback(() => {
    if (balanceRef.current < BET) return false;
    update(balanceRef.current - BET);
    return true;
  }, [update]);

  const payout = useCallback(
    (multiplier: number) => {
      if (multiplier > 0) update(balanceRef.current + BET * multiplier);
    },
    [update],
  );

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [active]);

  const current = GAMES.find((game) => game.id === active) ?? null;
  const canPlay = balance >= BET;

  return (
    <section className="games" id="games">
      <video autoPlay className="games__film" loop muted playsInline poster="/assets/games/roulette-poster.jpg" preload="metadata">
        <source media="(max-width: 720px)" src="/assets/games/roulette-mobile.mp4" type="video/mp4" />
        <source src="/assets/games/roulette.mp4" type="video/mp4" />
      </video>
      <div className="games__head">
        <p className="games__eyebrow">משחקי דמו · בחינם</p>
        <h2 className="games__title">מנסים לפני שנכנסים</h2>
        <p className="games__lead">
          שישה משחקים שרצים כאן בדפדפן עם מטבעות דמו בלבד. אין הרשמה, אין הפקדה ואין זכייה כספית. כשתרצו את הדבר האמיתי, הכל מחכה ב-scottbet.
        </p>
      </div>
      <ul className="games__grid">
        {GAMES.map((game) => (
          <li key={game.id}>
            <button className="game-tile" onClick={() => setActive(game.id)} type="button">
              <img alt="" className="game-tile__art" height={640} loading="lazy" src={game.image} width={640} />
              <span className="game-tile__meta">
                <span className="game-tile__name">{game.name}</span>
                <span className="game-tile__blurb">{game.blurb}</span>
              </span>
              <span className="game-tile__go">שחקו דמו</span>
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div className="dg-overlay" onClick={() => setActive(null)} role="presentation">
          <div
            aria-label={current.name}
            aria-modal="true"
            className="dg-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <header className="dg-modal__bar">
              <h3 className="dg-modal__title">{current.name}</h3>
              <span className="dg-modal__balance">יתרת דמו: {formatCoins(balance)}</span>
              <button aria-label="סגירה" className="dg-modal__close" onClick={() => setActive(null)} ref={closeRef} type="button">
                ✕
              </button>
            </header>
            <div className="dg-modal__body">{renderGame(current.id, { canPlay, payout, stake })}</div>
            {!canPlay ? (
              <button className="dg-refill" onClick={() => update(START_BALANCE)} type="button">
                נגמרו המטבעות. טעינת דמו מחדש
              </button>
            ) : null}
            <footer className="dg-modal__foot">
              <span>מטבעות דמו בלבד, ללא ערך כספי.</span>
              <a className="dg-modal__real" href={site.platformUrl} rel="noopener noreferrer" target="_blank">
                למשחק המלא ב-scottbet
              </a>
            </footer>
          </div>
        </div>
      ) : null}
    </section>
  );
}
