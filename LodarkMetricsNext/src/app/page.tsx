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
          <img src="https://i.postimg.cc/j5JD1mcX/120bc63444dd8651b8fb0a7da238a4e5.webp" alt="Lodark" />
          <h1>Lodark SS Intelligence</h1>
        </div>
      </header>

      <section className="stats_overview">
        <div className="stat_card">
          <h3>TOTAL CALLS</h3>
          <div className="value">999</div>
        </div>
        <div className="stat_card">
          <h3>DETECTIONS</h3>
          <div className="value">76</div>
        </div>
        <div className="stat_card">
          <h3>OPERATORS</h3>
          <div className="value">18</div>
        </div>
      </section>

      <div className="metrics_grid">
        <main>
          {days.map((day) => (
            <div className="day_card" key={day.date}>
              <div className="day_header">
                <h2>{day.date} — DAILY REPORT</h2>
              </div>
              <div className="turnos_grid">
                <div className="turno_box">
                  <div className="label">MADRUGADA</div>
                  <div className="val">{day.turns.mad}</div>
                </div>
                <div className="turno_box">
                  <div className="label">MANHÃ</div>
                  <div className="val">{day.turns.man}</div>
                </div>
                <div className="turno_box">
                  <div className="label">TARDE</div>
                  <div className="val">{day.turns.tar}</div>
                </div>
                <div className="turno_box">
                  <div className="label">NOITE</div>
                  <div className="val">{day.turns.noi}</div>
                </div>
              </div>
            </div>
          ))}
        </main>

        <aside className="efficiency_panel">
          <div className="circle_chart">
            <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="75" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
              <circle
                cx="80"
                cy="80"
                r="75"
                stroke="#60a5fa"
                strokeWidth="1"
                fill="none"
                strokeDasharray="471"
                strokeDashoffset="400"
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
            <div className="staff_row" style={{ marginTop: '40px', border: 'none', color: '#ef4444' }}>
              <span>OPERATIONAL OVERLOAD DETECTED</span>
            </div>
            <p style={{ fontSize: '0.7rem', lineHeight: '1.8', color: '#64748b', marginTop: '10px' }}>
              Current demand of 200+ daily calls exceeds the logistical limit of the 18-member team. Expansion is
              required to maintain forensic integrity.
            </p>
          </div>
        </aside>
      </div>

      <section className="recommendations_section">
        <h2>Recomendações e Plano de Ação</h2>
        <div className="rec_grid">
          <div className="rec_card">
            <div className="icon">👤+</div>
            <h3>Recrutamento Imediato</h3>
            <p>
              É vital expandir a equipe atual de 18 membros. Precisamos alocar urgentemente novos Screen Sharers,
              especificamente para suportar as filas do Emulador que estão represadas, e fortalecer a base Mobile.
            </p>
          </div>

          <div className="rec_card">
            <div className="icon">🕒</div>
            <h3>Remanejamento de Escala</h3>
            <p>
              O turno da manhã concentra menos de 10% da demanda. Analistas deste período devem ser realocados
              emergencialmente para os turnos da Noite e Tarde, onde a crise de volume acontece.
            </p>
          </div>

          <div className="rec_card">
            <div className="icon">⏳</div>
            <h3>Otimização de Triagem</h3>
            <p>
              Implementar critérios mais rígidos de pré-telagem para descartar denúncias infundadas antes que cheguem
              aos analistas, reduzindo o volume "lixo" diário e focando nos casos com alta chance de resultado (bans).
            </p>
          </div>
        </div>
      </section>

      <footer>LODARK DIR SS SYSTEM — INTERNAL REPORT</footer>
    </div>
  )
}
