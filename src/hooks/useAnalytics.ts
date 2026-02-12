import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const track = async () => {
      try {
        await supabase.from("page_views").insert({
          path: location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
        });
      } catch {}
    };
    track();
  }, [location.pathname]);
};

export const trackForm = async (formName: string, metadata?: Record<string, any>) => {
  try {
    await supabase.from("form_submissions").insert({ form_name: formName, metadata: metadata || {} });
  } catch {}
};
