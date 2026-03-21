import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EventbriteCTA from "@/components/EventbriteCTA";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import PasswordRequirements from "@/components/PasswordRequirements";
import { isPasswordValid } from "@/lib/passwordValidation";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const MemberAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formLoadedAt] = useState(Date.now());
  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Bot detection: honeypot and timing check
    if (honeypot) { setLoading(false); return; }
    if (!isLogin && Date.now() - formLoadedAt < 3000) {
      setError("Please take a moment before submitting.");
      setLoading(false);
      return;
    }

    if (isForgotPassword) {
      const { error } = await resetPassword(email);
      if (error) setError(error.message);
      else setSuccess("Password reset email sent. Check your inbox and follow the link to reset your password.");
      setLoading(false);
      return;
    }

    if (!isLogin) {
      if (email !== confirmEmail) {
        setError("Email addresses do not match. Please confirm your email.");
        setLoading(false);
        return;
      }
      if (!isPasswordValid(password)) {
        setError("Please meet all password requirements.");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
    }

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate("/member/education");
      }
    } else {
      const { error } = await signUp(email, password, firstName, lastName);
      if (error) {
        setError(error.message);
      } else {
        navigate("/member/education");
      }
    }
    setLoading(false);
  };

  const resetState = () => {
    setError("");
    setSuccess("");
    setConfirmEmail("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Member Sign In" description="Sign in or create your Temple Mother Earth member account to access ceremonies, education, and community resources." path="/member/auth" />
      <Navigation />
      <section className="flex min-h-screen items-center justify-center px-4 pt-20">
        <motion.div className="w-full max-w-md" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-8">
            <img src={logo} alt="Temple Mother Earth" className="mx-auto h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-primary/20" />
            <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
              {isForgotPassword ? "Reset Your Password" : isLogin ? "Member Login" : "Create Your Account"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isForgotPassword ? "Enter your email and we'll send you a reset link." : isLogin ? "Welcome back to the Temple." : "Join our sacred community."}
            </p>
          </motion.div>

          <motion.form variants={fadeUp} className="space-y-4 rounded-2xl border border-border bg-card p-8" onSubmit={handleSubmit}>
            {!isLogin && !isForgotPassword && (
              <div className="grid grid-cols-2 gap-3">
                <input className={inputClass} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <input className={inputClass} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            )}

            <input className={inputClass} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {/* Honeypot - hidden from real users */}
            <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
              <input type="text" name="website_url" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
            </div>

            {!isLogin && !isForgotPassword && (
              <div>
                <input className={inputClass} type="email" placeholder="Confirm Email Address" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
                {confirmEmail && email !== confirmEmail && (
                  <p className="text-xs text-destructive mt-1">Email addresses do not match.</p>
                )}
              </div>
            )}

            {!isForgotPassword && (
              <div className="relative">
                <input
                  className={inputClass}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            )}

            {!isLogin && !isForgotPassword && (
              <>
                <input
                  className={inputClass}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-destructive mt-1">Passwords do not match.</p>
                )}
                <PasswordRequirements password={password} />
              </>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}
            {success && <p className="text-sm text-primary">{success}</p>}

            <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? "Please wait..." : isForgotPassword ? "Send Reset Link" : isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="h-4 w-4" />
            </button>

            {isLogin && !isForgotPassword && (
              <p className="text-center">
                <button type="button" onClick={() => { setIsForgotPassword(true); resetState(); }} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Forgot your password?
                </button>
              </p>
            )}

            {isForgotPassword ? (
              <p className="text-center">
                <button type="button" onClick={() => { setIsForgotPassword(false); resetState(); }} className="text-sm text-primary hover:underline font-semibold">
                  ← Back to Sign In
                </button>
              </p>
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button type="button" onClick={() => { setIsLogin(!isLogin); resetState(); }} className="text-primary hover:underline font-semibold">
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            )}
          </motion.form>
        </motion.div>
      </section>

      <EventbriteCTA />

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MemberAuth;
