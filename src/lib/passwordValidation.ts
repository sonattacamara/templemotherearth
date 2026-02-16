export interface PasswordCheck {
  label: string;
  test: (pw: string) => boolean;
}

export const passwordChecks: PasswordCheck[] = [
  { label: "A minimum of 8 characters", test: (pw) => pw.length >= 8 },
  { label: "Must contain 1 special character", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
  { label: "Must contain 1 number", test: (pw) => /\d/.test(pw) },
  { label: "Must contain an upper and lower case letter", test: (pw) => /[a-z]/.test(pw) && /[A-Z]/.test(pw) },
];

export const isPasswordValid = (pw: string) => passwordChecks.every((c) => c.test(pw));
