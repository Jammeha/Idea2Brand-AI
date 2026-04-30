const adjectives = ["Bold", "Iconic", "Ethereal", "Dynamic", "Minimalist", "Aggressive", "Serene", "Quantum", "Primal", "Luminous"];
const colors = [
  { name: "Cyber Neon", hex: ["#00f2fe", "#4facfe", "#7117ea", "#ea6227"] },
  { name: "Midnight Rose", hex: ["#434343", "#000000", "#e91e63", "#9c27b0"] },
  { name: "Arctic Frost", hex: ["#e6e9f0", "#eef1f5", "#70e1f5", "#ffd194"] },
  { name: "Solar Flare", hex: ["#f83600", "#f9d423", "#ff4e50", "#f9d423"] },
  { name: "Deep Forest", hex: ["#134e5e", "#71b280", "#2c3e50", "#000000"] },
];
const tones = ["Professional & Cold", "Friendly & Vibrant", "Luxury & Minimal", "Cutting-edge & Experimental", "Organic & Warm"];
const logos = ["circle", "square", "triangle", "abstract", "minimal"];

export const generateBrandContext = (input) => {
  const name = input; 
  const seed = name.length % adjectives.length;
  const adj = adjectives[seed];
  const colorSeed = (name.length * 7) % colors.length;
  const toneSeed = (name.length * 3) % tones.length;
  const logoSeed = (name.length * 2) % logos.length;

  return {
    id: Date.now(),
    name: name,
    identity: {
      tagline: `${adj} Style for Everyone.`,
      description: `A modern brand built on ${adj.toLowerCase()} ideas and a passion for great design.`,
      tone: tones[toneSeed],
      colors: colors[colorSeed],
      logoStyle: logos[logoSeed],
      typography: {
        primary: "Inter Tight",
        secondary: "Space Mono",
        vibe: "Clean & Modern"
      }
    },
    mission: {
      about: `${name} was started because we believe that professional design shouldn't be a struggle. We take the hard work out of branding so you can focus on your vision.`,
      vision: `To help every creator build a ${adj.toLowerCase()} brand that stands out in the real world.`,
    },
    copy: {
      heroTitle: `Launch your ${name} journey today.`,
      elevatorPitch: `${name} uses smart AI to help you create your brand identity instantly and get your business growing faster than ever.`,
      cta: `Get Started with ${name}`
    },
    social: [
      { platform: "Instagram", post: `Finally, a brand that looks as good as it feels. Say hello to ${name}. ✨ #NewBrand` },
      { platform: "Twitter", post: `We just launched ${name}! Built for the future of style. Check us out! 🚀` },
    ],
    strategy: [
      { goal: "Getting Noticed", action: "Share your story on social media to build a real connection with fans." },
      { goal: "Building Trust", action: "Collab with people who love your niche to spread the word naturally." },
      { goal: "Fast Growth", action: "Give early supporters a special 'founder' badge or discount." },
    ],
    timestamp: new Date().toLocaleDateString()
  };
};
