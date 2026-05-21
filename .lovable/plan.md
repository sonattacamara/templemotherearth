# Grant admin access to sonattacamara@gmail.com

## Status check

I looked up `sonattacamara@gmail.com` in the account system and **no account exists yet** for that email. Without an account, there is no `user_id` to attach the admin role to.

## Step 1 — You sign up (required first)

1. Go to https://templemotherearth.org/member/auth
2. Sign up with **sonattacamara@gmail.com** (email + password, or Google sign-in using that same Gmail address)
3. Confirm the signup (check inbox if email confirmation is required)
4. Reply here with "done"

## Step 2 — I grant admin (after you confirm signup)

Once your account exists, I will run a one-line database migration that inserts a row into `public.user_roles`:

```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'sonattacamara@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

This is the only change. No edits to:
- the intake form
- the website design
- how submissions are saved
- any unrelated code or publishing

## Step 3 — Verify

After the role is added, I will:
1. Query `public.user_roles` to confirm the admin row exists for your `user_id`
2. Confirm `has_role(user_id, 'admin')` returns `true`
3. Tell you to visit https://templemotherearth.org/admin/intakes — you'll see the readable dashboard with all ceremony intakes (search, filter, view details, export CSV)

## Technical notes

- `user_roles` has no public INSERT policy by design (prevents privilege escalation), which is why this must be done via a server-side migration.
- The `has_role` function and the `/admin/intakes` SELECT policy on `form_submissions` are already in place — no schema changes needed beyond the single INSERT.
