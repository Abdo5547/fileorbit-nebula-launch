import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({
    meta: [{ title: "Inscription | FileOrbit" }],
  }),
});

function RegisterPage() {
  const navigate = useNavigate();
  const { user, isInitializing, isLoading, register, error } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background px-4 py-24 text-foreground">
        <div className="mx-auto flex max-w-md items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-muted-foreground backdrop-blur">
          Vérification de votre session sécurisée...
        </div>
      </div>
    );
  }

  const isSubmitDisabled = !email.trim() || !password || !passwordConfirm || isLoading;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (password.length < 8) {
      setFormError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== passwordConfirm) {
      setFormError("Les mots de passe doivent correspondre.");
      return;
    }

    try {
      await register({
        full_name: fullName.trim(),
        email: email.trim(),
        password,
        password_confirm: passwordConfirm,
      });
      await navigate({ to: "/dashboard" });
    } catch (submitError) {
      setFormError(
        submitError instanceof Error ? submitError.message : "Inscription impossible pour le moment.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-24 text-foreground">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <p className="text-sm font-medium text-gradient">Compte FileOrbit</p>
        <h1 className="mt-3 text-3xl font-semibold">Créer un compte</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Votre compte sert à sécuriser vos accès et à conserver un historique fiable de vos traitements.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Nom complet</span>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              autoComplete="name"
              className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-secondary"
              placeholder="Optionnel"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Email</span>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-secondary"
              placeholder="vous@entreprise.com"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Mot de passe</span>
            <input
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-secondary"
              placeholder="8 caractères minimum"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Confirmer le mot de passe</span>
            <input
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-secondary"
              placeholder="Répétez votre mot de passe"
              required
            />
          </label>

          {(formError || error) && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {formError ?? error?.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full rounded-xl bg-cosmic px-4 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Création..." : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link to="/login" className="font-medium text-secondary transition hover:opacity-85">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
