import React from 'react';

const BetaModal = ({ isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-[2.5rem] p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-3xl -mr-16 -mt-16"></div>
        
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-xl shadow-blue-600/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Secure Early Access</h2>
          <p className="text-slate-400 mb-8">Be the first to harness the full power of Idea2Brand 2.0. Join our exclusive early access list today.</p>
          
          <form className="space-y-4" onSubmit={(e) => { 
            e.preventDefault(); 
            const email = e.target[0].value;
            const signups = JSON.parse(localStorage.getItem('beta_signups') || '[]');
            localStorage.setItem('beta_signups', JSON.stringify([...signups, { email, date: new Date().toISOString() }]));
            onSuccess(); 
          }}>
            <input type="email" required placeholder="name@company.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-6 py-4 focus:border-blue-500 outline-none text-white transition-all" />
            <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
              Request Access
            </button>
            <p className="text-slate-500 text-xs mt-4 italic">No credit card required. No spam, ever.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BetaModal;
