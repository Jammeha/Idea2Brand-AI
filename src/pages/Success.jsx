import React from 'react';

const Success = ({ onReturn }) => {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <div className="w-24 h-24 bg-blue-600 rounded-[2rem] mx-auto mb-10 flex items-center justify-center shadow-2xl shadow-blue-600/30 animate-bounce">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">You're on the List!</h1>
        <p className="text-slate-400 text-lg md:text-xl mb-12 font-light leading-relaxed">
          Welcome to the early access circle. We've reserved your spot in the creative revolution. Your professional "Brand Bible" tools are being prepared.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <p className="text-blue-400 font-black text-xs uppercase mb-2">Priority</p>
            <p className="text-white text-sm">#124 in queue</p>
          </div>
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <p className="text-blue-400 font-black text-xs uppercase mb-2">Status</p>
            <p className="text-white text-sm">Verified</p>
          </div>
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <p className="text-blue-400 font-black text-xs uppercase mb-2">Rewards</p>
            <p className="text-white text-sm">Bonus Credits</p>
          </div>
        </div>
        
        <button 
          onClick={onReturn}
          className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all"
        >
          Return to Generator
        </button>
      </div>
    </div>
  );
};

export default Success;
