import { useState, useEffect } from 'react'
import FeatureCard from './components/FeatureCard'
import PricingCard from './components/PricingCard'
import About from './pages/About'
import Docs from './pages/Docs'
import Success from './pages/Success'
import BetaModal from './components/BetaModal'
import { generateBrandWithAI } from './utils/aiEngine'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [brandName, setBrandName] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStatus, setGenerationStatus] = useState('')
  const [aiResult, setAiResult] = useState(null)
  const [error, setError] = useState(null)
  const [isBetaOpen, setIsBetaOpen] = useState(false)
  const [contactSuccess, setContactSuccess] = useState(false)
  const [brandHistory, setBrandHistory] = useState(() => {
    const saved = localStorage.getItem('brand_history')
    return saved ? JSON.parse(saved) : []
  })

  const [activeTab, setActiveTab ] = useState('identity')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    localStorage.setItem('brand_history', JSON.stringify(brandHistory))
  }, [brandHistory])

  const handleGenerate = async () => {
    if (!brandName) return
    setIsGenerating(true)
    setGenerationStatus('Initializing Engine...')
    setError(null)
    setAiResult(null)
    
    try {
      const result = await generateBrandWithAI(brandName, (status) => {
        setGenerationStatus(status);
      })
      setIsGenerating(false)
      setGenerationStatus('')
      setAiResult(result)
      setBrandHistory(prev => [result, ...prev].filter((b, i, a) => a.findIndex(t => t.name === b.name) === i).slice(0, 5))
      setActiveTab('identity')
    } catch (err) {
      console.error(err)
      setError(err.message || "Something went wrong during generation.")
      setIsGenerating(false)
      setGenerationStatus('')
    }
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSuccess(true)
    setTimeout(() => setContactSuccess(false), 5000)
  }

  const renderHome = () => (
    <>
      <main className="pt-24 md:pt-32 pb-20 px-4">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto text-center mb-24 md:mb-32">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-widest animate-pulse">
            Introducing Idea2Brand 2.0
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[1.1] md:leading-[0.9]">
            Ignite Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Visual Identity
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 md:mb-12 font-light leading-relaxed">
            The all-in-one AI engine that generates premium branding, high-converting copy, and viral social strategies in milliseconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => setIsBetaOpen(true)} className="px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-2xl font-bold text-base md:text-lg transition-all shadow-xl shadow-blue-600/25">
              Get Early Access
            </button>
            <button className="px-8 md:px-10 py-4 md:py-5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-2xl font-bold text-base md:text-lg transition-all">
              Watch Demo
            </button>
          </div>
        </section>

        {/* Brand Maker Section */}
        <section id="brand-maker" className="max-w-6xl mx-auto mb-32 md:mb-40 px-4">
          <div className="relative p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-600/10 blur-3xl rounded-full -mr-20 -mt-20"></div>
            
            <div className="relative z-10 grid lg:grid-cols-[1fr_500px] gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Test the Engine</h2>
                <p className="text-slate-400 text-base md:text-lg mb-8">
                  Enter your brand name to see how our AI visualizes your future identity instantly.
                </p>
                <div className="space-y-4 mb-8">
                  <input 
                    type="text" 
                    placeholder="e.g. NeonPulse or 'Clothing Brand'"
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-6 py-4 focus:border-blue-500 outline-none text-white transition-all shadow-inner"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !brandName}
                    className="w-full py-4 bg-white text-slate-950 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (generationStatus || 'AI is Thinking...') : 'Preview My Brand'}
                  </button>

                  <div className="pt-6 border-t border-slate-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">Engine: Ultra-Stable (Demo Mode)</span>
                    </div>
                    <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">Node: Local-01</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-red-400 text-xs font-medium text-center">{error}</p>
                  </div>
                )}

                {brandHistory.length > 0 && (
                   <div className="pt-8 border-t border-slate-800">
                     <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Recent Brands</h4>
                     <div className="flex flex-wrap gap-3">
                       {brandHistory.map((h, i) => (
                         <div key={i} onClick={() => { setAiResult(h); setBrandName(h.name); }} className="flex gap-3 items-center px-4 py-2 bg-slate-950/30 border border-slate-800 rounded-full cursor-pointer hover:border-blue-500/50 transition-all group">
                           <div className="w-2 h-2 rounded-full" style={{ background: h.identity.colors.hex[0] }}></div>
                           <span className="text-slate-300 text-xs font-bold">{h.name}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                )}
              </div>
              
              <div className="bg-slate-950/50 min-h-[600px] rounded-[2rem] border border-slate-700 flex flex-col p-6 md:p-8 overflow-hidden shadow-2xl relative">
                {isGenerating ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-6">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-blue-400 font-mono text-xs animate-pulse tracking-[0.4em] font-black uppercase text-center">SYNTHESIZING IDENTITY...</p>
                  </div>
                ) : aiResult ? (
                  <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col h-full overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-800 shrink-0">
                      <div 
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black italic text-white shrink-0 shadow-lg"
                        style={{ background: `linear-gradient(to tr, ${aiResult.identity.colors.hex[0]}, ${aiResult.identity.colors.hex[1]})` }}
                      >
                        {brandName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white leading-none mb-1">{brandName}</h3>
                        <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">{aiResult.identity.colors.name} Palette</p>
                      </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide border-b border-slate-800/50 shrink-0">
                       {['Identity', 'Content', 'Social', 'Strategy'].map(tab => (
                         <button 
                           key={tab} 
                           onClick={() => setActiveTab(tab.toLowerCase())}
                           className={`text-[10px] font-black uppercase tracking-[0.15em] pb-3 px-1 transition-all whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
                         >
                           {tab}
                         </button>
                       ))}
                    </div>

                    {/* Tabs Content Area */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                       {activeTab === 'identity' && (
                         <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                            {/* Visual Logo Concept */}
                            <div className="p-6 bg-slate-900/50 rounded-[2rem] border border-slate-800 flex flex-col items-center text-center">
                               <p className="text-[10px] text-slate-500 uppercase font-black mb-6 tracking-widest">Logo Concept</p>
                               <div 
                                 className="w-24 h-24 mb-6 flex items-center justify-center text-4xl font-black italic text-white shadow-2xl relative group cursor-pointer overflow-hidden transition-transform hover:scale-110"
                                 style={{ 
                                   background: `linear-gradient(to tr, ${aiResult.identity.colors.hex[0]}, ${aiResult.identity.colors.hex[1]})`,
                                   borderRadius: aiResult.identity.logoStyle === 'circle' ? '50%' : 
                                                 aiResult.identity.logoStyle === 'triangle' ? '30% 70% 70% 30% / 30% 30% 70% 70%' : 
                                                 aiResult.identity.logoStyle === 'abstract' ? '60% 40% 30% 70% / 60% 30% 70% 40%' : '1.5rem'
                                 }}
                               >
                                 <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 {brandName.charAt(0).toUpperCase()}
                               </div>
                               <p className="text-white text-sm font-black uppercase tracking-widest">{aiResult.identity.logoStyle} Geometric Mark</p>
                            </div>

                            {/* Color Palette Preview */}
                            <div>
                               <p className="text-[10px] text-slate-500 uppercase font-black mb-3 tracking-widest border-b border-slate-800 pb-2">Integrated Palette</p>
                               <div className="grid grid-cols-4 gap-2">
                                  {aiResult.identity.colors.hex.map((c, i) => (
                                    <div key={i} className="group flex flex-col gap-2">
                                       <div className="h-12 w-full rounded-lg border border-white/5 shadow-inner transition-transform hover:scale-105" style={{ backgroundColor: c }}></div>
                                       <span className="text-[8px] text-slate-500 font-mono text-center group-hover:text-blue-400">{c}</span>
                                    </div>
                                  ))}
                               </div>
                            </div>

                            {/* Typography Preview */}
                            <div className="grid grid-cols-2 gap-4">
                               <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-3">Primary Font</p>
                                  <p className="text-xl text-white font-black leading-none mb-1">Aa</p>
                                  <p className="text-[10px] text-slate-400 font-medium">{aiResult.identity.typography.primary}</p>
                               </div>
                               <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-3">Accent Font</p>
                                  <p className="text-xl text-white font-mono leading-none mb-1">Aa</p>
                                  <p className="text-[10px] text-slate-400 font-medium">{aiResult.identity.typography.secondary}</p>
                               </div>
                            </div>

                            <div>
                               <p className="text-[10px] text-slate-500 uppercase font-black mb-2 tracking-widest">Master Tagline</p>
                               <p className="text-xl font-bold text-white leading-tight italic">"{aiResult.identity.tagline}"</p>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed">{aiResult.identity.description}</p>
                         </div>
                       )}

                       {activeTab === 'content' && (
                         <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div>
                               <p className="text-[10px] text-slate-500 uppercase font-black mb-3 tracking-widest border-b border-slate-800 pb-2">Mission & Story</p>
                               <p className="text-slate-300 text-sm leading-relaxed">{aiResult.mission.about}</p>
                            </div>
                            <div className="p-5 bg-blue-600/5 rounded-2xl border border-blue-600/20">
                               <p className="text-[10px] text-blue-400 uppercase font-bold mb-2 tracking-widest">Elevator Pitch</p>
                               <p className="text-white text-sm font-medium leading-relaxed italic italic">"{aiResult.copy.elevatorPitch}"</p>
                            </div>
                         </div>
                       )}

                       {activeTab === 'social' && (
                         <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                            <p className="text-[10px] text-slate-500 uppercase font-black mb-3 tracking-widest border-b border-slate-800 pb-2">Launch Templates</p>
                            {aiResult.social.map((s, idx) => (
                               <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
                                  <div className="absolute top-0 right-0 px-3 py-1 bg-slate-800 text-blue-400 text-[8px] font-black uppercase tracking-widest rounded-bl-xl">{s.platform}</div>
                                  <p className="text-slate-300 text-[13px] leading-relaxed mt-2">{s.post}</p>
                               </div>
                            ))}
                         </div>
                       )}

                       {activeTab === 'strategy' && (
                         <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                            <p className="text-[10px] text-slate-500 uppercase font-black mb-3 tracking-widest border-b border-slate-800 pb-2">Tactical Insights</p>
                            {aiResult.strategy.map((s, idx) => (
                               <div key={idx} className="flex gap-4 p-4 bg-gradient-to-r from-blue-600/5 to-transparent rounded-2xl border border-slate-800 items-start">
                                  <span className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 text-[10px] font-black">{idx + 1}</span>
                                  <div>
                                     <p className="text-[10px] text-slate-500 uppercase font-black mb-1">{s.goal}</p>
                                     <p className="text-white text-[13px] leading-relaxed">{s.action}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                       )}
                    </div>

                    <div className="sticky bottom-0 left-0 right-0 pt-6 bg-slate-950/90 backdrop-blur-sm shrink-0">
                      <button onClick={() => setIsBetaOpen(true)} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20">
                         Generate Full Brand Bible
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-6 opacity-40">
                    <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center border border-slate-800 text-slate-600 shadow-inner">
                       <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] italic">Awaiting Brand Input...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="max-w-7xl mx-auto mb-32 md:mb-40 px-4">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Creative Tools</h2>
            <p className="text-slate-400 text-base md:text-lg">Everything you need to scale your digital presence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard delay={100} title="Brand Identity" desc="Create cohesive logos, color palettes, and typography guides that define your unique market position instantly." icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 115.656 5.656L10 17.657" /></svg>} />
            <FeatureCard delay={200} title="AI Content Engine" desc="Generate high-converting landing page copy, ad scripts, and blog posts tailored to your brand's unique tone of voice." icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>} />
            <FeatureCard delay={300} title="Social Velocity" desc="Predict trends and generate viral-ready social media content calendars optimized for maximum audience engagement." icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
          </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className="max-w-4xl mx-auto mb-32 md:mb-40 px-4">
          <div className="p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-900/30 border border-slate-800 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Spark Something</h2>
            <p className="text-slate-400 text-base md:text-lg mb-10 md:mb-12">Ready to transform your brand? Get in touch with our experts.</p>
            {contactSuccess ? (
              <div className="bg-blue-600/10 border border-blue-500/30 p-8 rounded-2xl animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Received!</h3>
                <p className="text-slate-400">Our team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto" onSubmit={handleContactSubmit}>
                <input required type="text" placeholder="Full Name" className="bg-slate-950 border border-slate-800 rounded-xl px-6 py-4 focus:border-blue-500 outline-none text-white transition-all text-sm" />
                <input required type="email" placeholder="Email Address" className="bg-slate-950 border border-slate-800 rounded-xl px-6 py-4 focus:border-blue-500 outline-none text-white transition-all text-sm" />
                <textarea required placeholder="Your Message" className="bg-slate-950 border border-slate-800 rounded-xl px-6 py-4 focus:border-blue-500 outline-none text-white transition-all sm:col-span-2 h-32 text-sm"></textarea>
                <button type="submit" className="sm:col-span-2 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 text-sm">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  )

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <BetaModal 
        isOpen={isBetaOpen} 
        onClose={() => setIsBetaOpen(false)} 
        onSuccess={() => {
          setIsBetaOpen(false);
          setCurrentPage('success');
          window.scrollTo(0, 0);
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#020617]/80 backdrop-blur-md border-slate-800' : 'bg-transparent border-transparent'} py-3 md:py-4 px-4 md:px-8 flex justify-between items-center`}>
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setCurrentPage('home')}
        >
          <div className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            Idea2Brand
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 translate-y-0.5">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Live</span>
          </div>
        </div>
        <div className="hidden md:flex space-x-8 font-bold text-xs uppercase tracking-[0.2em] text-slate-400">
          <button onClick={() => setCurrentPage('home')} className={`hover:text-blue-400 transition-colors ${currentPage === 'home' ? 'text-blue-400' : ''}`}>Home</button>
          <button onClick={() => setCurrentPage('about')} className={`hover:text-blue-400 transition-colors ${currentPage === 'about' ? 'text-blue-400' : ''}`}>About</button>
          <button onClick={() => setCurrentPage('docs')} className={`hover:text-blue-400 transition-colors ${currentPage === 'docs' ? 'text-blue-400' : ''}`}>Docs</button>
          <a href="#brand-maker" onClick={() => setCurrentPage('home')} className="hover:text-blue-400 transition-colors">Generator</a>
          <a href="#features" onClick={() => setCurrentPage('home')} className="hover:text-blue-400 transition-colors">Features</a>
        </div>
        <button 
          onClick={() => setIsBetaOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 md:px-7 py-2.5 rounded-full font-black text-xs transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
        >
          Get Early Access
        </button>
      </nav>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'about' && <About />}
        {currentPage === 'docs' && <Docs />}
        {currentPage === 'success' && <Success onReturn={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} />}
      </div>

      <footer className="border-t border-slate-800 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold text-white">Idea2Brand</div>
          <div className="flex space-x-8 md:space-x-12 text-slate-500 text-xs font-medium">
            <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
          </div>
          <div className="text-slate-600 text-[10px] md:text-xs tracking-widest uppercase italic font-bold">© 2026 Idea2Brand. FULLY FUNCTIONAL MVP.</div>
        </div>
      </footer>
    </div>
  )
}

export default App

