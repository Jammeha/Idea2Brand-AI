import React from 'react';

const About = () => {
  return (
    <div className="pt-32 pb-20 px-8 max-w-6xl mx-auto">
      <div className="text-center mb-24">
        <h1 className="text-6xl font-black text-white mb-8">Our Vision</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          At BrandSpark AI, we believe every brand has a unique story waiting to be told. Our mission is to democratize high-end design and strategy through the power of artificial intelligence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white">Built by Creatives, <br /><span className="text-blue-500">Powered by Data.</span></h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            We combined decades of agency experience with cutting-edge neural networks to create a platform that understands nuances, trends, and human emotion.
          </p>
          <div className="flex gap-8 py-8 border-t border-slate-800">
            <div>
              <div className="text-3xl font-black text-white">500k+</div>
              <div className="text-slate-500 text-sm italic uppercase tracking-widest">Brands Sparked</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">120+</div>
              <div className="text-slate-500 text-sm italic uppercase tracking-widest">Countries</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-600/20 blur-3xl -z-10 rounded-full"></div>
          <div className="aspect-square bg-slate-800/50 rounded-[4rem] border border-slate-700 p-12 flex flex-col justify-center">
            <blockquote className="text-2xl text-white font-medium italic mb-6">
              "BrandSpark didn't just give us a logo; they gave us a soul."
            </blockquote>
            <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">— Sarah Chen, CEO of Luminar</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-12">Meet the Innovators</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group">
              <div className="aspect-[4/5] bg-slate-900 border border-slate-800 rounded-3xl mb-4 transition-all group-hover:border-blue-500/50 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6 text-left">
                  <div className="text-white font-bold">Team Member {i}</div>
                  <div className="text-blue-500 text-xs font-medium uppercase tracking-widest">Design Lead</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
