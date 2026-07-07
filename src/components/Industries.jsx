import React from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ShoppingCart,
  GraduationCap,
  Heart,
  Plane,
  Code,
  Building2,
  Store,
  Truck,
  MoreHorizontal,
  CheckCircle2,
  IndianRupee,
  Zap,
  Lock
} from 'lucide-react';

const industries = [
  {
    name: 'E-commerce',
    icon: <ShoppingCart className="w-7 h-7 text-[#FF5722]" />,
    color: '#FF5722',
    glowColor: 'rgba(255, 87, 34, 0.2)'
  },
  {
    name: 'Education',
    icon: <GraduationCap className="w-7 h-7 text-[#00E5FF]" />,
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.2)'
  },
  {
    name: 'Healthcare',
    icon: <Heart className="w-7 h-7 text-[#FF5722]" />,
    color: '#FF5722',
    glowColor: 'rgba(255, 87, 34, 0.2)'
  },
  {
    name: 'Travel & Hospitality',
    icon: <Plane className="w-7 h-7 text-[#00E5FF]" />,
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.2)'
  },
  {
    name: 'SaaS & Software',
    icon: <Code className="w-7 h-7 text-[#FF5722]" />,
    color: '#FF5722',
    glowColor: 'rgba(255, 87, 34, 0.2)'
  },
  {
    name: 'Fintech',
    icon: <Building2 className="w-7 h-7 text-[#00E5FF]" />,
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.2)'
  },
  {
    name: 'Retail',
    icon: <Store className="w-7 h-7 text-[#00E5FF]" />,
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.2)'
  },
  {
    name: 'Logistics',
    icon: <Truck className="w-7 h-7 text-[#00E5FF]" />,
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.2)'
  },
  {
    name: '& More',
    icon: <MoreHorizontal className="w-7 h-7 text-[#00E5FF]" />,
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.2)'
  }
];

const stats = [
  {
    num: '5000+',
    label: 'Happy Businesses',
    icon: <CheckCircle2 className="w-6 h-6 text-[#FF5722]" />,
    color: '#FF5722',
    glowColor: 'rgba(255, 87, 34, 0.15)',
    textColor: 'text-[#FF5722]'
  },
  {
    num: '₹10,000 Cr+',
    label: 'Transactions Processed',
    icon: <IndianRupee className="w-6 h-6 text-[#FF5722]" />,
    color: '#FF5722',
    glowColor: 'rgba(255, 87, 34, 0.15)',
    textColor: 'text-[#FF5722]'
  },
  {
    num: '99.9%',
    label: 'Uptime & Reliability',
    icon: <Zap className="w-6 h-6 text-[#00E5FF]" />,
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.15)',
    textColor: 'text-[#00E5FF]'
  },
  {
    num: '100%',
    label: 'Secure Transactions',
    icon: <Lock className="w-6 h-6 text-[#00E5FF]" />,
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.15)',
    textColor: 'text-[#00E5FF]'
  }
];

const nodeConfigs = {
  'Travel & Hospitality': { id: 'travel', x: 50, y: 12 },
  'E-commerce': { id: 'ecommerce', x: 32, y: 31 },
  'SaaS & Software': { id: 'saas', x: 68, y: 31 },
  'Healthcare': { id: 'healthcare', x: 14, y: 50 },
  'Fintech': { id: 'fintech', x: 50, y: 50 },
  'Retail': { id: 'retail', x: 86, y: 50 },
  'Education': { id: 'education', x: 32, y: 69 },
  'Logistics': { id: 'logistics', x: 68, y: 69 },
  '& More': { id: 'more', x: 50, y: 88 },
};

const connections = [
  { from: 'fintech', to: 'travel' },
  { from: 'fintech', to: 'ecommerce' },
  { from: 'fintech', to: 'saas' },
  { from: 'fintech', to: 'healthcare' },
  { from: 'fintech', to: 'retail' },
  { from: 'fintech', to: 'education' },
  { from: 'fintech', to: 'logistics' },
  { from: 'fintech', to: 'more' }
];

