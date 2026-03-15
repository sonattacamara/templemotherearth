import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { lovable } from "@/integrations/lovable/index";
import PasswordRequirements from "@/components/PasswordRequirements";
import { isPasswordValid } from "@/lib/passwordValidation";
import logo from "@/assets/logo.png";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const PortalAuthForm = () => {
  const { signIn, signUp, resetPassword } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    if (isForgotPassword) {
      const { error } = await resetPassword(email);
      if (error) setError(error.message);
      else setSuccess("Password reset email sent. Check your inbox and follow the link to reset your password.");
      setSubmitting(false);
      return;
    }

    if (!isLogin) {
      if (email !== confirmEmail) {
        setError("Email addresses do not match. Please confirm your email.");
        setSubmitting(false);
        return;
      }
      if (!isPasswordValid(password)) {
        setError("Please meet all password requirements.");
        setSubmitting(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setSubmitting(false);
        return;
      }
    }

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) setError(error.message);
      else setSuccess("Account created! You're being signed in…");
    }
    setSubmitting(false);
  };

  const resetState = () => {
    setError("");
    setSuccess("");
    setConfirmEmail("");
    setConfirmPassword("");
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 pt-20">
      <motion.div className="w-full max-w-md" initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={fadeUp} className="text-center mb-8">
          <img src={logo} alt="Temple Mother Earth" className="mx-auto h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-primary/20" />
          <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
            {isForgotPassword ? "Reset Your Password" : "Temple Mother Earth"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isForgotPassword ? "Enter your email and we'll send you a reset link." : "Your sacred integration companion"}
          </p>
        </motion.div>

        <motion.form variants={fadeUp} className="space-y-4 rounded-2xl border border-border bg-card p-8" onSubmit={handleSubmit}>
          {!isForgotPassword && (
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => { setIsLogin(false); resetState(); setIsForgotPassword(false); }}
                className={`flex-1 py-2.5 text-sm font-semibold transition ${!isLogin ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                Create Space
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(true); resetState(); setIsForgotPassword(false); }}
                className={`flex-1 py-2.5 text-sm font-semibold transition ${isLogin ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                Welcome Back
              </button>
            </div>
          )}

          {!isLogin && !isForgotPassword && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Your Name</label>
              <input className={inputClass} placeholder="How would you like to be called?" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Email</label>
            <input className={inputClass} type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {!isLogin && !isForgotPassword && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Confirm Email</label>
              <input className={inputClass} type="email" placeholder="Confirm your email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
              {confirmEmail && email !== confirmEmail && (
                <p className="text-xs text-destructive mt-1">Email addresses do not match.</p>
              )}
            </div>
          )}

          {!isForgotPassword && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Password</label>
              <div className="relative">
                <input className={inputClass} type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}

          {!isLogin && !isForgotPassword && (
            <>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Confirm Password</label>
                <input className={inputClass} type={showPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-destructive mt-1">Passwords do not match.</p>
                )}
              </div>
              <PasswordRequirements password={password} />
            </>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-primary">{success}</p>}

          <button type="submit" disabled={submitting} className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50">
            {submitting ? "Please wait..." : isForgotPassword ? "Send Reset Link" : isLogin ? "Welcome Back" : "Begin Your Journey"}
            <ArrowRight className="h-4 w-4" />
          </button>

          {!isForgotPassword && (
            <>
              <div className="flex items-center gap-3 my-2">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <button
                type="button"
                onClick={async () => {
                  setError("");
                  const { error } = await lovable.auth.signInWithOAuth("google", {
                    redirect_uri: window.location.origin,
                  });
                  if (error) setError(error.message);
                }}
                className="w-full rounded-lg border border-border bg-background px-6 py-3 font-body text-sm font-semibold text-foreground transition hover:bg-muted flex items-center justify-center gap-3"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </>
          )}

          {isLogin && !isForgotPassword && (
            <p className="text-center">
              <button type="button" onClick={() => { setIsForgotPassword(true); resetState(); }} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Forgot your password?
              </button>
            </p>
          )}

          {isForgotPassword && (
            <p className="text-center">
              <button type="button" onClick={() => { setIsForgotPassword(false); resetState(); }} className="text-sm text-primary hover:underline font-semibold">
                ← Back to Sign In
              </button>
            </p>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
};

export default PortalAuthForm;
