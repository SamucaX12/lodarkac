import React from 'react'

export default function MetricsPage() {
  const days = [
    { 
        date: '02/05', 
        total: 222, 
        status: 'Volume Alto',
        statusColor: 'var(--accent-cyan)',
        chartColor: 'conic-gradient(var(--accent-cyan) 80%, #1e293b 0)',
        bans: 11,
        load: '12.3 telas',
        turns: [
            { name: 'Madrugada', icon: 'fa-moon', mob: 47, emu: 23, total: 70 },
            { name: 'Manhã', icon: 'fa-sun', mob: 7, emu: 5, total: 12 },
            { name: 'Tarde', icon: 'fa-cloud-sun', mob: 46, emu: 22, total: 68 },
            { name: 'Noite', icon: 'fa-stars', mob: 46, emu: 26, total: 72, highlight: true },
        ]
    },
    { 
        date: '03/05', 
        total: 226, 
        status: 'Crítico',
        statusColor: 'var(--accent-red)',
        chartColor: 'conic-gradient(var(--accent-red) 85%, #1e293b 0)',
        bans: 11,
        load: '12.5 telas',
        turns: [
            { name: 'Madrugada', icon: 'fa-moon', mob: 32, emu: 26, total: 58 },
            { name: 'Manhã', icon: 'fa-sun', mob: 18, emu: 6, total: 24 },
            { name: 'Tarde', icon: 'fa-cloud-sun', mob: 38, emu: 22, total: 60 },
            { name: 'Noite', icon: 'fa-stars', mob: 53, emu: 31, total: 84, highlight: true },
        ]
    },
    { 
        date: '04/05', 
        total: 185, 
        status: 'Eficiente',
        statusColor: 'var(--accent-green)',
        chartColor: 'conic-gradient(var(--accent-green) 70%, #1e293b 0)',
        bans: 22,
        load: '10.2 telas',
        turns: [
            { name: 'Madrugada', icon: 'fa-moon', mob: 20, emu: 18, total: 38 },
            { name: 'Manhã', icon: 'fa-sun', mob: 10, emu: 1, total: 11 },
            { name: 'Tarde', icon: 'fa-cloud-sun', mob: 36, emu: 14, total: 50 },
            { name: 'Noite', icon: 'fa-stars', mob: 54, emu: 31, total: 85, highlight: true },
        ]
    },
  ]

  return (
    <div className="app_container">
      <div className="glow-bg"></div>

      {/* Navbar */}
      <nav>
        <div className="nav_container">
          <div className="logo_wrap">
            <div className="logo_box">
              <img src="https://i.postimg.cc/j5JD1mcX/120bc63444dd8651b8fb0a7da238a4e5.webp" alt="Lodark Logo" />
            </div>
            <div className="nav_title">
              <h1>LODARK <span>ANALYTICS</span></h1>
              <div className="status_indicator">
                <span className="dot"></span>
                <span className="status_text">Sistema de Auditoria Ao Vivo</span>
              </div>
            </div>
          </div>
          <div className="hidden_md" style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, color: 'white', borderBottom: '2px solid var(--accent-yellow)', paddingBottom: '4px' }}>VISÃO GERAL</span>
            <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--text-slate-400)' }}>RELATÓRIOS</span>
            <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--text-slate-400)' }}>EQUIPE</span>
          </div>
        </div>
      </nav>

      <main>
        {/* Header Section */}
        <header className="header_section">
          <div className="intro_text">
            <h2>Análise de Demanda de <span className="gradient_text">Telagem.</span></h2>
            <p>
              Este dashboard apresenta os dados oficiais extraídos do Bot de solicitações da Staff. 
              O objetivo principal é mapear a <strong>carga de trabalho dos verificadores (Screenshare - SS)</strong> 
              segmentada por turnos e plataformas, evidenciando o atual gargalo operacional.
            </p>
          </div>

          {/* Alert Banner */}
          <div className="alert_banner">
            <div className="alert_content">
              <div className="alert_icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="alert_info">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <h3>Alerta de Sobrecarga</h3>
                  <span className="badge_critical">Crítico</span>
                </div>
                <p>
                  A quantidade de solicitações de análise ultrapassou a capacidade da equipe atual. 
                  A média exigida por membro do time SS está 40% acima do limite sustentável.
                </p>
                <div className="alert_action">
                  Ação Requerida: Expansão Imediata de Staff
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* KPI Grid */}
        <section className="kpi_grid">
          <div className="glass-card kpi_card">
            <div style={{ position: 'absolute', top: '-2.5rem', right: '-2.5rem', width: '8rem', height: '8rem', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '50%', filter: 'blur(32px)' }}></div>
            <h4>Volume Total (3 Dias)</h4>
            <div className="kpi_value_wrap">
              <span className="kpi_value">633</span>
              <span className="kpi_unit" style={{ color: 'var(--accent-cyan)' }}>Chamados</span>
            </div>
            <div className="kpi_footer">
              <i className="fas fa-chart-line" style={{ marginRight: '4px', color: 'var(--accent-cyan)' }}></i> 
              Média de <strong>211 solicitações/dia</strong>
            </div>
          </div>

          <div className="glass-card kpi_card" style={{ borderTop: '2px solid var(--accent-purple)' }}>
            <div style={{ position: 'absolute', top: '-2.5rem', right: '-2.5rem', width: '8rem', height: '8rem', background: 'rgba(168, 85, 247, 0.05)', borderRadius: '50%', filter: 'blur(32px)' }}></div>
            <h4>Eficácia Operacional</h4>
            <div className="kpi_value_wrap">
              <span className="kpi_value" style={{ color: 'var(--accent-purple)' }}>44</span>
              <span className="kpi_unit" style={{ color: 'var(--accent-purple)', opacity: 0.8 }}>Punições (Bans)</span>
            </div>
            <div className="kpi_footer">
              <i className="fas fa-crosshairs" style={{ marginRight: '4px', color: 'var(--accent-purple)' }}></i> 
              Taxa de conversão de suspeita em banimento
            </div>
          </div>

          <div className="glass-card kpi_card" style={{ borderTop: '2px solid var(--accent-yellow)' }}>
            <div style={{ position: 'absolute', top: '-2.5rem', right: '-2.5rem', width: '8rem', height: '8rem', background: 'rgba(245, 184, 0, 0.05)', borderRadius: '50%', filter: 'blur(32px)' }}></div>
            <h4>Capacidade de Equipe</h4>
            <div className="kpi_value_wrap">
              <span className="kpi_value" style={{ color: 'var(--accent-yellow)' }}>18</span>
              <span className="kpi_unit" style={{ color: 'var(--accent-yellow)', opacity: 0.8 }}>Staffs Ativos</span>
            </div>
            <div className="kpi_footer" style={{ display: 'flex', gap: '1rem' }}>
              <span><i className="fas fa-mobile-alt"></i> 12 Mobiles</span>
              <span><i className="fas fa-desktop"></i> 6 Emuladores</span>
            </div>
          </div>
        </section>

        {/* Reports Section */}
        <section>
          <div className="section_header">
            <div>
              <h3>Relatórios Diários de Operação</h3>
              <p>Detalhamento da carga de trabalho por turno e plataforma solicitada.</p>
            </div>
            <div style={{ background: '#0f172a', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: 900, color: 'var(--text-slate-400)', border: '1px solid #1e293b', marginTop: '1rem' }}>
              HISTÓRICO RECENTE
            </div>
          </div>

          <div className="report_grid">
            {days.map((day) => (
              <div className="glass-card report_card" key={day.date} style={day.status === 'Crítico' ? { borderColor: 'rgba(239, 68, 68, 0.3)' } : {}}>
                {day.status === 'Crítico' && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(to right, #dc2626, #f87171)', borderRadius: '1rem 1rem 0 0' }}></div>}
                
                <div className="report_top" style={day.status === 'Crítico' ? { marginTop: '8px' } : {}}>
                  <div>
                    <div className="report_label">Histórico</div>
                    <div className="report_date">DIA {day.date}</div>
                  </div>
                  <span className="status_badge" style={{ background: `${day.statusColor}20`, color: day.statusColor, borderColor: `${day.statusColor}30` }}>
                    {day.status}
                  </span>
                </div>

                <div className="chart_summary" style={day.status === 'Crítico' ? { background: 'rgba(69, 10, 10, 0.2)', borderColor: 'rgba(136, 19, 55, 0.3)' } : {}}>
                  <div className="chart-circle" style={{ background: day.chartColor }}>
                    <div className="chart-inner">
                      <span className="chart_val" style={day.status === 'Crítico' ? { color: 'var(--accent-red)' } : {}}>{day.total}</span>
                      <span className="chart_label">CHAMADOS</span>
                    </div>
                  </div>
                  <div className="chart_info">
                    <div className="info_row">
                      <span style={{ color: 'var(--text-slate-400)' }}>Bans Confirmados</span>
                      <span style={{ fontWeight: 900, color: day.statusColor }}>{day.bans}</span>
                    </div>
                    <div className="info_row">
                      <span style={{ color: 'var(--text-slate-400)' }}>Carga por SS</span>
                      <span style={{ fontWeight: 900, color: day.status === 'Crítico' ? 'var(--accent-red)' : 'white' }}>{day.load}</span>
                    </div>
                  </div>
                </div>

                <div className="shift_list">
                  {day.turns.map((turn) => (
                    <div className={`shift_item ${turn.highlight ? 'highlight' : ''}`} key={turn.name} style={turn.highlight ? { background: `${day.statusColor}15`, border: `1px solid ${day.statusColor}30` } : {}}>
                      <div className="shift_name" style={turn.highlight ? { color: day.statusColor } : {}}>
                        <i className={`fas ${turn.icon}`} style={{ width: '1rem' }}></i>
                        {turn.name}
                      </div>
                      <div className="shift_platforms">
                        <span>📱 {turn.mob}</span>
                        <span>💻 {turn.emu}</span>
                      </div>
                      <div className="shift_total" style={turn.highlight ? { color: day.statusColor } : {}}>{turn.total}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Insights Section */}
        <section className="rec_section">
          <div className="glass-card rec_card" style={{ borderLeft: '4px solid var(--accent-yellow)', background: 'linear-gradient(to right, rgba(245, 184, 0, 0.05), transparent)' }}>
            <div className="rec_icon" style={{ background: 'rgba(245, 184, 0, 0.1)', color: 'var(--accent-yellow)' }}>
              <i className="fas fa-users-cog"></i>
            </div>
            <div className="rec_info">
              <h3>Expansão de Equipe Necessária</h3>
              <p>
                As métricas comprovam que os turnos da <strong>Noite e Madrugada</strong> concentram a maior carga operacional. 
                Manter a precisão com o número atual de staffs nestes horários é inviável estruturalmente.
              </p>
            </div>
          </div>

          <div className="glass-card rec_card" style={{ borderLeft: '4px solid var(--accent-cyan)', background: 'linear-gradient(to right, rgba(6, 182, 212, 0.05), transparent)' }}>
            <div className="rec_icon" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)' }}>
              <i className="fas fa-chart-area"></i>
            </div>
            <div className="rec_info">
              <h3>Padrão de Picos de Solicitação</h3>
              <p>
                O período noturno registra consistentemente volumes acima de <strong>80 chamados</strong>. 
                Este é o nosso "ponto de saturação". A equipe da noite precisa ser no mínimo 30% maior que os turnos diurnos.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer_text">
          <i className="fas fa-shield-alt" style={{ marginRight: '4px' }}></i> Lodark SS Analytics v2.8
        </div>
        <div className="footer_text">
          Métricas de Sistema Automatizadas
        </div>
      </footer>
    </div>
  )
}


  )
}
