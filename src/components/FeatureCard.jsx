import React from 'react';

const FeatureCard = ({ title, desc, icon, delay }) => {
  return (
    <div 
      className="group relative p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 backdrop-blur-xl flex flex-col items-start text-left"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute -inset-px bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative mb-6 p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      
      <h3 className="relative text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      
      <p className="relative text-slate-400 text-lg leading-relaxed group-hover:text-slate-300 transition-colors">
        {desc}
      </p>

      <div className="relative mt-8 pt-6 border-t border-slate-700/50 w-full flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Learn More</span>
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );
};

export default FeatureCard;
