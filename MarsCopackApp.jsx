import { useState } from "react";

// ─── Color Palette & Design Tokens ───────────────────────────────────────────
const colors = {
  marsBlueDark: "#1a1f5e",
  marsOrange: "#f5821f",
  sidebarActive: "#6c63ff",
  sidebarBg: "#ffffff",
  headerBg: "#ffffff",
  subHeaderBg: "#2d2d3a",
  contentBg: "#fdf9f0",
  tableBg: "#eef0fb",
  tableHeaderText: "#3b3fa8",
  borderColor: "#e0e0e0",
  textDark: "#1a1f5e",
  textGray: "#777",
  white: "#ffffff",
};

// ─── SVG Illustrations ────────────────────────────────────────────────────────
const FactoryIllustration = () => (
  <svg viewBox="0 0 500 320" style={{ width: "100%", maxWidth: 500 }}>
    {/* Background blob */}
    <ellipse cx="240" cy="230" rx="220" ry="90" fill="#dde8f7" opacity="0.5" />
    {/* Conveyor belt */}
    <rect x="100" y="230" width="300" height="18" rx="9" fill="#b0bfd8" />
    <circle cx="120" cy="239" r="12" fill="#8a9bbf" />
    <circle cx="380" cy="239" r="12" fill="#8a9bbf" />
    {/* Gear icons on belt */}
    {[155, 195, 235, 275, 315, 355].map((x, i) => (
      <g key={i} transform={`translate(${x},239)`}>
        <circle r="8" fill="#f5821f" opacity="0.8" />
        <circle r="4" fill="#fff" />
      </g>
    ))}
    {/* Boxes on belt */}
    {[130, 175, 220, 265, 310].map((x, i) => (
      <g key={i}>
        <rect x={x} y={205} width={28} height={24} rx="3" fill="#f5821f" opacity={0.75 + i * 0.04} />
        <line x1={x} y1={217} x2={x + 28} y2={217} stroke="#fff" strokeWidth="1" opacity="0.5" />
        <line x1={x + 14} y1={205} x2={x + 14} y2={229} stroke="#fff" strokeWidth="1" opacity="0.5" />
      </g>
    ))}
    {/* Machinery box left */}
    <rect x="50" y="140" width="85" height="90" rx="5" fill="#c8d5e8" />
    <rect x="58" y="150" width="30" height="20" rx="2" fill="#8a9bbf" />
    <rect x="58" y="178" width="65" height="8" rx="2" fill="#9bacc8" />
    <rect x="58" y="192" width="50" height="8" rx="2" fill="#9bacc8" />
    {/* Worker */}
    <circle cx="195" cy="140" r="14" fill="#f5821f" />
    <rect x="183" y="154" width="24" height="40" rx="5" fill="#f5821f" />
    <rect x="178" y="154" width="10" height="28" rx="4" fill="#f5821f" />
    <rect x="207" y="154" width="10" height="28" rx="4" fill="#f5821f" />
    <rect x="185" y="194" width="10" height="20" rx="4" fill="#2d3a6b" />
    <rect x="199" y="194" width="10" height="20" rx="4" fill="#2d3a6b" />
    {/* Hard hat */}
    <ellipse cx="195" cy="130" rx="17" ry="8" fill="#f5821f" />
    <rect x="180" y="128" width="30" height="5" rx="2" fill="#f5821f" />
    {/* Clipboard */}
    <rect x="205" y="163" width="16" height="20" rx="2" fill="#fff" />
    <line x1="208" y1="168" x2="218" y2="168" stroke="#aaa" strokeWidth="1.5" />
    <line x1="208" y1="173" x2="218" y2="173" stroke="#aaa" strokeWidth="1.5" />
    {/* Large machine center */}
    <rect x="270" y="120" width="60" height="110" rx="5" fill="#b8c8e0" />
    <rect x="280" y="130" width="20" height="30" rx="3" fill="#8a9bbf" />
    <circle cx="300" cy="185" r="12" fill="#f5821f" opacity="0.8" />
    <rect x="278" y="200" width="44" height="8" rx="2" fill="#9bacc8" />
    {/* Plant */}
    <rect x="80" y="215" width="6" height="20" fill="#5d8a5e" rx="3" />
    <ellipse cx="83" cy="210" rx="12" ry="9" fill="#5d8a5e" />
    <ellipse cx="75" cy="214" rx="8" ry="6" fill="#4a7a4b" />
  </svg>
);

