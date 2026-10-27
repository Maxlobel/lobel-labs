import type { Fieldnote, FieldnoteMotif } from "@/data/fieldnotes";

function CoverGraphic({ motif }: { motif: FieldnoteMotif }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2 };
  switch (motif) {
    case "housing":
      return (
        <svg viewBox="0 0 520 280" aria-hidden="true">
          <g className="fn-art-muted" stroke="currentColor" strokeWidth="1">
            {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${44 + i * 54} 32 V246`} />)}
            {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M32 ${42 + i * 48} H488`} />)}
          </g>
          <g className="fn-art-soft" fill="currentColor">
            <rect x="62" y="158" width="36" height="78" />
            <rect x="112" y="115" width="38" height="121" />
            <rect x="166" y="140" width="38" height="96" />
            <rect x="222" y="83" width="38" height="153" />
            <rect x="278" y="102" width="38" height="134" />
            <rect x="334" y="56" width="38" height="180" />
            <rect x="391" y="91" width="38" height="145" />
          </g>
          <path d="M78 162 L131 142 L185 157 L241 112 L297 132 L353 88 L411 103" {...common} strokeWidth="4" />
          {[ [78,162],[131,142],[185,157],[241,112],[297,132],[353,88],[411,103] ].map(([x,y], i) => <circle key={i} cx={x} cy={y} r="5" fill="currentColor" />)}
          <path d="M353 35 V78 M343 45 L353 35 L363 45" {...common} />
        </svg>
      );
    case "golf":
      return (
        <svg viewBox="0 0 520 280" aria-hidden="true">
          <g className="fn-art-muted" {...common}>
            <ellipse cx="270" cy="228" rx="188" ry="38" />
            <ellipse cx="270" cy="228" rx="114" ry="22" />
            <path d="M58 238 H462 M260 34 V248" strokeDasharray="4 10" />
          </g>
          <path d="M56 222 C130 174 170 55 270 53 C365 50 397 148 448 221" {...common} strokeWidth="4" strokeDasharray="9 9" />
          <circle cx="270" cy="53" r="13" fill="currentColor" />
          <circle cx="270" cy="53" r="23" {...common} className="fn-art-soft" />
          <path d="M448 200 V245 M437 212 L448 200 L459 212" {...common} />
          <g className="fn-art-soft" fill="currentColor"><circle cx="56" cy="222" r="6"/><circle cx="448" cy="221" r="6"/></g>
        </svg>
      );
    case "network":
      return (
        <svg viewBox="0 0 520 280" aria-hidden="true">
          <g {...common} className="fn-art-soft">
            <path d="M71 137 H175 L244 66 H354" />
            <path d="M175 137 L251 180 H360" />
            <path d="M244 66 V180" strokeDasharray="5 8" />
            <path d="M354 66 L432 119 L360 180" />
            <path d="M251 180 L329 231 H442" />
          </g>
          {[[71,137],[175,137],[244,66],[354,66],[251,180],[360,180],[432,119],[329,231],[442,231]].map(([x,y], i) => <circle key={i} cx={x} cy={y} r={i === 1 || i === 4 ? 12 : 7} fill="currentColor"/>)}
          <g {...common}><circle cx="175" cy="137" r="23" strokeDasharray="4 5"/><circle cx="251" cy="180" r="23"/></g>
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 520 280" aria-hidden="true">
          <g className="fn-art-muted" {...common}><path d="M50 28 V244 H479" /><path d="M50 78 H479 M50 132 H479 M50 186 H479" strokeDasharray="4 10"/></g>
          <g className="fn-art-soft" fill="currentColor">
            <rect x="88" y="164" width="37" height="80" /><rect x="146" y="126" width="37" height="118"/><rect x="204" y="143" width="37" height="101" />
            <rect x="262" y="88" width="37" height="156"/><rect x="320" y="106" width="37" height="138"/><rect x="378" y="54" width="37" height="190" />
          </g>
          <path d="M108 149 L164 138 L223 113 L281 125 L339 83 L397 54" {...common} strokeWidth="4" />
          <circle cx="397" cy="54" r="10" fill="currentColor"/><circle cx="397" cy="54" r="22" {...common}/>
        </svg>
      );
    case "football":
      return (
        <svg viewBox="0 0 520 280" aria-hidden="true">
          <g className="fn-art-muted" {...common}><path d="M53 48 H466 M53 98 H466 M53 148 H466 M53 198 H466 M53 248 H466" strokeDasharray="4 8"/></g>
          <g {...common} strokeWidth="3">
            <path d="M71 216 L136 182 L202 190 L268 112 L334 126 L401 64 L453 83" />
            <path className="fn-art-soft" d="M71 151 L136 161 L202 133 L268 158 L334 109 L401 128 L453 112" strokeDasharray="7 8" />
          </g>
          {[ [71,216],[136,182],[202,190],[268,112],[334,126],[401,64],[453,83] ].map(([x,y], i) => <g key={i}><circle cx={x} cy={y} r="8" fill="currentColor"/><text x={x} y="258" textAnchor="middle" className="fn-svg-label">{i + 1}</text></g>)}
          <circle cx="401" cy="64" r="24" {...common} strokeDasharray="4 6" />
        </svg>
      );
    case "map":
      return (
        <svg viewBox="0 0 520 280" aria-hidden="true">
          <g className="fn-art-soft" {...common}>
            <path d="M35 58 L124 27 L223 49 L282 23 L450 76 L485 190 L385 258 L259 228 L138 255 L36 186 Z" />
            <path d="M124 27 L138 255 M223 49 L259 228 M282 23 L385 258 M35 58 L485 190 M36 186 L450 76" />
            <path d="M73 41 L430 242 M55 149 L410 42 M163 35 L340 246" strokeDasharray="6 9" />
          </g>
          <path d="M74 193 C126 167 139 115 190 129 S276 191 302 124 S397 76 446 99" {...common} strokeWidth="5" />
          {[[74,193],[190,129],[302,124],[446,99]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="7" fill="currentColor" /><circle cx={x} cy={y} r="16" {...common} className="fn-art-soft" /></g>)}
        </svg>
      );
  }
}

export default function FieldnotePoster({ note, wide = false }: { note: Fieldnote; wide?: boolean }) {
  const lines = note.coverTitle.split("\n");
  return (
    <div className={`fn-poster fn-poster-${note.motif} ${wide ? "fn-poster-wide" : ""}`}>
      <div className="fn-poster-grain" />
      <div className="fn-poster-top">
        <span>ML / FIELDNOTES</span>
        <span>STUDY {note.number}</span>
      </div>
      <div className="fn-poster-art"><CoverGraphic motif={note.motif} /></div>
      <div className="fn-poster-bottom">
        <p className="fn-cover-title">
          {lines.map((line, i) => <span className={i === lines.length - 1 ? "fn-title-last" : ""} key={line}>{line}</span>)}
        </p>
        <div className="fn-poster-rule" />
        <div className="fn-poster-foot"><span>{note.category.toUpperCase()} / VISUAL INQUIRY</span><span>MAX LOBEL</span></div>
      </div>
    </div>
  );
}
