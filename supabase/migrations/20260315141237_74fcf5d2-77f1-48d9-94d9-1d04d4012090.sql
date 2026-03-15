-- Revoke PUBLIC execute on has_role to prevent authenticated users from querying other users' roles
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;

-- Update handle_new_user with input validation and length limits
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_full_name TEXT;
BEGIN
  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', '');
  v_full_name := LEFT(v_full_name, 100);
  
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, LEFT(NEW.email, 255), v_full_name)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;