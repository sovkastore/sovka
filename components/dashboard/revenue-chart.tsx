"use client";

import { useEffect, useRef, useState } from "react";
import { CHART } from "@/lib/dashboard-mock";

type P = { x: number; y: number };

function smoothPath(pts: P[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  const t = 0.16;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) * t;
    const c1y = p1.y + (p2.y - p0.y) * t;
    const c2x = p2.x - (p3.x - p1.x) * t;
    const c2y = p2.y - (p3.y - p1.y) * t;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

export function RevenueChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 720, h: 300 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) setSize({ w: r.width, h: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const { w, h } = size;
  const padL = 46;
  const padR = 16;
  const padT = 18;
  const padB = 28;
  const plotW = Math.max(10, w - padL - padR);
  const plotH = Math.max(10, h - padT - padB);
  const baseline = padT + plotH;

  const n = CHART.points.length;
  const pts: P[] = CHART.points.map((v, i) => ({
    x: padL + (plotW * i) / (n - 1),
    y: padT + plotH * (1 - v / CHART.max),
  }));

  const line = smoothPath(pts);
  const area = `${line} L ${pts[n - 1].x.toFixed(2)} ${baseline} L ${pts[0].x.toFixed(2)} ${baseline} Z`;
  const last = pts[n - 1];
  const first = pts[0];

  // y gridlines (one per tick label)
  const tickCount = CHART.yTicks.length; // 6 → values 1.5M..0
  const yRows = CHART.yTicks.map((label, i) => ({
    label,
    y: padT + (plotH * i) / (tickCount - 1),
  }));

  // tooltip placed above-left of the final point
  const tipW = 150;
  const tipLeft = Math.min(Math.max(last.x - tipW + 18, padL), w - tipW - 6);
  const tipTop = Math.max(last.y - 76, 4);

  return (
    <div ref={ref} className="relative h-full w-full">
      <svg width={w} height={h} className="block">
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.38" />
            <stop offset="55%" stopColor="#0A84FF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0A84FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="revLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0EA5FF" />
          </linearGradient>
          <filter id="revGlow" x="-20%" y="-40%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* horizontal gridlines + y labels */}
        {yRows.map((r, i) => (
          <g key={i}>
            <line
              x1={padL}
              x2={w - padR}
              y1={r.y}
              y2={r.y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
            <text
              x={padL - 10}
              y={r.y + 4}
              textAnchor="end"
              fontSize="11"
              fill="#6B7686"
              fontFamily="Inter, sans-serif"
            >
              {r.label}
            </text>
          </g>
        ))}

        {/* x labels */}
        {CHART.xLabels.map((label, i) => (
          <text
            key={label}
            x={pts[i].x}
            y={baseline + 18}
            textAnchor="middle"
            fontSize="11"
            fill="#6B7686"
            fontFamily="Inter, sans-serif"
          >
            {label}
          </text>
        ))}

        {/* vertical guide at the active (last) point */}
        <line
          x1={last.x}
          x2={last.x}
          y1={last.y}
          y2={baseline}
          stroke="rgba(56,189,248,0.35)"
          strokeWidth={1}
          strokeDasharray="3 4"
        />

        <path d={area} fill="url(#revFill)" />
        <path
          d={line}
          fill="none"
          stroke="url(#revLine)"
          strokeWidth={2.6}
          strokeLinecap="round"
          filter="url(#revGlow)"
        />

        {/* endpoint dots */}
        <circle cx={first.x} cy={first.y} r={4.5} fill="#38BDF8" />
        <circle cx={last.x} cy={last.y} r={9} fill="#38BDF8" opacity={0.22} />
        <circle cx={last.x} cy={last.y} r={5} fill="#38BDF8" stroke="#0B1220" strokeWidth={2} />
      </svg>

      {/* tooltip */}
      <div
        className="pointer-events-none absolute rounded-xl border border-white/10 bg-[#0B1220]/95 px-3 py-2 shadow-card backdrop-blur"
        style={{ left: tipLeft, top: tipTop, width: tipW }}
      >
        <div className="text-[11px] font-medium text-muted">{CHART.peakLabel}</div>
        <div className="mt-1 flex items-center gap-1.5 text-[12px] font-semibold text-ink">
          <span className="inline-block h-2 w-2 rounded-full bg-brand-400" />
          <span className="text-muted">Revenue</span>
          <span className="ml-auto">{CHART.peakValue}</span>
        </div>
      </div>
    </div>
  );
}
