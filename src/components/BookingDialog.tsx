import { createContext, useContext, useState, type ReactNode } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/data/site-data";

type BookingContextValue = {
  open: (preset?: { service?: string }) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(6, "Enter a valid phone").max(30),
  service: z.string().min(1, "Choose a service"),
  date: z.string().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(800).optional().or(z.literal("")),
});

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
};

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  message: "",
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const open: BookingContextValue["open"] = (preset) => {
    setForm({ ...empty, service: preset?.service ?? "" });
    setErrors({});
    setIsOpen(true);
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Simulate request — backend wiring can be added later.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setIsOpen(false);
    toast.success("Request sent — we'll reply within 30 minutes.", {
      description: `Thanks ${parsed.data.name}, we received your booking details.`,
    });
  };

  return (
    <BookingContext.Provider value={{ open }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl tracking-tight">
              Book a clean
            </DialogTitle>
            <DialogDescription>
              Tell us about your space — we usually reply within 30 minutes.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="mt-2 space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="bk-name">Full name</Label>
                <Input
                  id="bk-name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Jane Doe"
                  maxLength={80}
                  required
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bk-phone">Phone</Label>
                <Input
                  id="bk-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(929) 000-0000"
                  maxLength={30}
                  required
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bk-email">Email</Label>
              <Input
                id="bk-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                maxLength={160}
                required
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="bk-service">Service</Label>
                <Select value={form.service} onValueChange={(v) => update("service", v)}>
                  <SelectTrigger id="bk-service">
                    <SelectValue placeholder="Choose service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.slug} value={s.title}>
                        {s.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && <p className="text-xs text-destructive">{errors.service}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bk-date">Preferred date</Label>
                <Input
                  id="bk-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bk-message">Tell us about your space</Label>
              <Textarea
                id="bk-message"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Square footage, bedrooms, anything special…"
                rows={4}
                maxLength={800}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending…" : "Send request →"}
            </button>
            <p className="text-[11px] text-center text-muted-foreground">
              We never share your details. Reply usually within 30 minutes during business hours.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  );
}
