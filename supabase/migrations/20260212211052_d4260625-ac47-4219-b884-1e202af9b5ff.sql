
-- Analytics page views table
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (tracking)
CREATE POLICY "Anyone can insert page views"
ON public.page_views FOR INSERT
WITH CHECK (true);

-- Only authenticated admin can read (we'll use service role in edge fn)
CREATE POLICY "No public reads on page views"
ON public.page_views FOR SELECT
USING (false);

-- Form submissions tracking
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_name TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert form submissions"
ON public.form_submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "No public reads on form submissions"
ON public.form_submissions FOR SELECT
USING (false);

-- Index for efficient analytics queries
CREATE INDEX idx_page_views_path ON public.page_views (path);
CREATE INDEX idx_page_views_created_at ON public.page_views (created_at);
CREATE INDEX idx_form_submissions_form_name ON public.form_submissions (form_name);
CREATE INDEX idx_form_submissions_created_at ON public.form_submissions (created_at);
