
CREATE TYPE public.journal_post_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE public.journal_post_type AS ENUM ('long', 'short');

CREATE TABLE public.journal_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  post_type public.journal_post_type NOT NULL,
  topic_bucket TEXT,
  cta_label TEXT,
  cta_url TEXT,
  status public.journal_post_status NOT NULL DEFAULT 'draft',
  scheduled_for TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  ai_model TEXT,
  generation_prompt TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_journal_posts_status ON public.journal_posts(status);
CREATE INDEX idx_journal_posts_published_at ON public.journal_posts(published_at DESC);

ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published posts"
ON public.journal_posts FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins can view all posts"
ON public.journal_posts FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert posts"
ON public.journal_posts FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update posts"
ON public.journal_posts FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete posts"
ON public.journal_posts FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_journal_posts_updated_at
BEFORE UPDATE ON public.journal_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;