const AnalysisIllustration = () => (
  <svg viewBox="0 0 400 320" style={{ width: "100%", maxWidth: 460 }}>
    {/* Background */}
    <ellipse cx="200" cy="200" rx="180" ry="110" fill="#e8ecf8" opacity="0.6" />
    {/* Report card */}
    <rect x="120" y="60" width="170" height="190" rx="10" fill="#fff" stroke="#c8d0ea" strokeWidth="1.5" />
    <rect x="135" y="80" width="100" height="8" rx="4" fill="#c8d0ea" />
    <rect x="135" y="96" width="80" height="8" rx="4" fill="#e0e4f0" />
    {/* Bar chart inside card */}
    {[110, 130, 95, 145, 120].map((h, i) => (
      <rect key={i} x={138 + i * 25} y={170 - h / 2.2} width="16" height={h / 2.2} rx="3"
        fill={i === 3 ? "#6c63ff" : "#b8c4ea"} />
    ))}
    <line x1="135" y1="170" x2="275" y2="170" stroke="#e0e4f0" strokeWidth="1" />
    {/* Line chart */}
    <polyline points="135,185 160,178 185,182 210,172 235,176 260,168 275,170"
      fill="none" stroke="#6c63ff" strokeWidth="2" />
    {/* Chat bubbles */}
    <rect x="60" y="75" width="50" height="30" rx="8" fill="#fff" stroke="#c8d0ea" strokeWidth="1.5" />
    <polygon points="75,105 85,105 80,113" fill="#fff" stroke="#c8d0ea" strokeWidth="1" />
    <circle cx="75" cy="89" r="5" fill="#e0e4f0" />
    <polyline points="71,96 80,96" stroke="#e0e4f0" strokeWidth="1.5" />

    <rect x="295" y="65" width="50" height="30" rx="8" fill="#fff" stroke="#c8d0ea" strokeWidth="1.5" />
    <polygon points="310,95 320,95 315,103" fill="#fff" stroke="#c8d0ea" strokeWidth="1" />
    <circle cx="320" cy="79" r="5" fill="#f5e6cc" />

    {/* Person 1 (with magnifying glass) */}
    <circle cx="115" cy="190" r="14" fill="#f5d9b0" />
    <rect x="103" y="204" width="24" height="42" rx="5" fill="#f5821f" />
    <rect x="96" y="205" width="11" height="30" rx="4" fill="#f5821f" />
    <rect x="117" y="205" width="11" height="30" rx="4" fill="#f5821f" />
    <rect x="105" y="246" width="10" height="22" rx="4" fill="#2d3a6b" />
    <rect x="119" y="246" width="10" height="22" rx="4" fill="#2d3a6b" />
    {/* Magnifying glass */}
    <circle cx="99" cy="200" r="11" fill="none" stroke="#2d3a6b" strokeWidth="2.5" />
    <line x1="107" y1="208" x2="115" y2="216" stroke="#2d3a6b" strokeWidth="2.5" />

    {/* Person 2 (with tablet) */}
    <circle cx="295" cy="188" r="14" fill="#c8a882" />
    <rect x="283" y="202" width="24" height="42" rx="5" fill="#2d3a6b" />
    <rect x="274" y="202" width="11" height="30" rx="4" fill="#2d3a6b" />
    <rect x="296" y="202" width="11" height="30" rx="4" fill="#2d3a6b" />
    <rect x="285" y="244" width="10" height="22" rx="4" fill="#2d3a6b" />
    <rect x="299" y="244" width="10" height="22" rx="4" fill="#2d3a6b" />
    {/* Tablet */}
    <rect x="300" y="208" width="22" height="28" rx="3" fill="#fff" stroke="#aaa" strokeWidth="1.5" />
    <rect x="303" y="212" width="16" height="12" rx="1" fill="#e8ecf8" />
  </svg>
);

