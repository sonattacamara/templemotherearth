import { motion, type Easing } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import EventbriteCTA from "@/components/EventbriteCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    // Simulate submission – replace with real endpoint later
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Your message has been sent. We'll be in touch soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div id="top" className="min-h-screen bg-background">
      <SEOHead
        title="Contact Us"
        description="Get in touch with Temple Mother Earth. Send us a message and our team will respond with care and intention."
        path="/contact"
      />
      <Navigation />

      {/* ───── HERO ───── */}
      <section className="relative flex min-h-[45vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center bg-foreground">
        <div className="absolute inset-0 bg-foreground/90" />
        <motion.div
          className="relative z-10 max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Reach Out
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display mt-3 text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Contact Us
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body mx-auto mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
            We welcome your questions, inquiries, and messages. Our team responds with care, intention, and sacred attention.
          </motion.p>
        </motion.div>
      </section>

      {/* ───── FORM SECTION ───── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="rounded-2xl border border-border bg-card p-8 shadow-lg md:p-12"
          >
            <motion.div variants={fadeUp} className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-7 w-7 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Send Us a Message
              </h2>
              <p className="font-body mt-2 text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={fadeUp} className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    maxLength={100}
                    required
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    maxLength={255}
                    required
                    className="bg-background"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-2">
                <Label htmlFor="subject" className="text-foreground">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  maxLength={200}
                  className="bg-background"
                />
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-2">
                <Label htmlFor="message" className="text-foreground">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your question, inquiry, or intention…"
                  rows={6}
                  maxLength={2000}
                  required
                  className="bg-background resize-none"
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6"
                >
                  {isSubmitting ? (
                    "Sending…"
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" /> Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Community circles callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-12 rounded-2xl border border-border bg-card/60 p-8 md:p-10"
          >
            <motion.div variants={fadeUp} className="text-center mb-8">
              <h3 className="font-display text-2xl font-bold text-foreground">
                Community Circles
              </h3>
              <p className="font-body mt-3 text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Download the Telegram app to join our community circles.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              <motion.a
                variants={fadeUp}
                href="https://t.me/templemotherearth"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-xl border border-border bg-background p-5 text-left transition-all hover:border-primary/40 hover:shadow-md"
              >
                <span className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  💬 Public Community Chat →
                </span>
                <span className="font-body text-sm text-muted-foreground leading-relaxed">
                  Open community announcements, event updates, and general Temple conversation.
                </span>
              </motion.a>

              <motion.a
                variants={fadeUp}
                href="https://t.me/MensFellowship"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-xl border border-border bg-background p-5 text-left transition-all hover:border-primary/40 hover:shadow-md"
              >
                <span className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  🔥 Men's Integration Circle →
                </span>
                <span className="font-body text-sm text-muted-foreground leading-relaxed">
                  A private brotherhood space for reflection, accountability, and healing through "The Cove."
                </span>
              </motion.a>

              <motion.a
                variants={fadeUp}
                href="https://t.me/+12lOyLI8QH01NzYx"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-xl border border-border bg-background p-5 text-left transition-all hover:border-primary/40 hover:shadow-md"
              >
                <span className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  🌙 Wombmen's Integration Circle →
                </span>
                <span className="font-body text-sm text-muted-foreground leading-relaxed">
                  A sacred sisterhood space for emotional processing, embodiment practices, and mutual support.
                </span>
              </motion.a>

              <motion.a
                variants={fadeUp}
                href="https://t.me/+WaG5DTz0HJYzNGNh"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-xl border border-border bg-background p-5 text-left transition-all hover:border-primary/40 hover:shadow-md"
              >
                <span className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  🌿 The Forest Team →
                </span>
                <span className="font-body text-sm text-muted-foreground leading-relaxed">
                  Our volunteer and support crew — land stewardship, event setup, and hands-on service to the Temple.
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── GLOBAL CTA ───── */}
      <EventbriteCTA />

      {/* ───── FOOTER ───── */}
      <footer className="bg-foreground py-12 text-center">
        <img src={logo} alt="Temple Mother Earth" className="mx-auto mb-4 h-12 w-auto opacity-80" />
        <p className="font-body text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} Temple Mother Earth · All Rights Reserved
        </p>
        <div className="mt-4 flex justify-center gap-6 text-sm text-primary-foreground/50">
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          <Link to="/membership" className="hover:text-primary transition-colors">Membership</Link>
          <Link to="/conduct" className="hover:text-primary transition-colors">Code of Conduct</Link>
          <Link to="/preparation" className="hover:text-primary transition-colors">Preparation</Link>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
