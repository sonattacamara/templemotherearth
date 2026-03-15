
-- Fix privilege escalation: restrict INSERT to force default 'seeker' tier
-- and remove the DELETE policy (profiles should not be deletable by users)

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND (membership_tier IS NULL OR membership_tier = 'seeker')
  );

DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;