// ─── Top Header ───────────────────────────────────────────────────────────────
const TopHeader = () => (
  <header style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 24px", height: 56, borderBottom: "1px solid #e8e8e8",
    background: colors.white, position: "sticky", top: 0, zIndex: 100,
  }}>
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
      <span style={{ fontWeight: 800, fontSize: 20, color: colors.marsBlueDark, letterSpacing: 1 }}>MARS</span>
      <span style={{ fontWeight: 500, fontSize: 13, color: colors.marsOrange }}>Snacking</span>
    </div>
    <div style={{ fontWeight: 700, fontSize: 17, color: colors.marsBlueDark }}>Operations Planning</div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 12, color: "#555" }}>
        <strong>Last Refresh:</strong> 11/17/2025
      </span>
      <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#555" }}>?</button>
      <div style={{
        width: 32, height: 32, borderRadius: "50%", background: "#e0e4f0",
        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </div>
  </header>
);

// ─── Sub Header ───────────────────────────────────────────────────────────────
const SubHeader = ({ title }) => (
  <div style={{
    background: colors.subHeaderBg, color: "#fff", textAlign: "center",
    padding: "10px 0", fontWeight: 600, fontSize: 15, letterSpacing: 0.5,
  }}>
    {title}
  </div>
);

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const navItems = [
  { label: "Master Data", icon: "🗄" },
  { label: "Master Data (Refined)", icon: "🗄" },
  { label: "MPS Report", icon: "📄" },
  { label: "BOM Master", icon: "📋" },
  { label: "BOM Master (Refined)", icon: "📋" },
  { label: "Donor Check", icon: "⊙" },
  { label: "Capacity Report", icon: "⊞" },
  { label: "MRP Report", icon: "🌐" },
  { label: "Copack Order Sheet", icon: "⌘" },
  { label: "PO Sheet", icon: "📖" },
  { label: "Daily Pipeline Position Report", icon: "📊" },
  { label: "Stock Coverage Report", icon: "⊘" },
];

const Sidebar = ({ active, onNavigate }) => (
  <nav style={{
    width: 228, minHeight: "100%", background: colors.white,
    borderRight: "1px solid #e8e8e8", paddingTop: 8,
  }}>
    {navItems.map((item) => {
      const isActive = active === item.label;
      return (
        <div
          key={item.label}
          onClick={() => onNavigate(item.label)}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "11px 18px", cursor: "pointer", fontSize: 13.5,
            background: isActive ? colors.sidebarActive : "transparent",
            color: isActive ? "#fff" : colors.textDark,
            borderRadius: isActive ? "6px" : "0",
            margin: isActive ? "2px 8px" : "0 0",
            fontWeight: isActive ? 600 : 400,
            transition: "all 0.15s",
          }}
        >
          <span style={{ fontSize: 15, opacity: 0.8 }}>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      );
    })}
  </nav>
);

