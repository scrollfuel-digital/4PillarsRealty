import React from 'react';

interface LogoProps {
  className?: string;
  lightMode?: boolean;
}

/**
 * Just the 4 Pillars brand mark: The crescent circular arc containing the 
 * 4 rising 3D developer pillars. Fits perfectly in the compact Navbar.
 */
export function LogoSymbol({ className = "w-10 h-10", lightMode = false }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 300 200" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer brand crescent swoosh in deep royal blue */}
      <path 
        d="M 60,175 A 100,100 0 1,1 240,175" 
        stroke={"#003B72"} 
        strokeWidth="11" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Trademark TM notation */}
      <text 
        x="242" 
        y="58" 
        fontSize="11" 
        fontFamily="sans-serif" 
        fontWeight="bold" 
        fill={"#003B72"}
      >
        TM
      </text>

      {/* The 4 Progressive 3D Pillars */}
      {/* Pillar 1 (Leftmost / lowest) */}
      <polygon points="108,175 108,136 123,124 123,175" fill={"#1f73b8"} />
      <polygon points="123,124 130,131 130,175 123,175" fill={"#023466"} />
      {/* White window slit accents typical of premium design details */}
      <line x1="113" y1="145" x2="118" y2="141" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="113" y1="155" x2="118" y2="151" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="113" y1="165" x2="118" y2="161" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

      {/* Pillar 2 */}
      <polygon points="133,175 133,111 148,99 148,175" fill={"#1f73b8"} />
      <polygon points="148,99 155,106 155,175 148,175" fill={"#023466"} />
      <line x1="138" y1="120" x2="143" y2="116" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="138" y1="130" x2="143" y2="126" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="138" y1="140" x2="143" y2="136" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="138" y1="150" x2="143" y2="146" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

      {/* Pillar 3 */}
      <polygon points="158,175 158,86 173,74 173,175" fill={"#1f73b8"} />
      <polygon points="173,74 180,81 180,175 173,175" fill={"#023466"} />
      <line x1="163" y1="95" x2="168" y2="91" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="163" y1="105" x2="168" y2="101" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="163" y1="115" x2="168" y2="111" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="163" y1="125" x2="168" y2="121" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="163" y1="135" x2="168" y2="131" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

      {/* Pillar 4 (Tallest / rightmost) */}
      <polygon points="183,175 183,61 198,49 198,175" fill={"#1f73b8"} />
      <polygon points="198,49 205,56 205,175 198,175" fill={"#023466"} />
      <line x1="188" y1="70" x2="193" y2="66" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="188" y1="80" x2="193" y2="76" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="188" y1="90" x2="193" y2="86" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="188" y1="100" x2="193" y2="96" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="188" y1="110" x2="193" y2="106" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="188" y1="120" x2="193" y2="116" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Full Authentic Logo of 4 Pillars Realty including the Circular Symbol, 
 * Text "4 PILLARS", Subtext "REALTY" flanked by geometric vectors, and 
 * the slogan text: "We turn Dreams... Into Reality" in red cursive.
 */
export function LogoFull({ className = "w-full max-w-[280px]", lightMode = false }: LogoProps) {
  const brandBlue = lightMode ? "#003B72" : "#3b82f6";
  const elementBlue = lightMode ? "#1f73b8" : "#60a5fa";
  const darkBlue = lightMode ? "#023466" : "#1e3a8a";
  const sloganRed = "#DC2626"; // Vibrant Red matching user asset

  return (
    <svg 
      viewBox="0 0 320 310" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. Upper Symbol Area */}
      <g transform="translate(10, 5)">
        {/* Exterior Circular Arc */}
        <path 
          d="M 60,175 A 100,100 0 1,1 240,175" 
          stroke={brandBlue} 
          strokeWidth="11" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Trademark badge */}
        <text 
          x="242" 
          y="58" 
          fontSize="11" 
          fontFamily="Inter, system-ui, sans-serif" 
          fontWeight="bold" 
          fill={brandBlue}
        >
          TM
        </text>

        {/* Pillar 1 */}
        <polygon points="108,175 108,136 123,124 123,175" fill={"#1f73b8"} />
        <polygon points="123,124 130,131 130,175 123,175" fill={"#023466"} />
        <line x1="113" y1="145" x2="118" y2="141" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="113" y1="155" x2="118" y2="151" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="113" y1="165" x2="118" y2="161" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

        {/* Pillar 2 */}
        <polygon points="133,175 133,111 148,99 148,175" fill={"#1f73b8"} />
        <polygon points="148,99 155,106 155,175 148,175" fill={"#023466"} />
        <line x1="138" y1="120" x2="143" y2="116" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="138" y1="130" x2="143" y2="126" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="138" y1="140" x2="143" y2="136" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="138" y1="150" x2="143" y2="146" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

        {/* Pillar 3 */}
        <polygon points="158,175 158,86 173,74 173,175" fill={"#1f73b8"} />
        <polygon points="173,74 180,81 180,175 173,175" fill={"#023466"} />
        <line x1="163" y1="95" x2="168" y2="91" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="163" y1="105" x2="168" y2="101" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="163" y1="115" x2="168" y2="111" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="163" y1="125" x2="168" y2="121" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="163" y1="135" x2="168" y2="131" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

        {/* Pillar 4 */}
        <polygon points="183,175 183,61 198,49 198,175" fill={"#1f73b8"} />
        <polygon points="198,49 205,56 205,175 198,175" fill={"#023466"} />
        <line x1="188" y1="70" x2="193" y2="66" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="188" y1="80" x2="193" y2="76" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="188" y1="90" x2="193" y2="86" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="188" y1="100" x2="193" y2="96" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="188" y1="110" x2="193" y2="106" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="188" y1="120" x2="193" y2="116" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* 2. Brand Horizontal Base Divider */}
      <line 
        x1="16" 
        y1="194" 
        x2="304" 
        y2="194" 
        stroke={brandBlue} 
        strokeWidth="4" 
        strokeLinecap="round"
      />

      {/* 3. Text Name "4 PILLARS" */}
      <text 
        x="160" 
        y="228" 
        textAnchor="middle" 
        fill={brandBlue} 
        fontSize="30" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="850" 
        letterSpacing="1.2"
      >
        4 PILLARS
      </text>

      {/* 4. Subtext Grid "REALTY" with Flanking Accent Bars */}
      <line x1="18" y1="246" x2="78" y2="246" stroke={brandBlue} strokeWidth="2.5" />
      <text 
        x="160" 
        y="253" 
        textAnchor="middle" 
        fill={"#1a67a4"} 
        fontSize="17" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="700" 
        letterSpacing="6.5"
      >
        REALTY
      </text>
      <line x1="242" y1="246" x2="302" y2="246" stroke={brandBlue} strokeWidth="2.5" />

      {/* 5. Cursive Script Tagline "We turn Dreams... Into Reality" */}
      <text 
        x="160" 
        y="288" 
        textAnchor="middle" 
        fill={sloganRed} 
        fontSize="15" 
        fontFamily="'Brush Script MT', cursive, Cambria, Georgia, serif" 
        fontWeight="bold" 
        fontStyle="italic"
        letterSpacing="0.2"
      >
        We turn Dreams... Into Reality
      </text>
    </svg>
  );
}
