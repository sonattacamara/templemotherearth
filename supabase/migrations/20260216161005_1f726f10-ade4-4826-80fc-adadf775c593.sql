-- Add length constraints on analytics tables to prevent abuse
ALTER TABLE public.page_views
  ADD CONSTRAINT page_views_path_length CHECK (length(path) <= 500),
  ADD CONSTRAINT page_views_referrer_length CHECK (referrer IS NULL OR length(referrer) <= 2000),
  ADD CONSTRAINT page_views_user_agent_length CHECK (user_agent IS NULL OR length(user_agent) <= 1000);

ALTER TABLE public.form_submissions
  ADD CONSTRAINT form_submissions_form_name_length CHECK (length(form_name) <= 200);