// ─── Dropdown ────────────────────────────────────────────────────────────────
const Dropdown = ({ label, value, options, onChange, width = 140 }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", width }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "7px 12px", border: "1px solid #ccc", borderRadius: 5,
          background: "#fff", cursor: "pointer", fontSize: 13, userSelect: "none",
        }}
      >
        <span style={{ color: value ? colors.textDark : "#999" }}>{value || label}</span>
        <span style={{ fontSize: 10, color: "#999" }}>▼</span>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "110%", left: 0, width: "100%",
          background: "#fff", border: "1px solid #ddd", borderRadius: 5,
          zIndex: 200, boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}>
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                padding: "8px 12px", fontSize: 13, cursor: "pointer",
                color: colors.textDark,
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#f0f2ff"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Master Data Page ─────────────────────────────────────────────────────────
const masterDataRows = [
  { code: "10071863", desc: "CES TERRINE OF BFCHDILL 8* (3*100G)", cpp: 180, b1: 180, b2: 90, rule: 2, type: "Copack", rate: 574 },
  { code: "10061484", desc: "SNICKERS FUNSIZE COSTCO 12*1361G", cpp: 180, b1: 180, b2: 90, rule: 3, type: "Copack", rate: 215 },
  { code: "10086648", desc: "CESAR BEEF & CHEESE 24*100G", cpp: 180, b1: 180, b2: 90, rule: 2, type: "Copack", rate: 496 },
  { code: "10086649", desc: "CESAR BEEF & CHICKEN 24*100G", cpp: 180, b1: 180, b2: 90, rule: 2, type: "Copack", rate: 374 },
  { code: "10086651", desc: "CESAR BULGOGI 24*100G", cpp: 180, b1: 180, b2: 90, rule: 3, type: "Copack", rate: 319 },
  { code: "10086652", desc: "CESAR LAMB 24*100", cpp: 180, b1: 180, b2: 90, rule: 2, type: "Copack", rate: 268 },
];

