import { useState } from 'react'
import { isSupabaseConfigured, supabase } from './lib/supabase.js'

const navigation = [
  { id: 'inicio', label: 'Visão geral', icon: 'grid' },
  { id: 'clientes', label: 'Clientes', icon: 'users' },
  { id: 'servicos', label: 'Serviços', icon: 'wrench' },
  { id: 'relatorios', label: 'Relatórios', icon: 'chart' },
]

const footerNavigation = [
  { id: 'inicio', label: 'Início', icon: 'home' },
  { id: 'clientes', label: 'Cadastros', icon: 'users' },
  { id: 'relatorios', label: 'Atividade', icon: 'activity' },
]

function Icon({ name, size = 20 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    wrench: <><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L14 13l-3-3 3.7-3.7Z" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-5 5" /></>,
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" /></>,
    activity: <><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" /></>,
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name] || paths.grid}
    </svg>
  )
}

function App() {
  const [activePage, setActivePage] = useState('inicio')
  const [nome, setNome] = useState('')
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const activeItem = navigation.find((item) => item.id === activePage) || navigation[0]

  function navigate(page) {
    setActivePage(page)
    setMenuOpen(false)
    setFeedback(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const cleanName = nome.trim()

    if (!cleanName) {
      setFeedback({ type: 'error', text: 'Digite um nome antes de salvar.' })
      return
    }

    if (!isSupabaseConfigured) {
      setFeedback({ type: 'error', text: 'Configure as variáveis do Supabase para habilitar a gravação.' })
      return
    }

    setSaving(true)
    setFeedback(null)

    const { error } = await supabase.from('teste_nomes').insert({ nome: cleanName })

    if (error) {
      setFeedback({ type: 'error', text: error.message })
    } else {
      setFeedback({ type: 'success', text: 'Nome salvo no Supabase com sucesso.' })
      setNome('')
    }

    setSaving(false)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">C</div>
          <div className="brand-copy">
            <strong>conex<span>ao</span>tech</strong>
            <small>OFICINA DIGITAL</small>
          </div>
          <button className="icon-button mobile-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
            <Icon name="close" />
          </button>
        </div>

        <div className="workspace-label">MENU PRINCIPAL</div>
        <nav className="side-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <button key={item.id} className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => navigate(item.id)}>
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {activePage === item.id && <span className="active-indicator" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">?</div>
            <div><strong>Precisa de ajuda?</strong><span>Este é um ambiente de teste.</span></div>
          </div>
          <button className="profile-button" onClick={() => navigate('configuracoes')}>
            <div className="avatar">GT</div>
            <div className="profile-copy"><strong>Conexaotech</strong><span>Administrador</span></div>
            <Icon name="settings" size={18} />
          </button>
        </div>
      </aside>

      {menuOpen && <button className="mobile-backdrop" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}

      <div className="main-column">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
              <Icon name="menu" />
            </button>
            <div className="breadcrumb"><span>Painel</span><Icon name="chevron" size={14} /><strong>{activeItem.label}</strong></div>
          </div>
          <div className="topbar-right">
            <span className={`connection-pill ${isSupabaseConfigured ? 'connected' : 'disconnected'}`}>
              <span className="status-dot" />{isSupabaseConfigured ? 'Supabase configurado' : 'Aguardando Supabase'}
            </span>
            <button className="icon-button notification-button" aria-label="Notificações">
              <Icon name="bell" />
              <span className="notification-dot" />
            </button>
            <div className="top-avatar">GT</div>
          </div>
        </header>

        <main className="content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">AMBIENTE DE DESENVOLVIMENTO</div>
              <h1>{activePage === 'inicio' ? 'Visão geral' : activePage === 'configuracoes' ? 'Configurações' : activeItem.label}</h1>
              <p>{activePage === 'inicio' ? 'Uma estrutura simples para validar nossa conexão e navegação.' : 'Área demonstrativa para testar a navegação do aplicativo.'}</p>
            </div>
            <div className="date-chip"><span className="date-chip-dot" /> Ambiente de teste</div>
          </div>

          {activePage === 'inicio' ? (
            <>
              <section className="welcome-banner">
                <div className="welcome-copy">
                  <span className="welcome-kicker">BEM-VINDO AO CONEXAOTECH</span>
                  <h2>Seu próximo projeto começa aqui.</h2>
                  <p>Estamos preparando a base do seu novo aplicativo.</p>
                </div>
                <div className="welcome-art" aria-hidden="true">
                  <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
                  <div className="art-core"><span>C</span></div><div className="art-spark spark-one" /><div className="art-spark spark-two" />
                </div>
              </section>

              <section className="section-heading">
                <div><span className="section-kicker">PRIMEIRO TESTE</span><h2>Cadastro rápido</h2></div>
                <span className="step-label">ETAPA 01 / 01</span>
              </section>

              <section className="form-card">
                <div className="form-card-heading">
                  <div className="field-icon"><Icon name="users" size={19} /></div>
                  <div><h3>Informações básicas</h3><p>Preencha o campo abaixo para testar a gravação no banco de dados.</p></div>
                </div>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="nome">Nome <span>*</span></label>
                  <input id="nome" name="nome" type="text" placeholder="Digite seu nome"
                    value={nome} onChange={(event) => setNome(event.target.value)}
                    maxLength={120} autoComplete="name" required />
                  <div className="form-bottom">
                    <span className="field-hint">Máximo de 120 caracteres</span>
                    <button className="primary-button" type="submit" disabled={saving}>
                      {saving ? 'Salvando...' : 'Salvar nome'} <Icon name="chevron" size={16} />
                    </button>
                  </div>
                  {feedback && <div className={`feedback ${feedback.type}`} role="status">
                    <Icon name={feedback.type === 'success' ? 'check' : 'close'} size={17} />{feedback.text}
                  </div>}
                </form>
              </section>

              <div className="info-strip">
                <div className="info-symbol">i</div>
                <p><strong>Sobre este teste:</strong> o formulário grava somente o nome enviado. A leitura dos registros não fica liberada para visitantes.</p>
              </div>
            </>
          ) : (
            <section className="empty-state">
              <div className="empty-icon"><Icon name={activeItem.icon || 'settings'} size={26} /></div>
              <span className="section-kicker">PÁGINA DEMONSTRATIVA</span>
              <h2>{activePage === 'configuracoes' ? 'Configurações do ambiente' : `Área de ${activeItem.label.toLowerCase()}`}</h2>
              <p>Esta página existe para validar os menus e a navegação. O conteúdo será desenvolvido em uma próxima etapa.</p>
              <button className="secondary-button" onClick={() => navigate('inicio')}>Voltar ao início</button>
            </section>
          )}
        </main>

        <footer className="footer">
          <span>© 2026 Conexaotech <i>•</i> Ambiente de testes</span>
          <nav aria-label="Navegação do rodapé">
            <button onClick={() => navigate('inicio')}>Início</button>
            <button onClick={() => navigate('clientes')}>Cadastros</button>
            <button onClick={() => navigate('configuracoes')}>Configurações</button>
          </nav>
        </footer>
      </div>

      <nav className="mobile-bottom-nav" aria-label="Navegação inferior">
        {footerNavigation.map((item) => (
          <button key={item.id} onClick={() => navigate(item.id)} className={activePage === item.id ? 'active' : ''}>
            <Icon name={item.icon} size={19} /><span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
