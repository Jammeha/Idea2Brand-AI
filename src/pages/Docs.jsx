import React from 'react';

const Docs = () => {
  const sections = [
    {
      id: "engine",
      title: "The BrandSpark Engine",
      content: "Our AI generation engine doesn't just pick random names. It analyzes the 'seed' of your brand name to generate consistent, professional identity packs. Every time you entered 'clothing', the AI synchronized its algorithms to produce a specific set of design tokens tailored for that visionary path.",
      tip: "Use clear, simple names for the best results. The engine interprets industry keywords naturally."
    },
    {
      id: "design",
      title: "Visual Brand Boards",
      content: "BrandSpark designs more than a banner. The Identity tab produces a full design board including a 'Geometric Logo Mark', a 4-color 'Integrated Palette', and 'Typography Pairs'. These are real-world design tokens you can use to build your website, app, or physical products.",
      tags: ["Logo Concepts", "Exact Hex Codes", "Font Lab"]
    },
    {
      id: "strategy",
      title: "Human-Centric Copy",
      content: "We use 'Plain English' AI. This means your Missions and Elevator Pitches are reframed to be understandable by anyone. No corporate jargon—just clear communication that helps you connect with your customers and investors immediately.",
      example: "Old: 'Synchronize creative workflow' → New: 'Taking the hard work out of branding.'"
    },
    {
      id: "beta",
      title: "Early Access & Persistence",
      content: "Your work is automatically saved to your browser's local storage. This allows you to revisit 'Recent Sparks' even after a refresh. To export your brand for professional use, join our Early Access program to receive a high-resolution PDF Brand Bible.",
      linkText: "Get Early Access Now →"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto min-h-screen">
      <div className="mb-20">
        <div className="inline-block px-3 py-1 mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest">
           System Documentation
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
          Master the <br />
          <span className="text-slate-500">Creative Engine.</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-light">
          Learn how BrandSpark AI transforms simple ideas into high-fidelity business identities.
        </p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-16">
        {/* Sticky Sidebar */}
        <aside className="hidden lg:block sticky top-40 h-fit space-y-6">
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-4">On this page</p>
          <nav className="space-y-1">
            {sections.map((s) => (
              <a 
                key={s.id} 
                href={`#${s.id}`} 
                className="block py-2 text-sm font-bold text-slate-400 hover:text-blue-400 transition-all border-l-2 border-transparent hover:border-blue-500 pl-4"
              >
                {s.title}
              </a>
            ))}
          </nav>
          <div className="pt-8 pt-8">
             <div className="p-5 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl">
                <p className="text-white text-xs font-bold mb-2">Need Help?</p>
                <p className="text-slate-400 text-[10px] leading-relaxed mb-4">Our support team is active 24/7 during the Early Access period.</p>
                <a href="#contact" className="text-blue-400 text-[10px] font-black uppercase tracking-widest hover:underline">Contact Support →</a>
             </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="space-y-24">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-40 group">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-8 h-px bg-blue-500/30 group-hover:w-16 transition-all"></div>
                 <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">{s.title}</h2>
              </div>
              
              <div className="p-8 md:p-10 bg-slate-900/30 border border-slate-800/80 rounded-[2rem] hover:border-slate-700 transition-all shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl"></div>
                <p className="text-slate-400 leading-relaxed text-lg md:text-xl font-light mb-8 italic">{s.content}</p>
                
                {s.tip && (
                   <div className="p-5 bg-blue-600/5 border-l-4 border-blue-500 rounded-tr-xl rounded-br-xl mb-6">
                      <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">Developer Tip</p>
                      <p className="text-slate-300 text-sm italic">"{s.tip}"</p>
                   </div>
                )}

                {s.tags && (
                   <div className="flex flex-wrap gap-2">
                      {s.tags.map(t => (
                        <span key={t} className="px-3 py-1 bg-slate-950/80 border border-slate-800 rounded-lg text-slate-500 text-[9px] font-black uppercase tracking-widest">#{t}</span>
                      ))}
                   </div>
                )}

                {s.example && (
                   <div className="p-5 bg-slate-950/50 border border-slate-800 rounded-2xl font-mono text-xs">
                      <p className="text-slate-600 mb-2">// Change Log</p>
                      <p className="text-blue-400">{s.example}</p>
                   </div>
                )}

                {s.linkText && (
                   <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all">
                      {s.linkText}
                   </button>
                )}
              </div>
            </section>
          ))}

          {/* FAQ or Footer-like section inside Docs */}
          <section className="pt-16 border-t border-slate-800">
             <h3 className="text-xl font-black text-white mb-8">Frequently Asked Questions</h3>
             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <p className="text-white text-sm font-bold">Is the generation truly unique?</p>
                   <p className="text-slate-500 text-sm leading-relaxed">Yes, the engine uses a specific seed key for every input to ensure your combination of colors and fonts is unique to your brand name.</p>
                </div>
                <div className="space-y-2">
                   <p className="text-white text-sm font-bold">Can I export the logos?</p>
                   <p className="text-slate-500 text-sm leading-relaxed">Currently, you can save the results locally. High-resolution vector exports (SVG/PDF) are available in the Professional plan.</p>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Docs;