const MasterDataPage = () => {
  const [codeTypeFilter, setCodeTypeFilter] = useState("All");
  const [copackFilter, setCopackFilter] = useState("All");
  const [donorFilter, setDonorFilter] = useState("All");
  const [usageFilter, setUsageFilter] = useState("All");
  const [selectedRow, setSelectedRow] = useState(null);

  const selected = selectedRow !== null ? masterDataRows[selectedRow] : null;

  return (
    <div style={{ padding: "20px 24px", background: colors.contentBg, minHeight: "100%" }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700, color: colors.textDark }}>Master Data</h2>

      {/* Filters */}
      <div style={{
        background: "#fff", borderRadius: 8, padding: "16px 20px",
        border: "1px solid #e8e8e8", marginBottom: 16,
      }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 4, fontWeight: 500 }}>Code Type</div>
            <Dropdown label="All" value={codeTypeFilter} options={["All", "Copack", "Standard"]} onChange={setCodeTypeFilter} width={130} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 4, fontWeight: 500 }}>Copack Code</div>
            <Dropdown label="All" value={copackFilter} options={["All", "10071863", "10061484", "10086648"]} onChange={setCopackFilter} width={130} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 4, fontWeight: 500 }}>Donor Code</div>
            <Dropdown label="All" value={donorFilter} options={["All", "D001", "D002", "D003"]} onChange={setDonorFilter} width={130} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 4, fontWeight: 500 }}>Usage Status</div>
            <Dropdown label="All" value={usageFilter} options={["All", "Active", "Inactive"]} onChange={setUsageFilter} width={130} />
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <button onClick={() => { setCodeTypeFilter("All"); setCopackFilter("All"); setDonorFilter("All"); setUsageFilter("All"); }}
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
                border: "1.5px solid #ccc", borderRadius: 6, background: "#fff",
                cursor: "pointer", fontSize: 13, color: "#555", fontWeight: 500,
              }}>
              ↻ Reset Filter
            </button>
            <button style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 18px",
              background: "#1a7a45", border: "none", borderRadius: 6,
              color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600,
            }}>
              ⊞ Download
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e8e8", overflow: "hidden", marginBottom: 16 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: colors.tableBg }}>
                <th style={{ width: 40, padding: "11px 12px" }}></th>
                {["Copack Code", "Copack Description", "Case per Pallet", "Batch Size 1", "Batch Size 2", "Rule", "Code Type", "Output Rate"].map(h => (
                  <th key={h} style={{
                    padding: "11px 12px", textAlign: "left", color: colors.tableHeaderText,
                    fontWeight: 700, fontSize: 12.5, whiteSpace: "nowrap",
                    borderBottom: "1px solid #dde0f0",
                  }}>
                    {h} ↕
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {masterDataRows.map((row, i) => (
                <tr key={i}
                  onClick={() => setSelectedRow(i === selectedRow ? null : i)}
                  style={{
                    background: selectedRow === i ? "#f0f2ff" : i % 2 === 0 ? "#fff" : "#fafafa",
                    cursor: "pointer", transition: "background 0.1s",
                  }}
                  onMouseEnter={e => { if (selectedRow !== i) e.currentTarget.style.background = "#f5f7ff"; }}
                  onMouseLeave={e => { if (selectedRow !== i) e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafafa"; }}
                >
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: "50%", border: "2px solid #aaa",
                      background: selectedRow === i ? colors.sidebarActive : "transparent",
                      margin: "auto", transition: "background 0.2s",
                    }} />
                  </td>
                  <td style={{ padding: "10px 12px", color: "#333" }}>{row.code}</td>
                  <td style={{ padding: "10px 12px", color: "#333" }}>{row.desc}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center", color: "#333" }}>{row.cpp}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center", color: "#333" }}>{row.b1}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center", color: "#333" }}>{row.b2}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center", color: "#333" }}>{row.rule}</td>
                  <td style={{ padding: "10px 12px", color: "#333" }}>{row.type}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center", color: "#333" }}>{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          padding: "10px 16px", borderTop: "1px solid #eee", gap: 10,
        }}>
          <button style={{
            padding: "5px 12px", borderRadius: 5, border: "1px solid #e0e0e0",
            background: "#fff", fontSize: 12, cursor: "pointer",
          }}>Show details</button>
          <span style={{ fontSize: 12, color: "#666" }}>
            Showing <strong>1–6</strong> of <strong>90</strong> items
          </span>
          {["«", "‹", "1", "2", "3", "›", "»"].map((p, i) => (
            <button key={i} style={{
              width: 28, height: 28, borderRadius: 4,
              border: p === "1" ? "none" : "1px solid #e0e0e0",
              background: p === "1" ? colors.sidebarActive : "#fff",
              color: p === "1" ? "#fff" : "#555",
              cursor: "pointer", fontSize: 13, fontWeight: p === "1" ? 700 : 400,
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Details Panel */}
      <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e8e8", padding: "20px 24px" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: colors.textDark }}>Copack Details</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 40px" }}>
          {[
            ["Copack Code", selected?.code, "Copack Description", selected?.desc],
            ["Case per Pallet", selected?.cpp, "Batch Size (B1)", selected?.b1],
            ["Batch Size (B2)", selected?.b2, "Copack Type", selected?.type],
            ["Output Rate", selected?.rate, "Type", ""],
            ["Safety Stock (weeks)", "", "Line", ""],
            ["Production Max, MOQ", "", "Lead Time (Days)", ""],
            ["Usage Status", "", "", ""],
          ].map(([l1, v1, l2, v2], i) => (
            <div key={i} style={{ display: "contents" }}>
              <div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>{l1}</div>
                <input readOnly value={v1 || ""} style={{
                  width: "100%", padding: "8px 12px", border: "1px solid #ddd",
                  borderRadius: 5, fontSize: 13, background: "#fafafa", color: "#333", boxSizing: "border-box",
                }} />
              </div>
              {l2 ? (
                <div>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>{l2}</div>
                  <input readOnly value={v2 || ""} style={{
                    width: "100%", padding: "8px 12px", border: "1px solid #ddd",
                    borderRadius: 5, fontSize: 13, background: "#fafafa", color: "#333", boxSizing: "border-box",
                  }} />
                </div>
              ) : <div />}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
          <button style={{
            padding: "8px 18px", border: "1px solid #ddd", borderRadius: 6,
            background: "#fff", cursor: "pointer", fontSize: 13, color: "#555",
          }}>BOM Data</button>
          <button style={{
            padding: "8px 18px", border: "none", borderRadius: 6,
            background: colors.sidebarActive, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600,
          }}>✏ Edit</button>
        </div>
      </div>
    </div>
  );
};

// ─── MPS Report Page ──────────────────────────────────────────────────────────
const MPSReportPage = () => {
  const [planNumber, setPlanNumber] = useState("");
  const [batchSize, setBatchSize] = useState("");

  return (
    <div style={{ padding: "20px 24px", background: colors.contentBg, minHeight: "100%" }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700, color: colors.textDark }}>MPS Report</h2>
      <div style={{ background: "#fff", borderRadius: 8, padding: "16px 20px", border: "1px solid #e8e8e8", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 4, fontWeight: 500 }}>Plan Number</div>
            <Dropdown label="Select" value={planNumber} options={["Plan-001", "Plan-002", "Plan-003"]} onChange={setPlanNumber} width={160} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 4, fontWeight: 500 }}>Batch Size</div>
            <Dropdown label="Select" value={batchSize} options={["90", "180", "360"]} onChange={setBatchSize} width={160} />
          </div>
          <button style={{
            padding: "8px 20px", background: colors.marsOrange, border: "none",
            borderRadius: 6, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13,
          }}>Run Copack Plan</button>
          <button onClick={() => { setPlanNumber(""); setBatchSize(""); }}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
              border: "1.5px solid #ccc", borderRadius: 6, background: "#fff",
              cursor: "pointer", fontSize: 13, color: "#555", fontWeight: 500,
            }}>
            ↻ Reset Filter
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 40 }}>
        <p style={{ color: "#999", fontSize: 15, marginBottom: 24 }}>Select Plan Number &amp; Batch Size to view report.</p>
        <AnalysisIllustration />
      </div>
    </div>
  );
};

