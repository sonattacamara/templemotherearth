import { motion } from "framer-motion";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

interface MonthlyThemeCardProps {
  month: string;
  theme: string;
  desc: string;
  backContent: string[];
  icon: React.ReactNode;
  index: number;
}

const MonthlyThemeCard = ({ month, theme, desc, backContent, icon, index }: MonthlyThemeCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* ─── FRONT ─── */}
        <div
          className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.12)] p-8 text-center hover:border-[hsla(45,70%,49%,0.3)] transition-colors"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-[hsl(45,70%,49%)] mb-4 block">{icon}</span>
          <p className="font-sans text-[8px] tracking-[3px] uppercase text-[hsl(35,20%,50%)] mb-2">{month}</p>
          <h3 className="font-serif italic text-[22px] text-[hsl(45,70%,55%)] mb-3">{theme}</h3>
          <p className="text-[14px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-4">{desc}</p>
          <p className="font-sans text-[7px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] opacity-60">
            Tap to read more
          </p>
        </div>

        {/* ─── BACK ─── */}
        <div
          className="absolute inset-0 bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.25)] p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-sans text-[8px] tracking-[3px] uppercase text-[hsl(45,70%,49%)]">{month}</p>
              <RotateCcw className="h-3.5 w-3.5 text-[hsl(35,20%,50%)]" />
            </div>
            <h3 className="font-serif italic text-[18px] text-[hsl(45,70%,55%)] mb-4">{theme}</h3>
            <div className="space-y-3">
              {backContent.map((line, i) => (
                <p key={i} className="text-[13px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <p className="font-sans text-[7px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] opacity-60 text-center mt-4">
            Tap to return
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MonthlyThemeCard;
