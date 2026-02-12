
-- Allow authenticated users to read analytics (admin check done in app)
DROP POLICY "No public reads on page views" ON public.page_views;
CREATE POLICY "Authenticated users can read page views"
ON public.page_views FOR SELECT
USING (auth.role() = 'authenticated');

DROP POLICY "No public reads on form submissions" ON public.form_submissions;
CREATE POLICY "Authenticated users can read form submissions"
ON public.form_submissions FOR SELECT
USING (auth.role() = 'authenticated');
