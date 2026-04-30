import React from 'react';

const PricingCard = ({ title, price, features, recommended }) => {
  return (
    <div className={`relative p-8 rounded-3xl border ${recommended ? 'bg-blue-600 border-blue-400 scale-105 z-10 shadow-2xl shadow-blue-600/20' : 'bg-slate-900/50 border-slate-800'} transition-all duration-300 hover:transform hover:scale-[1.02]`}>
      {recommended && (
        <div className="absolute top-0 right-8 -translate-y-1/2 bg-white text-blue-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
          Recommended
        </div>
      )}
      <h3 className={`text-xl font-bold mb-2 ${recommended ? 'text-white' : 'text-slate-300'}`}>{title}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-black text-white">${price}</span>
        <span className="text-slate-400 text-sm">/mo</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <svg className={`w-5 h-5 ${recommended ? 'text-blue-200' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={recommended ? 'text-blue-50' : 'text-slate-400'}>{f}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${recommended ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
        Get Started
      </button>
    </div>
  );
};

export default PricingCard;
