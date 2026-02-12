
-- Fix 1: Add DELETE policy so users can delete their own profile (GDPR compliance)
CREATE POLICY "Users can delete their own profile"
  ON public.profiles
  FOR DELETE
  USING (auth.uid() = user_id);

-- Fix 2: Prevent membership_tier self-escalation
-- Drop existing UPDATE policy and replace with one that prevents tier changes
DROP POLICY "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id AND
    membership_tier IS NOT DISTINCT FROM (SELECT p.membership_tier FROM public.profiles p WHERE p.user_id = auth.uid())
  );
