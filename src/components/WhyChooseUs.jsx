import React from 'react';
import { X, Check, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
  const comparisonData = [
    {
      feature: 'Multiple Rejections',
      withoutPG: 'Automatic rejection without feedback',
      withPG: 'Expert consultation & routing to matching banks',
      highlight: true
    },
    {
      feature: 'Approval Turnaround',
      withoutPG: 'Weeks or months of manual verification',
      withPG: 'Fast approval via streamlined document flow',
      highlight: false
    },
    {
      feature: 'Payment Options',
      withoutPG: 'Limited payment channels & localized cards',
      withPG: '20+ international & local payment gateways',
      highlight: true
    },
    {
      feature: 'Merchant Support',
      withoutPG: 'Automated ticket replies & bots',
      withPG: 'Dedicated relationship manager on standby',
      highlight: false
    },
    {
      feature: 'Smart Routing',
      withoutPG: 'Single network routing with high drop rates',
      withPG: 'Dynamic smart routing with auto-retry loops',
      highlight: true
    },
    {
      feature: 'Transaction Failure Rate',
      withoutPG: '15% - 25% due to bank downtime',
      withPG: 'Extremely high success rate & failover nodes',
      highlight: false
    },
    {
      feature: 'Business Guidance',
      withoutPG: 'No post-integration operational advice',
      withPG: 'End-to-end business setup and MSME support',
      highlight: true
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF5722]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 relative z-10 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Why Choose OnePG
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">OnePG vs Others</h2>
          <p className="text-gray-400 text-sm">See the difference in onboarding turnaround, success ratios, and dedicated business care.</p>
        </div>

        {/* Table Container */}
        <div className="bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)] max-w-4xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-xs uppercase font-extrabold text-gray-400 tracking-wider">
                  <th className="px-6 py-5">Onboarding Metrics</th>
                  <th className="px-6 py-5 text-red-400">Without OnePG</th>
                  <th className="px-6 py-5 text-[#FF5722]">With OnePG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                {comparisonData.map((row) => (
                  <tr key={row.feature} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-1.5">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium flex items-center gap-2">
                      <X size={14} className="text-red-500/60 shrink-0" />
                      <span>{row.withoutPG}</span>
                    </td>
                    <td className={`px-6 py-4 font-semibold text-gray-200 ${row.highlight ? 'bg-[#FF5722]/5' : ''}`}>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#FF5722] shrink-0" />
                        <span>{row.withPG}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ready CTA */}
        <div className="text-center space-y-4">
          <h3 className="text-lg font-bold text-white">Ready to Experience the Difference?</h3>
          <Link 
            to="/login"
            className="inline-block bg-[#FF5722] hover:bg-[#e64e1e] text-white px-8 py-3.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,87,34,0.4)]"
          >
            Get Started Now
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
