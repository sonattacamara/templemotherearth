import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

import founderSonatta from "@/assets/founder-sonatta.jpg";
import founderJames from "@/assets/founder-james.jpg";
import facilitatorGeorge from "@/assets/facilitator-george-new.jpg";
import facilitatorDebra from "@/assets/facilitator-debra.jpg";
import facilitatorSpencer from "@/assets/facilitator-spencer.jpg";
import facilitatorSamira from "@/assets/facilitator-samira.jpg";
import facilitatorJala from "@/assets/facilitator-jala.jpg";
import facilitatorRama from "@/assets/facilitator-rama.jpg";
import kingJamesFacilitator from "@/assets/upload-king-james-facilitator.png";

const facilitators = [
  {
    name: "Sonatta Camara",
    role: "Founder & High Priestess",
    img: founderSonatta,
    specialties: ["Kambo", "Hapé", "Cacao", "Sacred Tea"],
  },
  {
    name: "King James",
    role: "Co-Founder & Kambo Facilitator",
    img: founderJames,
    specialties: ["Kambo", "Hapé", "Sananga"],
  },
  {
    name: "Dr. George Xavier Love, Jr.",
    role: "High Priest",
    img: facilitatorGeorge,
    specialties: ["Spiritual Counsel", "Kemetic Teachings"],
  },
  {
    name: "Debra",
    role: "Facilitator",
    img: facilitatorDebra,
    specialties: ["Cacao", "Sacred Tea", "Yin Yoga"],
  },
  {
    name: "Spencer",
    role: "Facilitator",
    img: facilitatorSpencer,
    specialties: ["Hapé", "Sound Healing"],
  },
  {
    name: "Samira",
    role: "Facilitator",
    img: facilitatorSamira,
    specialties: ["Cacao", "Breathwork"],
  },
  {
    name: "Jala",
    role: "Facilitator",
    img: facilitatorJala,
    specialties: ["Sacred Tea", "Energy Work"],
  },
  {
    name: "Rama",
    role: "Healer & Transpersonal Psychology Scholar",
    img: facilitatorRama,
    specialties: ["Kambo", "Integration", "Transpersonal Psychology"],
  },
];

const PortalFacilitatorDirectory = () => {
  return (
    <section className="px-4 py-14">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center font-body text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
          Sacred Holders
        </p>
        <h2 className="text-center font-display text-2xl font-semibold text-foreground md:text-3xl mb-2">
          Facilitator Directory
        </h2>
        <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto mb-10">
          Meet the sacred holders who guide ceremonies and hold space for your transformation.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facilitators.map((f) => (
            <div
              key={f.name}
              className="group rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/30 hover:shadow-md"
            >
              <img
                src={f.img}
                alt={`${f.name} - ${f.role} at Temple Mother Earth`}
                className="mx-auto h-24 w-24 rounded-full object-cover ring-2 ring-primary/20 mb-3"
                loading="lazy"
              />
              <h3 className="font-display text-sm font-semibold text-foreground">{f.name}</h3>
              <p className="text-xs text-primary font-semibold mt-0.5">{f.role}</p>
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {f.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Read Full Bios <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default PortalFacilitatorDirectory;
