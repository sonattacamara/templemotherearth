import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const KAMBO_URL = "https://kambo.templemotherearth.org/";

const KamboRedirect = () => {
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = KAMBO_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-foreground px-6 text-center">
      <Link to="/" className="mb-8">
        <img src={logo} alt="Temple Mother Earth" className="h-16 w-16 rounded-full object-cover" />
      </Link>

      <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
        Temple Mother Earth
      </p>

      <h1 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
        Entering Kambo Sacred Space
      </h1>

      <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-primary-foreground/70">
        You're being redirected to our Kambo healing portal. If you're not redirected automatically,{" "}
        <a
          href={KAMBO_URL}
          className="text-primary underline underline-offset-2 hover:text-primary/80"
        >
          click here
        </a>
        .
      </p>

      <div className="mt-6 flex items-center gap-2">
        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        <span className="font-body text-xs text-primary-foreground/50">
          Redirecting in {countdown}…
        </span>
      </div>

      <Link
        to="/"
        className="mt-8 font-body text-xs text-primary-foreground/40 underline underline-offset-2 hover:text-primary-foreground/60"
      >
        ← Return to Temple Mother Earth
      </Link>
    </div>
  );
};

export default KamboRedirect;
