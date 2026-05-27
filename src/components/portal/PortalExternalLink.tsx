import { ExternalLink, Sparkles } from "lucide-react";
import portalVideoAsset from "@/assets/video-integration-portal.mp4.asset.json";

const portalVideo = portalVideoAsset.url;

const PortalExternalLink = () => (
  <section className="px-4 py-12">
    <div className="mx-auto max-w-3xl">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 shadow-2xl aspect-[16/9]">
        <video
          src={portalVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/55 to-foreground/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12">
          <Sparkles className="h-7 w-7 text-primary mb-3" />
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-primary/90 mb-3">
            Step Through the Threshold
          </p>
          <h3 className="font-display text-2xl md:text-4xl font-bold text-primary-foreground leading-tight max-w-2xl">
            Your Integration &amp; Wellness Portal
          </h3>
          <p className="mt-4 max-w-lg text-sm md:text-base text-primary-foreground/85">
            Tools, teachings, daily practices, and the community that walks with you between ceremonies. Built for those who are ready to live the work.
          </p>
          <a
            href="https://integration.templemotherearth.org/auth"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
          >
            Enter the Portal <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default PortalExternalLink;
