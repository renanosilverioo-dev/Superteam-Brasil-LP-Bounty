
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
  Send,
  MessageCircle,
  Menu,
  X,
  ArrowRight,
  ArrowDown,
  Database,
  Briefcase,
  Terminal,
  Monitor,
  Palette,
  TrendingUp,
  Scale,
  Sparkles,
  Music,
  Box,
  CheckSquare,
  Cpu,
  Coins,
  DollarSign,
  LayoutGrid,
  FlaskConical,
  Edit3
} from 'lucide-react';
import { Member, STEvent, Metric } from './types';

// --- MOCK DATA ---
const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'Lucas Silva', role: 'Country Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', skills: ['Growth Marketing', 'Strategy'], isCore: true, twitter: 'lucas_sol' },
  { id: '2', name: 'Ana Oliveira', role: 'Fullstack Dev', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', skills: ['Rust Development', 'Frontend Development'], isCore: true, twitter: 'ana_web3' },
  { id: '3', name: 'Bruno Santos', role: 'Smart Contract Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', skills: ['Rust Development', 'Legal / Policy'] },
  { id: '4', name: 'Carla Lima', role: 'Product Designer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', skills: ['Product Design', 'UI Design'] },
  { id: '5', name: 'Diego Costa', role: 'Community Management', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop', skills: ['Community Management', 'Memes'], isCore: false },
  { id: '6', name: 'Fernanda Rocha', role: 'Frontend Dev', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', skills: ['Frontend Development', 'Writing'] },
  { id: '7', name: 'Gabriel Souza', role: 'Mobile Dev', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop', skills: ['Frontend Development', 'Biz Dev'] },
];

const SKILL_CATEGORIES = [
  { name: 'Backend Development', icon: <Database size={14} /> },
  { name: 'Biz Dev', icon: <Briefcase size={14} /> },
  { name: 'Community Management', icon: <Users size={14} /> },
  { name: 'Dev Ops', icon: <Terminal size={14} /> },
  { name: 'Frontend Development', icon: <Monitor size={14} /> },
  { name: 'Graphic Design', icon: <Palette size={14} /> },
  { name: 'Growth Marketing', icon: <TrendingUp size={14} /> },
  { name: 'Legal / Policy', icon: <Scale size={14} /> },
  { name: 'Memes', icon: <Sparkles size={14} /> },
  { name: 'Music', icon: <Music size={14} /> },
  { name: 'Product Design', icon: <Box size={14} /> },
  { name: 'Project Management', icon: <CheckSquare size={14} /> },
  { name: 'Research', icon: <Search size={14} /> },
  { name: 'Rust Development', icon: <Cpu size={14} /> },
  { name: 'Tokenomics', icon: <Coins size={14} /> },
  { name: 'Treasury Management', icon: <DollarSign size={14} /> },
  { name: 'UI Design', icon: <LayoutGrid size={14} /> },
  { name: 'UX Research', icon: <FlaskConical size={14} /> },
  { name: 'Writing', icon: <Edit3 size={14} /> },
];

const MOCK_EVENTS: STEvent[] = [
  { id: '1', title: 'Solana Hacker House SP', date: '20 Out', location: 'São Paulo, Brasil', isFeatured: true, type: 'Hackathon' },
  { id: '2', title: 'Workshop Anchor 101', date: '05 Nov', location: 'Online', type: 'Educação' },
  { id: '3', title: 'Superteam Brazil Meetup', date: '12 Nov', location: 'Rio de Janeiro', type: 'Networking' },
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

// --- COMPONENTS ---

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
      <span className="font-display font-black text-lg text-white leading-none tracking-tight">superteam</span>
      <span className="text-[8px] font-black text-verde-500 uppercase tracking-[0.4em] leading-none mt-1">BRASIL</span>
    </div>
  </div>
);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'Missão', id: 'missao' },
    { label: 'Eventos', id: 'events' },
    { label: 'Builders', id: 'directory' },
    { label: 'Comunidade', id: 'community' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/10' 
        : 'py-6 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo />
        </div>
        
        <div className="hidden md:flex items-center justify-center flex-grow gap-10">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
              className="relative text-[10px] font-black uppercase tracking-[0.2em] transition-all py-1 text-neutral-500 hover:text-white"
            >
              {item.label}
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
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
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
  <div className={`glass-verde p-5 rounded-2xl border ${member.isCore ? 'border-verde-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'border-white/5'} hover:border-verde-500/40 hover:-translate-y-1 transition-all group`}>
    <div className="flex items-start justify-between mb-4">
      <div className="relative">
        <img src={member.avatar} alt={member.name} className={`w-14 h-14 rounded-xl object-cover ${member.isCore ? 'ring-2 ring-verde-500 p-0.5' : 'ring-1 ring-white/10'}`} />
        {member.isCore && (
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-verde-600 rounded-md text-[8px] font-black text-white shadow-xl">CORE</div>
        )}
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <a href={`https://twitter.com/${member.twitter}`} className="p-2 bg-white/5 rounded-lg hover:bg-azul-500/20 hover:text-azul-400 transition-colors"><Twitter size={14} /></a>
      </div>
    </div>
    <h3 className="font-display font-bold text-lg mb-1 text-white group-hover:text-verde-300 transition-colors">{member.name}</h3>
    <p className="text-neutral-500 text-sm mb-4 font-medium">{member.role}</p>
    <div className="flex flex-wrap gap-2">
      {member.skills.slice(0, 2).map(skill => (
        <span key={skill} className="px-2 py-1 bg-verde-500/10 border border-verde-500/10 text-verde-400 text-[9px] font-black uppercase rounded-md tracking-wider">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredMembers = useMemo(() => {
    return MOCK_MEMBERS.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'All' || (filter === 'Core' && m.isCore) || m.skills.some(s => s === filter);
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filter]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-neutral-300 overflow-x-hidden selection:bg-verde-500/30 selection:text-white">
      <Nav />

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-verde-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amarelo-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
           <div className="absolute w-[80%] max-w-[900px] h-[500px] glass-verde rounded-[4rem] border border-verde-500/10 rotate-1 transform-gpu" />
           <div className="absolute w-[450px] h-[450px] border border-amarelo-500/20 glass-amarelo rounded-[3rem] rotate-45 transform-gpu" />
           <div className="absolute w-[240px] h-[240px] bg-azul-500/5 border border-azul-500/20 rounded-full flex items-center justify-center backdrop-blur-3xl animate-spin-slow">
              <div className="w-full h-[1px] bg-white/10 -rotate-15" />
           </div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-verde-500/5 border border-verde-500/20 rounded-full mb-12 animate-in fade-in slide-in-from-top-2 duration-700">
            <span className="w-2 h-2 bg-verde-500 rounded-full animate-pulse shadow-[0_0_8px_#10B981]" />
            <span className="text-[10px] font-black text-verde-400 tracking-[0.2em] uppercase">O Hub Solana no Brasil</span>
          </div>

          <div className="relative mb-12">
            <h1 className="text-center text-7xl md:text-[120px] font-display font-black text-white leading-[0.9] tracking-tighter mb-2">
              Construa o futuro.
            </h1>
            <div className="text-center text-6xl md:text-[110px] font-display font-black tracking-tighter leading-tight flex flex-wrap justify-center gap-x-4">
              <span className="text-[#10B981]">Do Brasil</span>
              <span className="text-[#F59E0B]">para</span>
              <span className="text-[#3B82F6]">o mundo.</span>
            </div>

            <div className="absolute -left-16 bottom-0 md:block hidden animate-float">
               <div className="glass-verde p-5 rounded-[2rem] border border-verde-500/20 shadow-2xl flex items-center gap-4">
                  <div className="w-2.5 h-2.5 bg-verde-500 rounded-full" />
                  <div className="flex flex-col">
                     <span className="text-lg font-black text-white">$2.5k Bounty</span>
                     <span className="text-[8px] font-bold text-verde-400 uppercase tracking-widest">Total Distribuído</span>
                  </div>
               </div>
            </div>

            <div className="absolute -right-16 top-1/4 md:block hidden animate-float-delayed">
               <div className="glass-amarelo p-5 rounded-[2rem] border border-amarelo-500/20 shadow-2xl flex items-center gap-4">
                  <div className="w-2.5 h-2.5 bg-amarelo-500 rounded-full" />
                  <div className="flex flex-col">
                     <span className="text-lg font-black text-white">Smart Contract</span>
                     <span className="text-[8px] font-bold text-amarelo-400 uppercase tracking-widest">Projeto Aprovado</span>
                  </div>
               </div>
            </div>
          </div>

          <p className="max-w-2xl text-center text-lg md:text-xl text-neutral-400 leading-relaxed font-medium mb-12 px-6">
            Somos a cooperativa de desenvolvedores e criativos que está escalando o ecossistema Solana na América Latina. <span className="text-white font-black">Aprenda, ganhe e construa com os melhores.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full px-6">
            <button className="group relative w-full sm:w-auto px-10 py-5 bg-[#059669] hover:bg-[#10B981] text-white font-black rounded-3xl transition-all shadow-[0_20px_40px_-10px_rgba(5,150,105,0.4)] hover:scale-105 active:scale-95 flex items-center justify-center gap-3 tracking-widest uppercase text-xs">
              <DiscordIcon size={20} /> Entrar no Discord
            </button>
            <button className="group w-full sm:w-auto px-10 py-5 bg-transparent border border-amarelo-500/20 text-[#FCD34D] font-black rounded-3xl hover:bg-amarelo-500/5 hover:border-amarelo-500/40 transition-all flex items-center justify-center gap-3">
              Ver Oportunidades <Trophy size={20} className="group-hover:scale-110 transition-transform text-amarelo-400" />
            </button>
          </div>
        </div>
      </section>

      {/* --- MISSION SECTION --- */}
      <section id="missao" className="py-32 px-6 bg-background-secondary/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-verde-400 mb-2 block">Nossa Missão</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white">Construa seu futuro no Web3</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Grants & Financiamento', icon: <Banknote />, color: 'verde', desc: 'Receba suporte financeiro direto da Solana Foundation para projetos inovadores.' },
              { title: 'Jobs & Bounties', icon: <Trophy />, color: 'amarelo', desc: 'Acesse as melhores oportunidades de trabalho e recompensas por tasks específicas.' },
              { title: 'Suporte a Builders', icon: <Users />, color: 'azul', desc: 'Mentoria técnica e estratégica dos melhores builders do ecossistema global.' },
              { title: 'Educação', icon: <GraduationCap />, color: 'verde', desc: 'Workshops, cursos e hackathons para levar seu conhecimento de Rust e Solana ao topo.' },
              { title: 'Rede Global', icon: <Globe />, color: 'roxo', desc: 'Conecte-se com membros da Superteam em mais de 10 países ao redor do mundo.' },
              { title: 'Eventos Presenciais', icon: <Calendar />, color: 'amarelo', desc: 'Meetups, happy hours e Hacker Houses exclusivos para a comunidade BR.' },
            ].map((pillar, i) => (
              <div key={i} className="group p-8 glass-verde rounded-[2.5rem] border border-white/5 hover:border-verde-500/40 transition-all duration-500 cursor-default">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-${pillar.color}-500/10 border border-${pillar.color}-500/20 text-${pillar.color}-400 transition-all group-hover:scale-110`}>
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-verde-300 transition-colors">{pillar.title}</h3>
                <p className="text-neutral-500 leading-relaxed text-sm font-medium">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- IMPACT METRICS --- */}
      <section className="py-20 px-6 border-y border-white/5 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {METRICS.map((metric, i) => (
            <div key={i} className="group text-center py-10 px-6 rounded-3xl transition-colors hover:bg-white/5">
              <span className={`block text-4xl md:text-6xl font-black text-white mb-2 transition-all group-hover:text-${metric.color}-400 group-hover:scale-110`}>{metric.value}</span>
              <span className="text-neutral-500 font-bold uppercase text-xs tracking-widest">{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- EVENTS SECTION --- */}
      <section id="events" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-verde-400 mb-2 block">Eventos</span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white">Próximos Encontros</h2>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-amarelo-500/10 border border-amarelo-500/20 rounded-2xl text-amarelo-300 font-bold hover:bg-amarelo-500/20 hover:text-amarelo-200 transition-all group">
              Inscreva-se no Lu.ma <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 relative h-[450px] rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/10 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Abstract Web3 Network" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-8 left-8">
                <span className="px-3 py-1 bg-verde-600 text-white text-[10px] font-black tracking-widest uppercase rounded-md shadow-lg">DESTAQUE</span>
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-2 text-verde-400 mb-2">
                  <MapPin size={16} /> <span className="text-sm font-bold uppercase tracking-wider">São Paulo, Brasil</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Solana Hacker House Brazil</h3>
                <button className="px-8 py-3 bg-verde-500 hover:bg-verde-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-verde-500/25 flex items-center gap-2 group-hover:translate-x-2">
                  Garantir Ingresso <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {MOCK_EVENTS.filter(e => !e.isFeatured).map(event => (
                <div key={event.id} className="p-6 glass-verde rounded-3xl border border-white/5 hover:border-verde-500/30 hover:bg-verde-500/5 transition-all group cursor-pointer flex items-center gap-6">
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-neutral-900 border border-verde-500/10 rounded-2xl">
                    <span className="text-[10px] font-black text-verde-400 uppercase leading-none">{event.date.split(' ')[1]}</span>
                    <span className="text-2xl font-black text-white leading-none">{event.date.split(' ')[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-verde-300 transition-colors">{event.title}</h4>
                    <p className="text-sm text-neutral-500 flex items-center gap-1 mt-1 font-medium"><MapPin size={14} /> {event.location}</p>
                  </div>
                </div>
              ))}
              <div className="mt-auto p-8 bg-verde-500/5 border border-dashed border-verde-500/30 rounded-[2rem] flex flex-col items-center justify-center text-center">
                <Plus className="text-verde-500 mb-3" size={32} />
                <p className="text-sm font-bold text-white mb-1">Organize um Meetup</p>
                <p className="text-xs text-neutral-500">Nós apoiamos eventos locais em todo o Brasil.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BUILDERS DIRECTORY SECTION --- */}
      <section id="directory" className="py-32 px-6 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-azul-400 mb-2 block">Ecossistema</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">Nossos Builders</h2>
            <p className="text-neutral-500 max-w-2xl text-lg font-medium">Conheça os talentos que estão construindo a infraestrutura Web3 no Brasil.</p>
          </header>

          <div className="flex flex-col gap-10 mb-16">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por nome ou competência..." 
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-verde-500/40 focus:ring-4 focus:ring-verde-500/5 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col gap-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 text-center">Filtrar por Competência</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <button 
                  onClick={() => setFilter('All')}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border flex items-center gap-2 tracking-wider ${filter === 'All' ? 'bg-white text-black border-transparent' : 'bg-neutral-900 border-white/5 text-neutral-500 hover:border-verde-500/40 hover:text-white'}`}
                >
                  TODOS
                </button>
                <button 
                  onClick={() => setFilter('Core')}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border flex items-center gap-2 tracking-wider ${filter === 'Core' ? 'bg-verde-500 text-white border-transparent' : 'bg-neutral-900 border-white/5 text-neutral-500 hover:border-verde-500/40 hover:text-white'}`}
                >
                  CORE TEAM
                </button>
                {SKILL_CATEGORIES.map(cat => (
                  <button 
                    key={cat.name}
                    onClick={() => setFilter(cat.name)}
                    className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase transition-all border flex items-center gap-2 whitespace-nowrap tracking-widest ${filter === cat.name ? 'bg-verde-500 text-white border-transparent' : 'bg-neutral-900 border-white/5 text-neutral-500 hover:border-verde-500/40 hover:text-white'}`}
                  >
                    <span className="opacity-70">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
            {filteredMembers.length === 0 && (
              <div className="col-span-full py-24 text-center glass-verde rounded-[2.5rem] border-dashed">
                <p className="text-neutral-500 italic font-medium">Nenhum builder encontrado para sua busca.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- PARTNERS MARQUEE --- */}
      <section id="community" className="py-32 px-6 bg-background-primary overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">Parceiros no Ecossistema</h2>
          <p className="text-neutral-500 text-lg font-medium">Projetos brasileiros <span className="text-verde-500 font-black tracking-tighter">BR</span> liderando a inovação</p>
        </div>
        
        <div className="mask-fade-x relative py-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div key={i} className="flex items-center mx-10">
                <span className="text-4xl md:text-6xl font-display font-black text-neutral-800 hover:text-verde-400 transition-colors cursor-default select-none">
                  {partner}
                </span>
                <span className="mx-10 w-3 h-3 bg-verde-500/20 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-display font-black text-white mb-12 text-center">Dúvidas Frequentes</h2>
          <div className="space-y-4">
            {[
              { q: 'Como faço para me tornar um membro?', a: 'Você pode começar participando de nossos eventos e completando bounties abertos. Membros de elite são convidados após demonstrarem consistência.' },
              { q: 'É necessário ser desenvolvedor?', a: 'Não! Precisamos de designers, escritores, gerentes de produto, estrategistas de marketing e entusiastas de comunidade.' },
              { q: 'Quais os benefícios de participar?', a: 'Acesso a grants exclusivos, networking com a elite da Solana, recompensas em USDC e prioridade em eventos globais.' },
              { q: 'Como funcionam os bounties?', a: 'São tarefas específicas com prazos e valores definidos. Qualquer pessoa pode aplicar e, se aprovada, recebe o pagamento diretamente na wallet.' }
            ].map((item, i) => (
              <div key={i} className="glass-verde rounded-2xl border border-white/5 overflow-hidden transition-all">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-verde-500/5 transition-colors"
                >
                  <span className="font-bold text-white">{item.q}</span>
                  <Plus size={20} className={`text-verde-400 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6 pt-0 text-neutral-500 text-sm leading-relaxed animate-in slide-in-from-top-2 duration-300 font-medium">
                    <div className="h-[1px] w-full bg-verde-500/10 mb-4" />
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section id="insight" className="py-20 px-6">
        <div className="max-w-5xl mx-auto glass-verde rounded-[3rem] p-10 md:p-20 relative overflow-hidden border border-white/10 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-verde-900/40 blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amarelo-900/30 blur-[100px] -z-10" />
          <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8">Pronto para <span className="text-gradient-brazil">Buildar?</span></h2>
          <p className="text-xl text-neutral-500 mb-12 max-w-2xl mx-auto font-medium">Não importa se você é um expert em Rust ou está apenas começando sua jornada. Tem um lugar para você no Superteam Brazil.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-10 py-5 bg-verde-500 hover:bg-verde-600 text-white font-black rounded-2xl shadow-2xl shadow-verde-500/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 tracking-widest uppercase text-xs">
              <DiscordIcon size={24} /> Entrar no Discord
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-amarelo-500/30 text-amarelo-300 font-black rounded-2xl hover:bg-amarelo-500/10 hover:border-amarelo-500/50 transition-all flex items-center justify-center gap-3 tracking-widest uppercase text-xs">
              <Send size={24} className="text-amarelo-400" /> Telegram Brasil
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="pt-20 pb-10 px-6 border-t border-white/5 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <Logo />
              </div>
              <p className="text-neutral-500 text-sm max-w-xs mb-8 font-medium">Impulsionando a inovação em Solana direto do Brasil. Junte-se à maior força de builders do país.</p>
              <div className="flex gap-4">
                <a href="#" className="p-2 text-neutral-600 hover:text-verde-400 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="p-2 text-neutral-600 hover:text-verde-400 transition-colors"><Github size={20} /></a>
                <a href="#" className="p-2 text-neutral-600 hover:text-verde-400 transition-colors"><DiscordIcon size={20} /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-[10px] tracking-[0.2em]">Plataforma</h4>
              <ul className="space-y-4 text-xs font-bold text-neutral-600 uppercase tracking-widest">
                <li><a href="#" className="hover:text-verde-400 transition-colors">Bounties</a></li>
                <li><a href="#" className="hover:text-verde-400 transition-colors">Grants</a></li>
                <li><a href="#" className="hover:text-verde-400 transition-colors">Jobs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-[10px] tracking-[0.2em]">Comunidade</h4>
              <ul className="space-y-4 text-xs font-bold text-neutral-600 uppercase tracking-widest">
                <li><a href="#directory" className="hover:text-verde-400 transition-colors">Membros</a></li>
                <li><a href="#events" className="hover:text-verde-400 transition-colors">Eventos</a></li>
                <li><a href="#" className="hover:text-verde-400 transition-colors">Hacker House</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-roxo-400 mb-6 uppercase text-[9px] font-black tracking-[0.3em]">Superteam Global</h4>
              <ul className="space-y-4 text-xs font-bold text-neutral-600 uppercase tracking-widest">
                <li><a href="#" className="flex items-center gap-2 hover:text-roxo-400 transition-colors">Network <Globe size={14} /></a></li>
                <li><a href="#" className="hover:text-roxo-400 transition-colors">Earn Hub</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-700 text-[10px] font-bold uppercase tracking-widest">
            <p>© 2024 Superteam Brazil. Todos os direitos reservados.</p>
            <div className="flex gap-6">
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
