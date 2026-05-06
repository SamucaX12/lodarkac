import React from 'react'

export default function MetricsPage() {
  const days = [
    { date: '01/05', total: 196, turns: { mad: 59, man: '06', tar: 45, noi: 86 } },
    { date: '02/05', total: 222, turns: { mad: 70, man: 12, tar: 68, noi: 72 } },
    { date: '03/05', total: 226, turns: { mad: 58, man: 24, tar: 60, noi: 84 } },
    { date: '04/05', total: 185, turns: { mad: 38, man: 11, tar: 50, noi: 85 } },
    { date: '05/05', total: 170, turns: { mad: 43, man: 11, tar: 45, noi: 71 } },
  ]

  return (
    <div className="container">
      <header>
        <div className="logo_section">
          <img 
            src="https://i.postimg.cc/j5JD1mcX/120bc63444dd8651b8fb0a7da238a4e5.webp" 
            alt="Lodark Logo" 
          />
          <h1>Lodark SS Intelligence</h1>
        </div>
        <div className="header_meta" style={{ textAlign: 'right', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
          <div style={{ letterSpacing: '0.2em' }}>STATUS: OPERATIONAL</div>
          <div style={{ marginTop: '5px' }}>v2.4.0 — SS METRICS</div>
        </div>
      </header>

      <section className="stats_overview">
        <div className="stat_card">
          <h3>Total Calls</h3>
          <div className="value">999</div>
        </div>
        <div className="stat_card">
          <h3>Detections</h3>
          <div className="value">76</div>
        </div>
        <div className="stat_card">
          <h3>Operators</h3>
          <div className="value">18</div>
        </div>
      </section>

      <div className="metrics_grid">
        <main>
          {days.map((day) => (
            <div className="day_card" key={day.date}>
              <div className="day_header">
                <h2>{day.date} — DAILY REPORT</h2>
                <span style={{ fontSize: '0.65rem', color: 'var(--accent-blue)', fontWeight: 600 }}>{day.total} CALLS</span>
              </div>
              <div className="turnos_grid">
                <div className="turno_box">
                  <div className="label">Madrugada</div>
                  <div className="val">{day.turns.mad}</div>
                </div>
                <div className="turno_box">
                  <div className="label">Manhã</div>
                  <div className="val">{day.turns.man}</div>
                </div>
                <div className="turno_box">
                  <div className="label">Tarde</div>
                  <div className="val">{day.turns.tar}</div>
                </div>
                <div className="turno_box">
                  <div className="label">Noite</div>
                  <div className="val">{day.turns.noi}</div>
                </div>
              </div>
            </div>
          ))}
        </main>

        <aside className="efficiency_panel">
          <div className="efficiency_card">
            <h3 style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '30px', letterSpacing: '0.1em' }}>EFFICIENCY RATE</h3>
            <div className="circle_chart">
              <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="90" cy="90" r="85" stroke="rgba(255,255,255,0.03)" strokeWidth="2" fill="none" />
                <circle
                  cx="90"
                  cy="90"
                  r="85"
                  stroke="var(--accent-blue)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="534"
                  strokeDashoffset="440"
                  strokeLinecap="round"
                />
              </svg>
              <div
                className="percentage"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                8.2%
              </div>
            </div>

            <div className="staffing_info">
              <div className="staff_row">
                <span>MOBILE STAFF</span>
                <span>12 UNIT</span>
              </div>
              <div className="staff_row">
                <span>EMULATOR STAFF</span>
                <span>06 UNIT</span>
              </div>
              <div className="staff_row" style={{ marginTop: '30px', border: 'none', color: 'var(--danger)' }}>
                <span>OPERATIONAL OVERLOAD</span>
              </div>
              <p style={{ fontSize: '0.7rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginTop: '10px' }}>
                Current demand exceeds team capacity. Expansion recommended.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <section className="recommendations_section">
        <h2>Recomendações e Plano de Ação</h2>
        <div className="rec_grid">
          <div className="rec_card">
            <div className="icon">👤+</div>
            <h3>Recrutamento</h3>
            <p>
              Expandir a equipe de 18 membros para suportar as filas do Emulador que estão represadas.
            </p>
          </div>

          <div className="rec_card">
            <div className="icon">🕒</div>
            <h3>Remanejamento</h3>
            <p>
              Realocar analistas do turno da manhã para Noite e Tarde, onde o volume é crítico.
            </p>
          </div>

          <div className="rec_card">
            <div className="icon">⏳</div>
            <h3>Otimização</h3>
            <p>
              Implementar critérios rígidos de pré-telagem para focar nos casos com alta chance de resultado.
            </p>
          </div>
        </div>
      </section>

      <footer>LODARK DIR SS SYSTEM — INTERNAL REPORT</footer>
    </div>

  )
}
