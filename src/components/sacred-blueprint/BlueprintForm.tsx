import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

interface BlueprintFormProps {
  onSuccess: () => void;
}

const BlueprintForm = ({ onSuccess }: BlueprintFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    birthDate: "",
    birthTime: "",
    birthCity: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.birthDate || !formData.birthCity.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-sacred-blueprint", {
        body: formData,
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        setIsSubmitting(false);
        return;
      }
      setSubmitted(true);
      onSuccess();
    } catch (err) {
      console.error("Sacred Blueprint form error:", err);
      toast.error("Something went wrong. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <section id="birth-form" className="bg-card px-4 py-20">
      <motion.div
        className="mx-auto max-w-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {submitted ? (
          <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-background p-8 shadow-lg md:p-12 text-center">
            <p className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Your Sacred Blueprint request has been received!
            </p>
            <p className="mt-4 font-body text-muted-foreground text-lg">
              Check your inbox for your next steps. We'll be in touch soon. 🌍
            </p>
          </motion.div>
        ) : (
          <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-background p-8 shadow-lg md:p-12">
            <div className="mb-8 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Generate Your Sacred Blueprint
              </h2>
              <p className="font-body mt-2 text-muted-foreground">
                Enter your birth details to receive your free Human Design chart.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">First Name *</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Your first name" maxLength={100} required className="bg-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" maxLength={255} required className="bg-card" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" maxLength={20} required className="bg-card" />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-foreground">Date of Birth *</Label>
                  <Input id="birthDate" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} required className="bg-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthTime" className="text-foreground">Exact Time of Birth</Label>
                  <Input id="birthTime" name="birthTime" type="time" value={formData.birthTime} onChange={handleChange} className="bg-card" />
                  <p className="text-xs text-muted-foreground italic">Don't know? Your chart still works — share your best guess.</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthCity" className="text-foreground">City &amp; Country of Birth *</Label>
                <Input id="birthCity" name="birthCity" value={formData.birthCity} onChange={handleChange} placeholder="e.g. Washington, DC, USA" maxLength={200} required className="bg-card" />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6">
                {isSubmitting ? "Submitting…" : (
                  <><Send className="mr-2 h-5 w-5" /> Generate My Sacred Blueprint</>
                )}
              </Button>
            </form>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default BlueprintForm;
