-- Replace overly permissive INSERT policies on page_views and form_submissions
-- with scoped policies that limit to anon role (for client-side tracking)

-- page_views: drop old, create scoped policy
DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;
CREATE POLICY "Anon and authenticated can insert page views"
  ON public.page_views
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(path) <= 500
    AND (referrer IS NULL OR char_length(referrer) <= 2000)
    AND (user_agent IS NULL OR char_length(user_agent) <= 500)
  );

-- form_submissions: drop old, create scoped policy
DROP POLICY IF EXISTS "Anyone can insert form submissions" ON public.form_submissions;
CREATE POLICY "Anon and authenticated can insert form submissions"
  ON public.form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(form_name) <= 100
  );