// ─── Generic Placeholder Page ─────────────────────────────────────────────────
const PlaceholderPage = ({ title }) => (
  <div style={{ padding: "40px 24px", textAlign: "center", color: "#aaa", fontSize: 15 }}>
    <h2 style={{ color: colors.textDark }}>{title}</h2>
    <p>This section is under construction.</p>
  </div>
);

// ─── Dashboard Layout ─────────────────────────────────────────────────────────
const Dashboard = ({ onLogout }) => {
  const [activePage, setActivePage] = useState("Master Data");

  const renderPage = () => {
    if (activePage === "Master Data") return <MasterDataPage />;
    if (activePage === "MPS Report") return <MPSReportPage />;
    return <PlaceholderPage title={activePage} />;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      <TopHeader />
      <SubHeader title="Copack Planning" />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar active={activePage} onNavigate={setActivePage} />
        <main style={{ flex: 1, overflowY: "auto", background: colors.contentBg }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

// ─── Auth Pages ───────────────────────────────────────────────────────────────
const AuthLayout = ({ children }) => (
  <div style={{
    minHeight: "100vh", display: "flex", flexDirection: "column",
    fontFamily: "'Segoe UI', sans-serif", background: "#fff", position: "relative", overflow: "hidden",
  }}>
    {/* Top-right blob */}
    <svg style={{ position: "absolute", top: 0, right: 0, width: 200, height: 180, zIndex: 0 }} viewBox="0 0 200 180">
      <path d="M200,0 Q200,100 140,130 Q80,160 60,100 Q40,40 120,0 Z" fill="#f5d9b0" opacity="0.7" />
    </svg>
    {/* Bottom-left blob */}
    <svg style={{ position: "absolute", bottom: 0, left: 0, width: 100, height: 100, zIndex: 0 }} viewBox="0 0 100 100">
      <circle cx="0" cy="100" r="70" fill="#c8c4e8" opacity="0.4" />
    </svg>

    {/* Mars Logo */}
    <div style={{ padding: "18px 28px", position: "relative", zIndex: 1 }}>
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontWeight: 800, fontSize: 20, color: colors.marsBlueDark, letterSpacing: 1 }}>MARS</div>
        <div style={{ fontWeight: 500, fontSize: 13, color: colors.marsOrange }}>Snacking</div>
      </div>
    </div>

    <div style={{
      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", zIndex: 1, padding: "20px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 60, maxWidth: 1000, width: "100%" }}>
        {/* Left: headline + illustration */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: colors.marsBlueDark, marginBottom: 10 }}>
            Copacking Planning Tool
          </h1>
          <p style={{ color: "#666", fontSize: 15, marginBottom: 32, maxWidth: 440 }}>
            A unified Copacking planner to streamline demand, capacity, and production decisions.
          </p>
          <FactoryIllustration />
        </div>
        {/* Right: form card */}
        <div style={{ width: 360 }}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

const LoginPage = ({ onLogin, onGoRegister }) => {
  const [email] = useState("aakaash.pattanayak@effem.com");

  return (
    <AuthLayout>
      <div style={{
        background: "#fff", borderRadius: 14, padding: "36px 32px",
        boxShadow: "0 4px 30px rgba(0,0,0,0.09)", border: "1px solid #f0f0f0",
      }}>
        <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, color: colors.marsBlueDark, marginBottom: 24 }}>
          Login to your account
        </h2>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: "#777", textAlign: "center", marginBottom: 4 }}>Username</div>
          <div style={{ textAlign: "center", fontWeight: 600, fontSize: 14, color: colors.marsBlueDark }}>{email}</div>
        </div>
        <button
          onClick={onLogin}
          style={{
            width: "100%", padding: "13px", background: colors.marsOrange, color: "#fff",
            border: "none", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: "pointer",
            marginBottom: 18, letterSpacing: 0.5,
          }}>
          Log In
        </button>
        <p style={{ textAlign: "center", fontSize: 13, color: "#777", margin: 0 }}>
          Don't you have an account?{" "}
          <span onClick={onGoRegister} style={{ color: colors.marsOrange, cursor: "pointer", fontWeight: 600 }}>
            Register here
          </span>
        </p>
      </div>
    </AuthLayout>
  );
};

