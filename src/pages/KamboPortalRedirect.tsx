import { useEffect } from "react";

const PORTAL_URL = "https://kambo.templemotherearth.org/";

/**
 * Hard redirect from /kambo (and aliases) to the dedicated Kambo portal.
 * The portal IS the Kambo page; we no longer keep a duplicate inside this site.
 */
const KamboPortalRedirect = ({ hash = "" }: { hash?: string }) => {
  useEffect(() => {
    window.location.replace(PORTAL_URL + hash);
  }, [hash]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="text-center max-w-md">
        <p className="font-body text-[10px] tracking-[3px] uppercase text-primary mb-3">
          Sacred Kambo Portal
        </p>
        <h1 className="font-display text-2xl mb-4">Opening the portal…</h1>
        <p className="text-muted-foreground text-sm mb-6">
          You are being taken to our dedicated Kambo sanctuary.
        </p>
        <a
          href={PORTAL_URL + hash}
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold"
        >
          Enter the Portal
        </a>
      </div>
    </div>
  );
};

export default KamboPortalRedirect;