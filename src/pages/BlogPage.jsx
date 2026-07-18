import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import blogPaymentGatewayImg from '../assets/blog-payment-gateway.avif';
import blogT0SettlementImg from '../assets/blog-t0-settlement.avif';
import blogFuturePaymentsImg from '../assets/blog-future-payments.avif';
import blogCrossBorderImg from '../assets/blog-cross-border.avif';
import blogPciDssImg from '../assets/blog-pci-dss.avif';
import blogSmartRoutingImg from '../assets/blog-smart-routing.avif';

const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      title: 'How to Choose the Right Payment Gateway for Your Business',
      category: 'Payment Gateway',
      date: 'May 15, 2026',
      readTime: '5 min read',
      image: blogPaymentGatewayImg,
      borderColor: 'group-hover:border-[#00E5FF]/30',
      tagColor: 'text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/20',
      desc: 'Understand the key metrics such as success rates, settlement cycles, local payment configurations, and PCI compliance when picking a merchant partner.',
      content: [
        { type: 'paragraph', text: 'Selecting a payment gateway merchant partner is one of the most critical decisions a modern e-commerce or digital business will make. The right gateway ensures transaction safety, increases sales conversions, and reduces operation overheads.' },
        { type: 'heading', text: 'Understanding Key Transaction Metrics' },
        { type: 'paragraph', text: 'Merchant business owners often evaluate gateways solely based on pricing (MDR). However, a cheaper gateway with a low success rate will cost you far more in abandoned checkouts and customer frustration. Prioritize gateways that offer dynamic routing and robust banking relationships to secure success rates above 95%.' },
        { type: 'heading', text: 'Settlement Cycles and Cash Flow' },
        { type: 'paragraph', text: 'A standard T+2 or T+3 settlement cycle means your money is locked up for days. If you are operating on tight working capital, seek partners that support faster settlement structures (like T+1 or T+0). Having instant access to your funds enables speedier stock rotation and immediate vendor payments.' },
        { type: 'quote', text: 'Prioritize gateways that support smart automatic reconciliation to eliminate manual operations logs.' }
      ]
    },
    {
      title: "T+0 Settlement - Why It's Important for Your Cash Flow",
      category: 'Business Tips',
      date: 'Apr 28, 2026',
      readTime: '4 min read',
      image: blogT0SettlementImg,
      borderColor: 'group-hover:border-[#FF5722]/30',
      tagColor: 'text-[#FF5722] bg-[#FF5722]/10 border-[#FF5722]/20',
      desc: 'Discover how same-day corporate settlements eliminate working capital blockages, allowing businesses to purchase stock and pay vendors instantly.',
      content: [
        { type: 'paragraph', text: 'In the traditional merchant ecosystem, settlement cycles are notoriously slow, taking anywhere from 24 to 72 hours for funds to hit a merchant’s bank account. This latency creates capital inefficiencies, especially for fast-growing companies that rely on rapid inventory turnover.' },
        { type: 'heading', text: 'What is T+0 Settlement?' },
        { type: 'paragraph', text: 'T+0 settlement refers to same-day corporate clearing where funds from customer payments are processed and deposited into the merchant\'s corporate account within hours, if not minutes, of the transaction. This eliminates the standard weekend clearing delays and ensures your bank account reflects your daily revenue.' },
        { type: 'heading', text: 'Unlocking Capital Velocity' },
        { type: 'paragraph', text: 'When you receive payments instantly, you don\'t need to depend on expensive short-term lines of credit or overdraft facilities to pay your suppliers. T+0 settlement acts as a multiplier for cash flow efficiency, allowing businesses to re-invest daily revenue straight back into marketing, product acquisition, and operational expenses.' },
        { type: 'quote', text: 'T+0 settlement reduces reliance on credit lines and lets your actual sales fuel growth directly.' }
      ]
    },
    {
      title: 'The Future of Digital Payments in India',
      category: 'Fintech News',
      date: 'Apr 10, 2026',
      readTime: '6 min read',
      image: blogFuturePaymentsImg,
      borderColor: 'group-hover:border-blue-500/30',
      tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      desc: 'An in-depth look at emerging frameworks like CBDC digital rupee, automated recurring cross-border credit transfers, and AI-led fraud checkers.',
      content: [
        { type: 'paragraph', text: 'India has established itself as the global leader in digital transaction volume, driven by the revolutionary Unified Payments Interface (UPI) framework. As we move into the next decade, the ecosystem is set to undergo further paradigm shifts.' },
        { type: 'heading', text: 'The Rise of Central Bank Digital Currency (CBDC)' },
        { type: 'paragraph', text: 'The Reserve Bank of India’s Digital Rupee (e₹) introduces programmable money to corporate workflows. Unlike retail UPI, CBDC transactions settled on the blockchain act as legal tender without intermediate clearing houses, allowing instant wholesale settlements and reduced transaction costs.' },
        { type: 'heading', text: 'AI-Led Fraud Checkers and Risk Mitigation' },
        { type: 'paragraph', text: 'With scale comes security challenges. Modern UPI providers are integrating machine learning nodes at the gateway level to check for anomalies in routing patterns, flagging potential fraud in real-time before transaction approval. This ensures higher security without adding checkout friction.' },
        { type: 'quote', text: 'Programmable money will allow business logic to be built directly into the cash representation itself.' }
      ]
    },
    {
      title: "Mastering Cross-Border B2B Payments: A Developer's Guide",
      category: 'Developer Hub',
      date: 'Mar 24, 2026',
      readTime: '7 min read',
      image: blogCrossBorderImg,
      borderColor: 'group-hover:border-purple-500/30',
      tagColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      desc: 'A deep-dive walkthrough on configuring multi-currency routing nodes, handling localized KYC mandates, and reducing FX spreads using automated hedging APIs.',
      content: [
        { type: 'paragraph', text: 'Developing software for global markets requires developers to think beyond national borders. Local payment methods, foreign exchange (FX) spreads, and compliance regulations differ wildly across jurisdictions.' },
        { type: 'heading', text: 'Configuring Multi-Currency Routing Nodes' },
        { type: 'paragraph', text: 'Instead of forcing international buyers to pay in your home currency—which incurs heavy FX markup and high abandonment rates—you should implement smart localized checkout nodes. By routing payments to local acquirers in each region, you can avoid cross-border interchange fees entirely.' },
        { type: 'heading', text: 'Managing Localized KYC Mandates' },
        { type: 'paragraph', text: 'Regulators around the world demand rigorous compliance checks for B2B transfers. Integrating robust webhooks that sync with KYC providers automatically before releasing transaction settlements reduces manual operation logs and protects your business from merchant risk.' },
        { type: 'quote', text: 'Localized routing nodes eliminate international interchange fees and convert higher sales rates.' }
      ]
    },
    {
      title: 'PCI-DSS v4.0 Compliance Checklist for E-Commerce Platforms',
      category: 'Security & Legal',
      date: 'Mar 08, 2026',
      readTime: '8 min read',
      image: blogPciDssImg,
      borderColor: 'group-hover:border-amber-500/30',
      tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      desc: 'Ensure your checkout flows comply with the latest global cardholder security guidelines. A step-by-step breakdown of network segregation and tokenized vaults.',
      content: [
        { type: 'paragraph', text: 'The Payment Card Industry Data Security Standard (PCI-DSS) has rolled out its latest major iteration, version 4.0. Merchants and e-commerce platforms must adapt their hosting environments to maintain compliance and secure customer credentials.' },
        { type: 'heading', text: 'Network Segregation and Sensitive Data Protection' },
        { type: 'paragraph', text: 'PCI-DSS v4.0 places a heavy focus on network isolation. Ensure that credit card raw data never touches your primary application servers. Use secure, tokenized iframe inputs provided by your gateway partner to isolate the cardholder data environment (CDE) entirely.' },
        { type: 'heading', text: 'Tokenized Vaults vs. Raw Storage' },
        { type: 'paragraph', text: 'Storing raw credit card numbers is a high-risk liability. Use secure tokenization systems to store sensitive card details. This replaces actual card numbers with non-sensitive reference tokens, ensuring that even in the event of a database breach, zero payment credentials are leaked.' },
        { type: 'quote', text: 'Secure card-tokenization abstracts risk out of your infrastructure and protects consumer data.' }
      ]
    },
    {
      title: 'Unlocking High Success Rates: Smart Routing Algorithms Explained',
      category: 'Optimization',
      date: 'Feb 15, 2026',
      readTime: '5 min read',
      image: blogSmartRoutingImg,
      borderColor: 'group-hover:border-emerald-500/30',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      desc: 'An engineering overview of dynamic transaction routing, automatic bank retry policies, and how smart failover rules can increase merchant sales by up to 12%.',
      content: [
        { type: 'paragraph', text: 'For high-volume merchants, a 1% increase in payment success rate can translate to millions in additional top-line revenue. Achieving high conversions requires moving away from static gateway routing to dynamic smart routing algorithms.' },
        { type: 'heading', text: 'The Mechanics of Dynamic Transaction Routing' },
        { type: 'paragraph', text: 'A smart routing algorithm acts as a real-time traffic controller for payments. When a customer clicks \'Pay\', the routing engine evaluates the health of multiple bank acquirers. If Bank A is experiencing high latency or downtime, the transaction is silently routed to Bank B, preventing checkout failure.' },
        { type: 'heading', text: 'Automatic Bank Retry Policies' },
        { type: 'paragraph', text: 'Many transaction failures are temporary network timeouts rather than insufficient funds. By implementing smart, instant retry logic on secondary rails, you can recover up to 15% of failing transactions without requiring the customer to re-enter their credentials.' },
        { type: 'quote', text: 'Real-time gateway health monitoring ensures that transaction traffic always finds a healthy banking path.' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 md:pt-16 pb-12 md:pb-20 w-full relative">
        <div className="absolute top-0 right-1/4 w-[30vw] h-[30vw] bg-[#FF5722]/5 rounded-full blur-[100px] pointer-events-none" />

        {selectedBlog ? (
          /* Detailed Full Article View */
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            {/* Back Navigation */}
            <button 
              onClick={() => {
                setSelectedBlog(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group text-gray-400 hover:text-white transition-colors text-xs sm:text-sm font-semibold flex items-center gap-2 mb-6"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Articles
            </button>

            {/* Category and Stats */}
            <div className="space-y-4">
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded border uppercase tracking-wider ${selectedBlog.tagColor}`}>
                {selectedBlog.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {selectedBlog.title}
              </h1>
              <div className="flex items-center gap-6 text-xs sm:text-sm font-semibold text-gray-500">
                <span className="flex items-center gap-1.5"><Calendar size={13} /> {selectedBlog.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {selectedBlog.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="w-full h-64 sm:h-96 md:h-[450px] border border-white/5 rounded-2xl overflow-hidden relative">
              <img 
                src={selectedBlog.image} 
                alt={selectedBlog.title} 
                width="1024"
                height="1024"
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-40" />
            </div>

            {/* Article Description Summary */}
            <p className="text-base sm:text-lg text-gray-400 border-l-2 border-[#FF5722] pl-4 italic font-medium">
              {selectedBlog.desc}
            </p>

            {/* Detailed Body Content */}
            <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed max-w-none pt-4">
              {selectedBlog.content && selectedBlog.content.map((item, index) => {
                if (item.type === 'heading') {
                  return (
                    <h2 key={index} className="text-xl sm:text-2xl font-bold text-white pt-6 pb-2">
                      {item.text}
                    </h2>
                  );
                } else if (item.type === 'quote') {
                  return (
                    <blockquote key={index} className="border-l-4 border-[#00E5FF] pl-5 italic text-gray-400 my-6 bg-white/[0.02] py-4 pr-4 rounded-r-lg">
                      "{item.text}"
                    </blockquote>
                  );
                } else {
                  return (
                    <p key={index} className="font-light">
                      {item.text}
                    </p>
                  );
                }
              })}
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-white/5 pt-8 mt-12 flex justify-between items-center">
              <button 
                onClick={() => {
                  setSelectedBlog(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group text-gray-400 hover:text-white transition-colors text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Articles
              </button>
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-gray-500 hover:text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                Scroll to Top
              </button>
            </div>
          </div>
        ) : (
          /* Article Grid View */
          <div className="space-y-12">
            {/* Page Title & Breadcrumb Header */}
            <div className="space-y-2 border-b border-white/10 pb-4 text-center lg:text-left mb-6 sm:mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <Link to="/" className="hover:text-[#FF5722] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-[#FF5722]">Resources & Blog</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF] tracking-tight">
                Resources & Blog
              </h1>
            </div>

            {/* Blog Cards Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {blogs.map((blog) => (
                <div 
                  key={blog.title}
                  onClick={() => {
                    setSelectedBlog(blog);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`group bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:bg-white/[0.02] transition-all duration-300 min-h-[420px] cursor-pointer ${blog.borderColor}`}
                >
                  <div>
                    {/* Real cover image */}
                    <div className="h-48 border-b border-white/5 relative flex items-center justify-center overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        width="1024"
                        height="1024"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`text-[9px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${blog.tagColor}`}>
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-4 text-[10px] font-semibold text-gray-500">
                        <span className="flex items-center gap-1"><Calendar size={11} /> {blog.date}</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {blog.readTime}</span>
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug group-hover:text-[#FF5722] transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed font-medium">
                        {blog.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button className="text-xs font-bold text-[#FF5722] hover:text-[#e64e1e] transition-colors flex items-center gap-1">
                      Read Full Article
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
