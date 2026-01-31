import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Users, 
  Trophy, 
  Banknote, 
  GraduationCap, 
  Globe, 
  Calendar, 
  MapPin, 
  Twitter, 
  Github, 
  ExternalLink,
  Plus,
  ArrowRight,
  Menu,
  X,
  Code2,
  PenTool,
  FileText,
  Rocket,
  Send
} from 'lucide-react';
import { Member, STEvent, Metric } from './types';

// --- MOCK DATA ---
const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'Lucas Silva', role: 'Country Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', skills: ['Growth', 'Strategy'], isCore: true, twitter: 'lucas_sol' },
  { id: '2', name: 'Ana Oliveira', role: 'Fullstack Dev', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', skills: ['Dev', 'Rust'], isCore: true, twitter: 'ana_web3' },
  { id: '3', name: 'Bruno Santos', role: 'Smart Contract Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', skills: ['Dev', 'Solidity'] },
  { id: '4', name: 'Carla Lima', role: 'Product Designer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', skills: ['Design', 'UI/UX'], isCore: true },
  { id: '5', name: 'Diego Costa', role: 'Community Lead', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop', skills: ['Growth', 'Community'] },
  { id: '6', name: 'Fernanda Rocha', role: 'Technical Writer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', skills: ['Content', 'Writing'] },
  { id: '7', name: 'Gabriel Souza', role: 'Ecosystem Growth', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop', skills: ['Growth', 'Biz Dev'] },
  { id: '8', name: 'Juliana Paes', role: 'Frontend Architect', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop', skills: ['Dev', 'React'], isCore: false },
];

const FILTER_CATEGORIES = [
  { name: 'Core Team', icon: <Trophy size={14} />, filterKey: 'Core' },
  { name: 'Dev', icon: <Code2 size={14} />, filterKey: 'Dev' },
  { name: 'Design', icon: <PenTool size={14} />, filterKey: 'Design' },
  { name: 'Content', icon: <FileText size={14} />, filterKey: 'Content' },
  { name: 'Growth', icon: <Rocket size={14} />, filterKey: 'Growth' },
];

const MOCK_EVENTS: STEvent[] = [
  { 
    id: '1', 
    title: 'Solana Hacker House Brazil', 
    date: '20 Out', 
    location: 'São Paulo, Brasil', 
    isFeatured: true, 
    type: 'Hackathon',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: '2', 
    title: 'Workshop Anchor 101', 
    date: '05 Nov', 
    location: 'Online', 
    type: 'Educação',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '3', 
    title: 'Superteam Brazil Meetup', 
    date: '12 Nov', 
    location: 'Rio de Janeiro', 
    type: 'Networking',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600'
  },
];

const METRICS: Metric[] = [
  { label: 'Membros Ativos', value: '500+', color: 'verde' },
  { label: 'Distribuídos', value: '$450k+', color: 'amarelo' },
  { label: 'Projetos Lançados', value: '45+', color: 'azul' },
  { label: 'Hacker Houses', value: '12', color: 'verde' },
];

const PARTNERS = [
  'Solana Foundation', 'Phantom', 'Helius', 'Web3Dev BR', 'Luma', 'Discord', 'Step Finance', 'Magic Eden', 'Jupiter', 'Backpack', 'Pyth Network', 'Zeta Markets', 'Drift Protocol', 'Metaplex'
];

// --- ICONS ---

const DiscordIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-4">
    <div className="relative">
      <div className="w-10 h-10 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 8C4 5.79086 5.79086 4 8 4H24C26.2091 4 28 5.79086 28 8V12C28 14.2091 26.2091 16 24 16H8C5.79086 16 4 14.2091 4 12V8Z" fill="white"/>
          <path d="M4 20C4 17.7909 5.79086 16 8 16H24C26.2091 16 28 17.7909 28 20V24C28 26.2091 26.2091 28 24 28H8C5.79086 28 4 26.2091 4 24V20Z" fill="white"/>
        </svg>
      </div>
      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#059669] rounded-full border-2 border-[#0A0A0A] flex items-center justify-center overflow-hidden">
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="absolute w-[70%] h-[50%] bg-[#FCD34D] rotate-45 transform" />
          <div className="w-2 h-2 bg-[#1E3A8A] rounded-full z-10" />
        </div>
      </div>
    </div>
    <div className="hidden lg:flex flex-col">
      <span className="font-display font-black text-lg text-white leading-tight tracking-tight">superteam</span>
      <span className="text-[8px] font-black text-verde-500 uppercase tracking-[0.4em] leading-none mt-1">BRASIL</span>
    </div>
  </div>
);

const Nav = ({ setView, currentView }: { setView: (v: 'home' | 'members') => void, currentView: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const menuItems = [
    { label: 'Home', id: 'home', action: () => setView('home') },
    { label: 'Builders', id: 'members', action: () => setView('members') },
    { label: 'Eventos', id: 'events', scroll: true },
    { label: 'FAQ', id: 'faq', scroll: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
      scrolled 
        ? 'py-4 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10' 
        : 'py-6 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <div className="flex-shrink-0 cursor-pointer" onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Logo />
        </div>
        
        <div className="hidden md:flex items-center justify-center flex-grow gap-12">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.action) {
                  item.action();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (item.scroll) {
                  if (currentView !== 'home') {
                    setView('home');
                    setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }), 100);
                  } else {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }
                setIsOpen(false);
              }}
              className={`relative text-[11px] font-black uppercase tracking-[0.2em] transition-all py-1 ${
                (currentView === 'members' && item.id === 'members') || (currentView === 'home' && item.id === 'home')
                  ? 'text-verde-400' 
                  : 'text-neutral-500 hover:text-white'
              }`}
            >
              {item.label}
              {((currentView === 'members' && item.id === 'members') || (currentView === 'home' && item.id === 'home')) && (
                <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-verde-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <button className="md:hidden text-neutral-400" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-[#0A0A0A] p-8 flex flex-col gap-6 z-[110]">
          <div className="flex justify-between items-center mb-8">
            <Logo />
            <button onClick={() => setIsOpen(false)}><X /></button>
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.action) item.action();
                setIsOpen(false);
              }}
              className="text-left py-4 text-2xl font-black uppercase tracking-widest text-neutral-400"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const MemberCard: React.FC<{ member: Member }> = ({ member }) => (
  <div className={`glass-verde p-8 rounded-3xl border transition-all duration-300 group ${
    member.isCore 
      ? 'border-verde-500/30 bg-verde-500/[0.04] ring-1 ring-verde-500/10 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)]' 
      : 'border-white/5 hover:border-white/10 shadow-xl'
  } hover:-translate-y-2`}>
    <div className="flex items-start justify-between mb-8">
      <div className="relative">
        <div className={`w-16 h-16 rounded-2xl overflow-hidden ${member.isCore ? 'ring-2 ring-verde-500 p-0.5' : 'ring-1 ring-white/10'}`}>
          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover rounded-[14px]" />
        </div>
        {member.isCore && (
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-verde-600 rounded-md text-[9px] font-black text-white shadow-xl uppercase tracking-tighter">Core</div>
        )}
      </div>
      <div className="flex gap-3">
        {member.twitter && (
          <a href={`https://twitter.com/${member.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl hover:bg-azul-500/20 hover:text-azul-400 transition-all">
            <Twitter size={16} />
          </a>
        )}
        <a href="#" className="p-2.5 bg-white/5 rounded-xl hover:bg-neutral-800 transition-all">
          <DiscordIcon size={16} />
        </a>
      </div>
    </div>
    
    <div className="space-y-1.5 mb-8">
      <h3 className={`font-display font-black text-xl tracking-tight ${member.isCore ? 'text-white' : 'text-neutral-200'}`}>{member.name}</h3>
      <p className="text-neutral-500 text-sm font-semibold uppercase tracking-wider">{member.role}</p>
    </div>

    <div className="flex flex-wrap gap-2">
      {member.skills.map(skill => (
        <span key={skill} className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-lg tracking-widest border ${
          member.isCore 
            ? 'bg-verde-500/10 border-verde-500/20 text-verde-400' 
            : 'bg-white/5 border-white/5 text-neutral-400'
        }`}>
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const MembersView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredMembers = useMemo(() => {
    return MOCK_MEMBERS.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'All' || 
                            (activeFilter === 'Core' && m.isCore) || 
                            m.skills.some(s => s.toLowerCase() === activeFilter.toLowerCase());
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  return (
    <main className="min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-verde-500/5 border border-verde-500/20 rounded-full mb-8">
            <span className="text-[11px] font-black text-verde-400 tracking-[0.2em] uppercase">Comunidade Superteam Brazil</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter">
            Diretório de <span className="text-verde-400">Builders</span>
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            Conheça a elite de desenvolvedores, designers e estrategistas que estão construindo a infraestrutura Web3 no Brasil.
          </p>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col gap-12 mb-24">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveFilter('All')}
              className={`px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] border transition-all ${
                activeFilter === 'All' ? 'bg-white text-black border-white shadow-xl scale-105' : 'bg-transparent text-neutral-500 border-white/10 hover:border-white/20'
              }`}
            >
              Todos
            </button>
            {FILTER_CATEGORIES.map(cat => (
              <button 
                key={cat.filterKey}
                onClick={() => setActiveFilter(cat.filterKey)}
                className={`px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] border transition-all flex items-center gap-3 ${
                  activeFilter === cat.filterKey ? 'bg-verde-500 text-white border-verde-500 shadow-lg scale-105' : 'bg-transparent text-neutral-500 border-white/10 hover:border-white/20'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative max-w-xl mx-auto w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nome ou competência..." 
              className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:border-verde-500/40 focus:ring-4 focus:ring-verde-500/5 transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMembers.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="py-32 text-center glass-verde rounded-[3rem] border-dashed border-white/10">
            <Users className="mx-auto text-neutral-800 mb-6" size={64} />
            <p className="text-neutral-500 text-xl font-black">Nenhum builder encontrado.</p>
          </div>
        )}
      </div>
    </main>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'members'>('home');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [view]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-neutral-300 selection:bg-verde-500/30 selection:text-white">
      <Nav setView={setView} currentView={view} />

      {view === 'members' ? (
        <MembersView />
      ) : (
        <>
          {/* --- HERO SECTION --- */}
          <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-32 px-6 overflow-hidden">
            {/* BACKGROUND COMPOSITION (MINIMALIST BRAZIL FLAG WIREFRAME) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0 flex items-center justify-center overflow-hidden">
               {/* Container for the flag - Added 'group' class for hover effects */}
               <div className="relative flex items-center justify-center opacity-100 group">
                  
                  {/* Ambient Light Sources (Extremely Subtle) - Added transitions */}
                  <div className="absolute -top-[20%] -left-[20%] w-[500px] h-[500px] bg-verde-500/[0.015] rounded-full blur-[128px] pointer-events-none transition-all duration-1000 group-hover:bg-verde-500/[0.03]" />
                  <div className="absolute -bottom-[20%] -right-[20%] w-[500px] h-[500px] bg-amarelo-500/[0.015] rounded-full blur-[128px] pointer-events-none transition-all duration-1000 group-hover:bg-amarelo-500/[0.03]" />

                  <svg 
                      width="100%" 
                      height="100%" 
                      viewBox="-2 -4 24 22" 
                      className="w-[500px] h-[350px] md:w-[800px] md:h-[560px]"
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                  >
                      {/* Green Rectangle - Smooth transition & Glow on hover */}
                      <rect x="0" y="0" width="20" height="14" rx="2" 
                            className="animate-float-subtle-slow origin-center transition-all duration-1000 ease-in-out group-hover:fill-opacity-[0.05] group-hover:stroke-opacity-[0.3] group-hover:drop-shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                            fill="#10B981" fillOpacity="0.01"
                            stroke="#10B981" strokeWidth="0.05" strokeOpacity="0.08" />
                      
                      {/* Yellow Rhombus - Smooth transition & Glow on hover */}
                      <path d="M10 -0.8 L20.8 7 L10 14.8 L-0.8 7 Z" 
                            className="animate-float-subtle-delayed origin-center transition-all duration-1000 ease-in-out group-hover:fill-opacity-[0.05] group-hover:stroke-opacity-[0.3] group-hover:drop-shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                            fill="#F59E0B" fillOpacity="0.01"
                            stroke="#F59E0B" strokeWidth="0.05" strokeOpacity="0.08" strokeLinejoin="round" />
                      
                      {/* Blue Circle - Smooth transition & Glow on hover */}
                      <circle cx="10" cy="7" r="4.2" 
                              className="animate-float-subtle origin-center transition-all duration-1000 ease-in-out group-hover:fill-opacity-[0.05] group-hover:stroke-opacity-[0.3] group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                              fill="#3B82F6" fillOpacity="0.01"
                              stroke="#3B82F6" strokeWidth="0.05" strokeOpacity="0.08" />
                      
                      {/* Equator Line - Smooth transition & Glow on hover */}
                      <path d="M5.8 7.5 C5.8 7.5 8 6.5 14.2 6.5" 
                            className="animate-float-subtle origin-center transition-all duration-1000 ease-in-out group-hover:stroke-opacity-[0.3] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                            stroke="#3B82F6" strokeWidth="0.03" strokeOpacity="0.08" strokeLinecap="round" />
                  </svg>
               </div>
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
              {/* TOP BADGE (O HUB SOLANA NO BRASIL) */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A0A0A] border border-[#10B981]/20 rounded-full mb-10 shadow-2xl">
                <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full shadow-[0_0_8px_#10B981]" />
                <span className="text-[9px] font-black text-[#10B981] tracking-[0.2em] uppercase">O HUB SOLANA NO BRASIL</span>
              </div>

              {/* MAIN TITLE (SPACING & LAYOUT FIXED) */}
              <div className="relative mb-12 text-center z-10">
                <h1 className="text-6xl md:text-[100px] lg:text-[120px] font-display font-black text-white leading-[0.9] tracking-tighter mb-4">
                  Construa o futuro.
                </h1>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-wrap justify-center gap-4 text-5xl md:text-[90px] lg:text-[100px] font-display font-black tracking-tighter leading-[0.95]">
                        <span className="text-[#10B981]">Do Brasil</span>
                        <span className="text-[#F59E0B]">para</span>
                    </div>
                    <div className="text-5xl md:text-[90px] lg:text-[100px] font-display font-black tracking-tighter leading-[0.95] text-[#3B82F6] mt-2">
                        o mundo.
                    </div>
                </div>

                {/* FLOATING BADGE LEFT: $2.5k Bounty */}
                <div className="absolute -left-20 xl:-left-48 bottom-0 md:block hidden animate-float">
                  <div className="bg-[#0A0A0A]/90 backdrop-blur-md p-4 pr-7 rounded-[1.2rem] border border-white/10 shadow-2xl flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#10B981] rounded-full shadow-[0_0_10px_#10B981]" />
                    <div className="flex flex-col text-left">
                      <span className="text-lg font-black text-white tracking-tight leading-none mb-1">$2.5k Bounty</span>
                      <span className="text-[8px] font-black text-[#10B981] uppercase tracking-[0.1em] leading-none">TOTAL DISTRIBUÍDO</span>
                    </div>
                  </div>
                </div>

                {/* FLOATING BADGE RIGHT: Smart Contract */}
                <div className="absolute -right-20 xl:-right-48 top-10 md:block hidden animate-float-delayed">
                  <div className="bg-[#0A0A0A]/90 backdrop-blur-md p-4 pr-7 rounded-[1.2rem] border border-white/10 shadow-2xl flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F59E0B] rounded-full shadow-[0_0_10px_#F59E0B]" />
                    <div className="flex flex-col text-left">
                      <span className="text-lg font-black text-white tracking-tight leading-none mb-1">Smart Contract</span>
                      <span className="text-[8px] font-black text-[#F59E0B] uppercase tracking-[0.1em] leading-none">PROJETO APROVADO</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION TEXT */}
              <p className="max-w-2xl text-center text-sm md:text-base text-neutral-400 leading-relaxed font-medium mb-12 px-6">
                Somos a cooperativa de desenvolvedores e criativos que está escalando o ecossistema Solana na América Latina. <span className="text-white font-bold">Aprenda, ganhe e construa com os melhores.</span>
              </p>

              {/* HERO BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full px-6">
                <button className="group relative w-full sm:w-auto px-10 py-4 bg-[#10B981] hover:bg-[#059669] text-white font-black rounded-2xl transition-all shadow-[0_15px_30px_-10px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3 tracking-widest uppercase text-xs">
                  Entrar na Comunidade <Users size={18} />
                </button>
                <button 
                  onClick={() => setView('members')}
                  className="group w-full sm:w-auto px-10 py-4 bg-transparent border border-white/10 text-[#F59E0B] font-bold rounded-2xl hover:bg-[#F59E0B]/5 transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
                >
                  Ver Oportunidades <Trophy size={18} />
                </button>
              </div>
            </div>
          </section>

          {/* --- MISSION SECTION --- */}
          <section id="missao" className="py-32 px-6 bg-background-secondary/50 relative">
            <div className="max-w-7xl mx-auto">
              <div className="mb-20">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-verde-400 mb-3 block">Nossa Missão</span>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">Construa seu futuro no Web3</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Grants & Financiamento', icon: <Banknote />, color: 'verde', desc: 'Receba suporte financeiro direto da Solana Foundation para projetos inovadores.' },
                  { title: 'Jobs & Bounties', icon: <Trophy />, color: 'amarelo', desc: 'Acesse as melhores oportunidades de trabalho e recompensas por tasks específicas.' },
                  { title: 'Suporte a Builders', icon: <Users />, color: 'azul', desc: 'Mentoria técnica e estratégica dos melhores builders do ecossistema global.' },
                  { title: 'Educação', icon: <GraduationCap />, color: 'verde', desc: 'Workshops, cursos e hackathons para levar seu conhecimento de Rust e Solana ao topo.' },
                  { title: 'Rede Global', icon: <Globe />, color: 'roxo', desc: 'Conecte-se com membros da Superteam em mais de 10 países ao redor do mundo.' },
                  { title: 'Eventos Presenciais', icon: <Calendar />, color: 'amarelo', desc: 'Meetups, happy hours e Hacker Houses exclusivos para a comunidade BR.' },
                ].map((item, i) => (
                  <div key={i} className={`group relative p-8 rounded-3xl bg-[#0E0E0E] border border-white/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl overflow-hidden`}>
                      {/* Hover Glow Background */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-${item.color}-500/10 to-transparent pointer-events-none`} />
                      
                      {/* Top Border Highlight */}
                      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${item.color}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      <div className="relative z-10">
                          <div className="flex justify-between items-start mb-8">
                               {/* Icon Box */}
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 text-${item.color}-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-${item.color}-500 group-hover:text-black group-hover:border-${item.color}-400 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
                                  {React.cloneElement(item.icon as React.ReactElement, { size: 26 })}
                              </div>
                              {/* Hover Arrow */}
                              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0">
                                  <ArrowRight className={`text-${item.color}-400`} size={20} />
                              </div>
                          </div>
                          
                          <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-white transition-colors tracking-tight">
                              {item.title}
                          </h3>
                          <p className="text-neutral-500 text-sm leading-relaxed font-medium group-hover:text-neutral-400 transition-colors">
                              {item.desc}
                          </p>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- IMPACT DASHBOARD --- */}
          <section className="py-24 px-6 border-y border-white/5 bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
              {METRICS.map((metric, i) => (
                <div key={i} className="group relative p-8 rounded-3xl bg-[#0E0E0E] border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden flex flex-col items-center justify-center text-center">
                  {/* Hover Glow Background */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-${metric.color}-500/10 to-transparent pointer-events-none`} />
                  
                  {/* Top Border Highlight */}
                  <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${metric.color}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <span className={`block text-5xl md:text-7xl font-display font-black text-white mb-4 transition-all group-hover:text-${metric.color}-400 tracking-tighter group-hover:scale-105 duration-500`}>
                        {metric.value}
                    </span>
                    <span className="text-neutral-500 font-bold uppercase text-[11px] tracking-[0.2em] group-hover:text-neutral-300 transition-colors">
                        {metric.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- EVENTS SECTION --- */}
          <section id="events" className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-verde-400 mb-3 block">Eventos</span>
                  <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">Próximos Encontros</h2>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-amarelo-500/10 border border-amarelo-500/20 rounded-2xl text-amarelo-300 font-bold hover:bg-amarelo-500/20 hover:text-amarelo-200 transition-all group shadow-lg text-xs uppercase tracking-widest">
                  Inscreva-se no Lu.ma <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 relative h-[500px] rounded-[3rem] overflow-hidden group cursor-pointer border border-white/10 shadow-2xl">
                  <img src={MOCK_EVENTS[0].image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Tech Visual" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute top-10 left-10">
                    <span className="px-4 py-1.5 bg-verde-600 text-white text-[10px] font-black tracking-widest uppercase rounded-lg shadow-lg">DESTAQUE</span>
                  </div>
                  <div className="absolute bottom-12 left-12 right-12">
                    <div className="flex items-center gap-2 text-verde-400 mb-4">
                      <MapPin size={18} /> <span className="text-sm font-bold uppercase tracking-wider">São Paulo, Brasil</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-10 tracking-tighter">Solana Hacker House Brazil</h3>
                    <button className="px-10 py-4 bg-verde-500 hover:bg-verde-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-verde-500/25 flex items-center gap-3 group-hover:translate-x-2 text-xs uppercase tracking-widest">
                      Garantir Ingresso <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  {MOCK_EVENTS.filter(e => !e.isFeatured).map(event => (
                    <div key={event.id} className="p-4 glass-verde rounded-[2rem] border border-white/5 hover:border-verde-500/30 hover:bg-verde-500/5 transition-all group cursor-pointer flex items-center gap-6">
                      <div className="relative w-28 h-24 shrink-0 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        <div className="absolute top-2 left-2 bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex flex-col items-center">
                           <span className="text-[9px] font-black text-verde-400 uppercase leading-none mb-0.5">{event.date.split(' ')[1]}</span>
                           <span className="text-sm font-black text-white leading-none">{event.date.split(' ')[0]}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-black text-white text-lg group-hover:text-verde-300 transition-colors mb-2 tracking-tight leading-tight">{event.title}</h4>
                        <p className="text-xs text-neutral-400 flex items-center gap-1.5 font-bold uppercase tracking-wide"><MapPin size={12} className="text-verde-500" /> {event.location}</p>
                      </div>
                    </div>
                  ))}
                  <div className="mt-auto p-12 bg-verde-500/5 border border-dashed border-verde-500/30 rounded-[3rem] flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-verde-500/10 rounded-2xl flex items-center justify-center mb-6">
                      <Plus className="text-verde-500" size={32} />
                    </div>
                    <p className="text-xl font-black text-white mb-3 tracking-tight">Organize um Meetup</p>
                    <p className="text-sm text-neutral-500 leading-relaxed font-medium px-4">Nós apoiamos builders locais em todo o território nacional.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- PARTNERS MARQUEE --- */}
          <section id="community" className="py-32 px-6 bg-background-primary overflow-hidden">
            <div className="max-w-7xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">Rede de Builders</h2>
              <p className="text-neutral-500 text-lg font-medium">Projetos <span className="text-verde-500 font-black tracking-tighter">BR</span> construindo o futuro do Web3</p>
            </div>
            
            <div className="mask-fade-x relative py-12">
              <div className="flex whitespace-nowrap animate-marquee">
                {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                  <div key={i} className="flex items-center mx-16">
                    <span className="text-5xl md:text-8xl font-display font-black text-neutral-800 hover:text-verde-400 transition-all duration-500 cursor-default select-none tracking-tighter hover:scale-110">
                      {partner}
                    </span>
                    <span className="mx-16 w-3 h-3 bg-verde-500/20 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- FAQ SECTION --- */}
          <section id="faq" className="py-32 px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-5xl font-display font-black text-white mb-20 text-center tracking-tighter">Dúvidas Frequentes</h2>
              <div className="space-y-6">
                {[
                  { q: 'Como faço para me tornar um membro?', a: 'Participe de nossos eventos, contribua com projetos abertos e complete bounties. O Core Team observa contribuintes consistentes.' },
                  { q: 'É necessário ser desenvolvedor?', a: 'Não! Superteam é para designers, copywriters, estrategistas e operadores. Qualquer builder é bem-vindo.' },
                  { q: 'O Superteam Brazil é oficial?', a: 'Sim, somos o hub oficial da Solana Foundation no Brasil, focados em talentos locais.' },
                ].map((item, i) => (
                  <div key={i} className="glass-verde rounded-[2.5rem] border border-white/5 overflow-hidden transition-all shadow-lg hover:border-white/10">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-12 py-8 flex items-center justify-between text-left hover:bg-verde-500/5 transition-colors"
                    >
                      <span className="font-black text-white text-lg tracking-tight">{item.q}</span>
                      <Plus size={24} className={`text-verde-400 transition-transform duration-500 ${openFaq === i ? 'rotate-45' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-12 pb-12 pt-0 text-neutral-400 text-base leading-relaxed animate-in slide-in-from-top-2 duration-500 font-medium">
                        <div className="h-[1px] w-full bg-verde-500/10 mb-8" />
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- CTA SECTION --- */}
          <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#0A0A0A]">
              {/* Background Gradients */}
              <div className="absolute top-0 right-0 w-[60%] h-full bg-verde-900/20 blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[60%] h-full bg-amarelo-900/10 blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center py-24 px-6 md:px-12">
                <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter">
                  Pronto para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#3B82F6]">Buildar?</span>
                </h2>
                <p className="text-neutral-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-16">
                  Não importa se você é um expert em Rust ou está apenas começando sua jornada. Tem um lugar para você no Superteam Brazil.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                   {/* Discord Button */}
                   <button className="group relative px-10 py-5 bg-[#10B981] hover:bg-[#059669] text-white font-black rounded-2xl transition-all shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 tracking-widest uppercase text-xs">
                     <DiscordIcon size={20} />
                     Entrar no Discord
                   </button>
                   
                   {/* Telegram Button */}
                   <button className="group px-10 py-5 bg-transparent border border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B]/10 font-black rounded-2xl transition-all flex items-center justify-center gap-3 tracking-widest uppercase text-xs">
                     <Send size={20} />
                     Telegram Brasil
                   </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* --- FOOTER --- */}
      <footer className="pt-32 pb-16 px-6 border-t border-white/5 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
            <div className="col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <Logo />
              </div>
              <p className="text-neutral-500 text-lg max-w-sm mb-12 font-medium leading-relaxed">Escalando o ecossistema Solana direto do Brasil. Junte-se à maior cooperativa de builders do país.</p>
              <div className="flex gap-4">
                <a href="#" className="p-3.5 bg-white/5 text-neutral-600 hover:text-verde-400 hover:bg-white/10 rounded-2xl transition-all"><Twitter size={20} /></a>
                <a href="#" className="p-3.5 bg-white/5 text-neutral-600 hover:text-verde-400 hover:bg-white/10 rounded-2xl transition-all"><Github size={20} /></a>
                <a href="#" className="p-3.5 bg-white/5 text-neutral-600 hover:text-verde-400 hover:bg-white/10 rounded-2xl transition-all"><DiscordIcon size={20} /></a>
              </div>
            </div>
            <div>
              <h4 className="font-black text-white mb-8 uppercase text-[11px] tracking-[0.3em]">Plataforma</h4>
              <ul className="space-y-4 text-sm font-bold text-neutral-600 uppercase tracking-[0.1em]">
                <li><a href="#" className="hover:text-verde-400 transition-colors">Bounties</a></li>
                <li><a href="#" className="hover:text-verde-400 transition-colors">Grants</a></li>
                <li><a href="#" className="hover:text-verde-400 transition-colors">Jobs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white mb-8 uppercase text-[11px] tracking-[0.3em]">Comunidade</h4>
              <ul className="space-y-4 text-sm font-bold text-neutral-600 uppercase tracking-[0.1em]">
                <li><button onClick={() => setView('members')} className="hover:text-verde-400 transition-colors text-left uppercase tracking-[0.1em] font-bold">Membros</button></li>
                <li><a href="#events" onClick={() => setView('home')} className="hover:text-verde-400 transition-colors">Eventos</a></li>
                <li><a href="#" className="hover:text-verde-400 transition-colors">Hacker House</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-roxo-400 mb-8 uppercase text-[10px] tracking-[0.3em]">Global Hub</h4>
              <ul className="space-y-4 text-sm font-bold text-neutral-600 uppercase tracking-[0.1em]">
                <li><a href="#" className="flex items-center gap-2 hover:text-roxo-400 transition-colors">Network <Globe size={16} /></a></li>
                <li><a href="#" className="hover:text-roxo-400 transition-colors">Earn Hub</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-neutral-700 text-[10px] font-black uppercase tracking-[0.3em]">
            <p>© 2024 Superteam Brazil. Build the future.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-neutral-500 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-neutral-500 transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;