const bentoDescriptions = {
  'fintech': 'Automate real-time payouts, routing, and ledgering.',
  'ecommerce': 'Frictionless checkouts and one-click refunds.',
  'saas': 'Subscription billing and metered usage automation.',
  'healthcare': 'HIPAA-compliant payments with encryption.',
  'retail': 'Omnichannel payouts and POS terminal settlement.',
  'travel': 'Split bookings and global currency conversion.',
  'education': 'Fee collections and automated payment portals.',
  'logistics': 'Vendor payouts and automated fuel card refills.',
  'more': 'Custom integrations for high-growth enterprises.'
};

const getBentoClasses = (nodeId) => {
  switch (nodeId) {
    case 'fintech':
      return 'md:col-span-2 h-[150px]';
    case 'ecommerce':
      return 'md:col-span-1 h-[150px]';
    case 'more':
      return 'md:col-span-3 h-[90px]';
    default:
      return 'md:col-span-1 h-[150px]';
  }
};

const bentoSortedNames = [
  'Fintech',
  'E-commerce',
  'SaaS & Software',
  'Healthcare',
  'Retail',
  'Travel & Hospitality',
  'Education',
  'Logistics',
  '& More'
];



export default function Industries() {
  const [scanStage, setScanStage] = React.useState(0); // 0: Fintech active/scanning, 1: Connected, 2: Bento
  const [hoveredNode, setHoveredNode] = React.useState(null);
  const [activeBentoId, setActiveBentoId] = React.useState(null);

  const statsRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "center center"]
  });

  const x0 = useTransform(scrollYProgress, [0, 0.75], [-120, 0]);
  const x1 = useTransform(scrollYProgress, [0.1, 0.85], [-120, 0]);
  const x2 = useTransform(scrollYProgress, [0, 0.75], [120, 0]);
  const x3 = useTransform(scrollYProgress, [0.1, 0.85], [120, 0]);
  
  const op0 = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const op1 = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const op2 = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const op3 = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  const xValues = [x0, x1, x2, x3];
  const opValues = [op0, op1, op2, op3];

  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Map nodes in the perfect Bento Grid order
  const nodes = bentoSortedNames.map(name => {
    const ind = industries.find(i => i.name === name);
    const config = nodeConfigs[name];
    return {
      ...ind,
      ...config
    };
  });

  // Timeline-based auto-connection sequence
  React.useEffect(() => {
    if (!isInView) return;

    if (scanStage === 0) {
      const t = setTimeout(() => {
        setScanStage(1); // Connected state: All cards light up
      }, 700); // 700ms shoot lines from Fintech
      return () => clearTimeout(t);
    } else if (scanStage === 1) {
      const t = setTimeout(() => {
        setScanStage(2); // Bento view: morph cards into Bento grid
      }, 800); // 800ms connected hold
      return () => clearTimeout(t);
    }
  }, [isInView, scanStage]);

  const isBento = scanStage === 2;

  const isNodeConnected = (nodeId) => {
    if (scanStage === 1 || isBento) return true;
    if (nodeId === 'fintech') return true;

    if (hoveredNode !== null) {
      if (hoveredNode === nodeId) return true;
      return connections.some(c =>
        (c.from === hoveredNode && c.to === nodeId) ||
        (c.to === hoveredNode && c.from === nodeId)
      );
    }
    return false;
  };

  return (
    <section ref={containerRef} className="py-12 md:py-20 lg:py-24 relative z-10 bg-brand-black border-b border-white/5 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">

        {/* Large Rounded Container Card with gradient blending */}
        <div className="bg-gradient-to-b lg:bg-gradient-to-r from-[#0f1b29]/40 via-[#0b1014] to-[#0e1a24]/40 border border-white/[0.08] shadow-[0_0_40px_rgba(0,229,255,0.03)] rounded-[2.5rem] p-8 lg:p-16 overflow-hidden relative">
          
          {/* Subtle Inner Card Glow */}
          <div className="absolute -right-20 -top-20 w-[350px] h-[350px] bg-brand-cyan/5 blur-[80px] rounded-full pointer-events-none z-0" />
          <div className="absolute -left-20 -bottom-20 w-[350px] h-[350px] bg-[#FF5722]/5 blur-[80px] rounded-full pointer-events-none z-0" />

          {/* Section Header */}
          <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between relative z-10">
          <div className="text-left">
            <div className="text-[#00E5FF] text-xs font-bold uppercase tracking-[0.25em] mb-4 opacity-80">
              Industries We Serve
            </div>
            <h2 className="text-3xl lg:text-5xl font-light text-white tracking-[-0.03em] leading-tight">
              Solutions for <br className="sm:hidden" />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">
                Every Industry
              </span>
            </h2>
          </div>
          {isBento && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => {
                setScanStage(0);
                setActiveBentoId(null);
                setHoveredNode(null);
              }}
              className="hidden md:block mt-6 sm:mt-0 px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 text-xs font-medium text-brand-grey hover:text-white transition-all select-none cursor-pointer"
            >
              Replay Network Scan
            </motion.button>
          )}
        </div>

        {/* Mobile View: Dual-Row Auto-Sliding Marquee (below md) */}
        <div className="md:hidden flex flex-col gap-4.5 w-[calc(100%+4rem)] overflow-hidden py-2 relative -mx-8">
          {/* Subtle horizontal blur masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0b1014] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0b1014] to-transparent z-10 pointer-events-none" />

          {/* Row 1: Sliding Left */}
          <div className="w-full flex overflow-hidden">
            <motion.div 
              className="flex gap-4 pr-4 shrink-0"
              animate={{ x: [0, "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[
                industries[0], // E-commerce
                industries[1], // Education
                industries[2], // Healthcare
                industries[3], // Travel & Hospitality
                industries[8], // & More
                industries[0],
                industries[1],
                industries[2],
                industries[3],
                industries[8]
              ].map((ind, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 py-3 px-5 rounded-2xl border bg-[#0b0f13]/25 backdrop-blur-sm shrink-0"
                  style={{ borderColor: `${ind.color}15` }}
                >
                  <div 
                    className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 scale-90"
                    style={{
                      borderColor: `${ind.color}33`,
                      backgroundColor: `${ind.color}08`,
                    }}
                  >
                    {ind.icon}
                  </div>
                  <span className="text-[#E5E7EB] text-xs font-semibold whitespace-nowrap">
                    {ind.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Sliding Right */}
          <div className="w-full flex overflow-hidden">
            <motion.div 
              className="flex gap-4 pr-4 shrink-0"
              animate={{ x: ["-50%", 0] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[
                industries[4], // SaaS & Software
                industries[5], // Fintech
                industries[6], // Retail
                industries[7], // Logistics
                industries[4],
                industries[5],
                industries[6],
                industries[7]
              ].map((ind, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 py-3 px-5 rounded-2xl border bg-[#0b0f13]/25 backdrop-blur-sm shrink-0"
                  style={{ borderColor: `${ind.color}15` }}
                >
                  <div 
                    className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 scale-90"
                    style={{
                      borderColor: `${ind.color}33`,
                      backgroundColor: `${ind.color}08`,
                    }}
                  >
                    {ind.icon}
                  </div>
                  <span className="text-[#E5E7EB] text-xs font-semibold whitespace-nowrap">
                    {ind.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Desktop/Tablet View: Interactive Hexagonal Mesh Network or Bento Grid */}
        <motion.div
          layout
          className={
            !isBento
              ? "hidden md:block relative w-full h-[580px] mt-10"
              : "hidden md:grid md:grid-cols-3 gap-6 w-full mt-10"
          }
        >
          {/* SVG Connection Lines - Only visible in mesh mode */}
          {!isBento && (
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
            >
              {connections.map((conn, idx) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;

                // Active if scan stage is active or manually hovered
                const isLineActive = scanStage === 0 || scanStage === 1 ||
                  (hoveredNode !== null && (conn.from === hoveredNode || conn.to === hoveredNode));

                const activeColor = fromNode.id === 'fintech' ? fromNode.color : toNode.color;

                return (
                  <React.Fragment key={idx}>
                    {/* Base Faint connection line */}
                    <line
                      x1={`${fromNode.x}%`}
                      y1={`${fromNode.y}%`}
                      x2={`${toNode.x}%`}
                      y2={`${toNode.y}%`}
                      stroke={isLineActive ? activeColor : 'rgba(255, 255, 255, 0.05)'}
                      strokeWidth={isLineActive ? 2 : 1.2}
                      className="transition-all duration-300"
                      style={{
                        opacity: scanStage === 0 ? 0.8 : isLineActive ? 1 : 0.15
                      }}
                    />

                    {/* Glowing Data Flow Packet Overlay Line */}
                    {isLineActive && (
                      <line
                        x1={`${fromNode.x}%`}
                        y1={`${fromNode.y}%`}
                        x2={`${toNode.x}%`}
                        y2={`${toNode.y}%`}
                        stroke={activeColor}
                        strokeWidth={2.5}
                        className="animate-dash opacity-80"
                        style={{
                          filter: `drop-shadow(0 0 5px ${activeColor})`
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </motion.svg>
          )}

          {/* Node / Bento Cards */}
          {nodes.map((node, idx) => {
            const isHovered = hoveredNode === node.id;
            const isConnected = isNodeConnected(node.id);
            const isActive = scanStage === 1 || node.id === 'fintech' || (hoveredNode !== null && (hoveredNode === node.id || isConnected));

            const isBentoActive = isBento && (activeBentoId === node.id);

            return (
              <motion.div
                key={node.id}
                layout
                initial={isBento ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                animate={isBento ? { opacity: 1 } : { opacity: isActive ? 1 : 0.3 }}
                whileHover={isBento ? { y: -3, scale: 1.01 } : { scale: 1.05, y: -2 }}
                onMouseEnter={() => isBento ? setActiveBentoId(node.id) : setHoveredNode(node.id)}
                onMouseLeave={() => isBento ? setActiveBentoId(null) : setHoveredNode(null)}
                onClick={() => isBento && setActiveBentoId(activeBentoId === node.id ? null : node.id)}
                className={`
                  border backdrop-blur-md select-none group cursor-pointer transition-all duration-300
                  ${isBento
                    ? `p-6 rounded-2xl bg-[#0b0f13]/25 hover:bg-[#0b0f13]/70 flex ${node.id === 'more' ? 'flex-row items-center justify-between' : 'flex-col items-start justify-start'} ` + getBentoClasses(node.id)
                    : "absolute -translate-x-1/2 -translate-y-1/2 p-4 rounded-xl flex items-center gap-3 w-52 z-10 bg-brand-black/90"
                  }
                `}
                style={{
                  left: isBento ? 'auto' : `${node.x}%`,
                  top: isBento ? 'auto' : `${node.y}%`,
                  transform: isBento ? 'none' : 'translate(-50%, -50%)',
                  borderColor: isBento
                    ? (isBentoActive ? `${node.color}88` : 'rgba(255, 255, 255, 0.05)')
                    : (isHovered || isConnected ? `${node.color}55` : 'rgba(255, 255, 255, 0.06)'),
                  boxShadow: isBento
                    ? (isBentoActive ? `0 0 25px ${node.glowColor}` : 'none')
                    : (isHovered
                      ? `0 0 25px ${node.glowColor}`
                      : (!isBento && isConnected)
                        ? `0 0 12px ${node.glowColor}`
                        : 'none'),
                }}
              >
                {/* Glow backdrop on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                  style={{
                    background: `radial-gradient(circle, ${node.color}15 0%, transparent 80%)`,
                  }}
                />

                {/* Inner Border Ring */}
                <div className="absolute inset-[1px] rounded-xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                {/* Icon & Details Content block */}
                {isBento && node.id !== 'more' ? (
                  <div className="flex flex-col items-start justify-between h-full w-full">
                    {/* Icon Container */}
                    <div
                      className="w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        borderColor: `${node.color}33`,
                        backgroundColor: `${node.color}08`,
                      }}
                    >
                      <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg] scale-95">
                        {node.icon}
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="flex flex-col gap-1 w-full text-left">
                      <span className="text-white text-xs font-semibold tracking-tight leading-tight">
                        {node.name}
                      </span>
                      <p className="text-[11px] text-[#88929b] leading-relaxed">
                        {bentoDescriptions[node.id]}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className={isBento && node.id === 'more' ? "flex items-center justify-between w-full" : "contents"}>
                    <div className="flex items-center gap-4">
                      {/* Icon Container */}
                      <div
                        className="w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300"
                        style={{
                          borderColor: `${node.color}33`,
                          backgroundColor: `${node.color}08`,
                        }}
                      >
                        <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg] scale-95">
                          {node.icon}
                        </div>
                      </div>

                      {/* Text Details */}
                      <div className="flex flex-col">
                        <span className="text-white text-xs font-semibold tracking-tight leading-tight">
                          {node.name}
                        </span>
                      </div>
                    </div>

                    {isBento && node.id === 'more' && (
                      <span className="text-xs text-[#00E5FF] font-medium group-hover:underline flex items-center gap-1.5 pr-2 transition-colors">
                        Explore Custom Integrations
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    )}
                  </div>
                )}

                {/* Optional floating micro-visuals for Bento Grid Cards */}
                {isBento && node.id === 'fintech' && (
                  <div className="absolute right-6 top-6 flex items-center gap-1.5 opacity-60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    {/* <span className="text-[10px] text-brand-cyan uppercase font-mono tracking-widest">Active Rails</span> */}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        </div> {/* End of Large Rounded Container Card */}

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-white/5 my-12 md:my-16 lg:my-20" />

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-y-0 relative overflow-hidden">
          {stats.map((stat, idx) => {
            const x = xValues[idx];
            const opacity = opValues[idx];
            return (
              <motion.div
                key={idx}
                style={{ x, opacity }}
                whileHover="hover"
                className="flex flex-col items-center text-center gap-3.5 w-full lg:px-4 cursor-default group relative"
              >
                {/* Vertical Gradient Separator for Desktop */}
                {idx > 0 && (
                  <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                )}

                {/* Badge Circle Icon with spring rebound */}
                <motion.div
                  variants={{
                    hover: { scale: 1.08, y: -2 }
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center shrink-0 relative"
                  style={{
                    borderColor: `${stat.color}4D`,
                    backgroundColor: `${stat.color}0D`,
                    boxShadow: `0 0 20px ${stat.glowColor}`,
                  }}
                >
                  {/* Pulsing Accent Ring */}
                  <span 
                    className="absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none" 
                    style={{ 
                      border: `1px solid ${stat.color}`,
                      animationDuration: '3s'
                    }} 
                  />
                  <div
                    className="absolute inset-0.5 rounded-full opacity-60 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${stat.color}26 0%, transparent 70%)`
                    }}
                  />
                  <div className="relative z-10 scale-90 sm:scale-100">
                    {stat.icon}
                  </div>
                </motion.div>

                {/* Stat Text */}
                <div className="flex flex-col items-center">
                  <span className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight transition-transform duration-300 group-hover:scale-105 ${stat.textColor}`}>
                    {stat.num}
                  </span>
                  <span className="text-xs sm:text-sm text-[#88929b] font-medium mt-1 leading-snug group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