const RegisterPage = ({ onRegister, onGoLogin }) => {
  const [email, setEmail] = useState("aakaash.pattanayak@effem.com");
  const [role, setRole] = useState("Super User");

  return (
    <AuthLayout>
      <div style={{
        background: "#fff", borderRadius: 14, padding: "36px 32px",
        boxShadow: "0 4px 30px rgba(0,0,0,0.09)", border: "1px solid #f0f0f0",
      }}>
        <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, color: colors.marsBlueDark, marginBottom: 24 }}>
          Register your account
        </h2>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: "#555", marginBottom: 6, fontWeight: 500 }}>Email ID</div>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 7,
              fontSize: 13, color: "#333", boxSizing: "border-box", outline: "none",
            }}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: "#555", marginBottom: 10, fontWeight: 500 }}>Role</div>
          <div style={{ display: "flex", gap: 20 }}>
            {["Super User", "User"].map(r => (
              <label key={r} style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 13, color: "#333" }}>
                <div
                  onClick={() => setRole(r)}
                  style={{
                    width: 16, height: 16, borderRadius: "50%", border: `2px solid ${role === r ? colors.marsOrange : "#bbb"}`,
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}
                >
                  {role === r && <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors.marsOrange }} />}
                </div>
                {r}
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={onRegister}
          style={{
            width: "100%", padding: "13px", background: colors.marsOrange, color: "#fff",
            border: "none", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: "pointer",
            marginBottom: 18, letterSpacing: 0.5,
          }}>
          Register
        </button>
        <p style={{ textAlign: "center", fontSize: 13, color: "#777", margin: 0 }}>
          Already have an account?{" "}
          <span onClick={onGoLogin} style={{ color: colors.marsOrange, cursor: "pointer", fontWeight: 600 }}>
            Login
          </span>
        </p>
      </div>
    </AuthLayout>
  );
};

// ─── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("register"); // register | login | dashboard

  if (screen === "register") {
    return <RegisterPage onRegister={() => setScreen("login")} onGoLogin={() => setScreen("login")} />;
  }
  if (screen === "login") {
    return <LoginPage onLogin={() => setScreen("dashboard")} onGoRegister={() => setScreen("register")} />;
  }
  return <Dashboard onLogout={() => setScreen("register")} />;
}
