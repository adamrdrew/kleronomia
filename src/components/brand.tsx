export function Emblem({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M10 5v38M15 24 38 5M15 24l23 19M19 24 42 5M19 24l23 19"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M5 5h10M5 43h10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function InheritanceIllustration() {
  return (
    <svg
      className="inheritance-art"
      viewBox="0 0 500 570"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="gold"
          x1="50"
          y1="50"
          x2="420"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B08B4D" />
          <stop offset=".5" stopColor="#C6AA77" />
          <stop offset="1" stopColor="#80602C" />
        </linearGradient>
      </defs>
      <g stroke="url(#gold)" strokeWidth=".8">
        {Array.from({ length: 14 }, (_, i) => (
          <path
            key={i}
            d={`M${70 + i * 9} 440 V${270 - i * 9} A${180 - i * 9} ${180 - i * 9} 0 0 1 ${430 - i * 9} ${270 - i * 9} V440`}
            opacity={0.35 + i * 0.04}
          />
        ))}
        <circle cx="250" cy="256" r="218" strokeDasharray="2 6" opacity=".45" />
        <path d="M25 440h450M250 24v493M50 525h400" opacity=".5" />
        <path
          d="M159 135v281M176 277 339 135M176 277l163 139M197 277 360 135M197 277l163 139"
          strokeWidth="2"
        />
        <circle cx="250" cy="24" r="3" fill="var(--paper)" />
        <circle cx="250" cy="517" r="3" fill="var(--paper)" />
        <path d="m242 525 8-8 8 8M245 18l5 6 5-6" />
      </g>
      <text
        x="250"
        y="558"
        textAnchor="middle"
        fill="currentColor"
        fontSize="9"
        letterSpacing="3"
        fontFamily="sans-serif"
      >
        CONTINUITY · POSSIBILITY · INHERITANCE
      </text>
    </svg>
  );
}
