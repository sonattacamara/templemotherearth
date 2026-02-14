
-- 1. Create role enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only admins can read user_roles
CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 2. Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 3. Replace permissive RLS on page_views: only admins can SELECT
DROP POLICY IF EXISTS "Authenticated users can read page views" ON public.page_views;
CREATE POLICY "Only admins can read page views"
ON public.page_views FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Replace permissive RLS on form_submissions: only admins can SELECT
DROP POLICY IF EXISTS "Authenticated users can read form submissions" ON public.form_submissions;
CREATE POLICY "Only admins can read form submissions"
ON public.form_submissions FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
