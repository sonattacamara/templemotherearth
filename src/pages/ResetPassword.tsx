import { useState, useEffect } from "react";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import PasswordRequirements from "@/components/PasswordRequirements";
import { isPasswordValid } from "@/lib/passwordValidation";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid(password)) {
      setError("Please meet all password requirements.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Password updated! Redirecting…");
      setTimeout(() => navigate("/member/education"), 2000);
    }
    setLoading(false);
  };

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Reset Password" description="Reset your Temple Mother Earth account password securely." path="/reset-password" />
      <Navigation />
      <section className="flex min-h-screen items-center justify-center px-4 pt-20">
        <motion.div className="w-full max-w-md" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-8">
            <img src={logo} alt="Temple Mother Earth" className="mx-auto h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-primary/20" />
            <h1 className="mt-4 font-display text-2xl font-bold text-foreground">Enter a New Password</h1>
            <p className="mt-2 text-sm text-muted-foreground">Create a strong, secure password for your account.</p>
          </motion.div>

          <motion.form variants={fadeUp} className="space-y-4 rounded-2xl border border-border bg-card p-8" onSubmit={handleSubmit}>
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
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Confirm Password</label>
              <input
                className={inputClass}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive mt-1">Passwords do not match.</p>
              )}
            </div>

            <PasswordRequirements password={password} />

            {error && <p className="text-sm text-destructive">{error}</p>}
            {success && <p className="text-sm text-primary">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Please wait..." : "Change Password"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-center">
              <button type="button" onClick={() => navigate("/member/auth")} className="text-sm text-primary hover:underline font-semibold">
                Sign in
              </button>
            </p>
          </motion.form>
        </motion.div>
      </section>
    </div>
  );
};

export default ResetPassword;
