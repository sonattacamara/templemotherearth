import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const KAMBO_URL = "https://kambo.templemotherearth.org/";

const KamboRedirect = () => {
  const [countdown, setCountdown] = useState(4);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          try {
            const w = window.open(KAMBO_URL, "_blank");
            if (!w) {
              // popup blocked — user will use the manual link
              setRedirected(true);
            }
          } catch {
            setRedirected(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-foreground px-6 text-center">
      <Link to="/" className="mb-6">
        <img src={logo} alt="Temple Mother Earth" className="h-20 w-20 rounded-full object-cover" />
      </Link>

      <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-primary/80 mb-4">
        A Sacred Threshold
      </p>

      <h1 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl leading-tight">
        The Frog Nation Awaits
      </h1>

      <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-primary-foreground/60">
        {redirected || countdown === 0
          ? "When you are ready, step through the threshold below."
          : "Take a breath. You are being guided into the Kambo sacred space."}
      </p>

      <a
        href={KAMBO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
      >
        Enter Sacred Space
      </a>

      {countdown > 0 && (
        <div className="mt-5 flex items-center gap-2">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/60" />
          <span className="font-body text-xs text-primary-foreground/40">
            Preparing space… {countdown}
          </span>
        </div>
      )}

      <Link
        to="/"
        className="mt-10 font-body text-xs text-primary-foreground/30 underline underline-offset-2 hover:text-primary-foreground/50"
      >
        ← Return to Temple Mother Earth
      </Link>
    </div>
  );
};

export default KamboRedirect;
