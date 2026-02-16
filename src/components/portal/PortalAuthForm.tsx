import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
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
  const [password, setPassword] = useState("");
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

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) setError(error.message);
      else setSuccess("Please check your email to verify your account before logging in.");
    }
    setSubmitting(false);
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 pt-20">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-8">
          <img
            src={logo}
            alt="Temple Mother Earth"
            className="mx-auto h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-primary/20"
          />
          <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
            {isForgotPassword ? "Reset Your Password" : "Temple Mother Earth"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isForgotPassword
              ? "Enter your email and we'll send you a reset link."
              : "Your sacred integration companion"}
          </p>
        </motion.div>

        <motion.form
          variants={fadeUp}
          className="space-y-4 rounded-2xl border border-border bg-card p-8"
          onSubmit={handleSubmit}
        >
          {!isForgotPassword && (
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(""); setSuccess(""); setIsForgotPassword(false); }}
                className={`flex-1 py-2.5 text-sm font-semibold transition ${!isLogin ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                Create Space
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(""); setSuccess(""); setIsForgotPassword(false); }}
                className={`flex-1 py-2.5 text-sm font-semibold transition ${isLogin ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                Welcome Back
              </button>
            </div>
          )}

          {!isLogin && !isForgotPassword && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Your Name</label>
              <input
                className={inputClass}
                placeholder="How would you like to be called?"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Email</label>
            <input
              className={inputClass}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {!isForgotPassword && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Password</label>
              <div className="relative">
                <input
                  className={inputClass}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-primary">{success}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitting
              ? "Please wait..."
              : isForgotPassword
              ? "Send Reset Link"
              : isLogin
              ? "Welcome Back"
              : "Begin Your Journey"}
            <ArrowRight className="h-4 w-4" />
          </button>

          {isLogin && !isForgotPassword && (
            <p className="text-center">
              <button
                type="button"
                onClick={() => { setIsForgotPassword(true); setError(""); setSuccess(""); }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Forgot your password?
              </button>
            </p>
          )}

          {isForgotPassword && (
            <p className="text-center">
              <button
                type="button"
                onClick={() => { setIsForgotPassword(false); setError(""); setSuccess(""); }}
                className="text-sm text-primary hover:underline font-semibold"
              >
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
