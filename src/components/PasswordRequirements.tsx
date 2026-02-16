import { Check, X } from "lucide-react";
import { passwordChecks } from "@/lib/passwordValidation";

const PasswordRequirements = ({ password }: { password: string }) => {
  if (!password) return null;
  return (
    <div className="space-y-1 pt-1">
      <p className="text-xs font-semibold text-muted-foreground">Password Requirements:</p>
      <ul className="space-y-0.5">
        {passwordChecks.map((check) => {
          const passed = check.test(password);
          return (
            <li key={check.label} className={`flex items-center gap-1.5 text-xs ${passed ? "text-primary" : "text-muted-foreground"}`}>
              {passed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              {check.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
