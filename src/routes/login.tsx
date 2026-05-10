import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [{ title: "Connexion | FileOrbit" }],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const { user, isInitializing, isLoading, login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const isSubmitDisabled = !email.trim() || !password || isLoading;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    try {
      await login({ email: email.trim(), password });
      await navigate({ to: "/dashboard" });
    } catch (submitError) {
      setFormError(
        submitError instanceof Error ? submitError.message : "Connexion impossible pour le moment.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-24 text-foreground">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <p className="text-sm font-medium text-gradient">Espace sécurisé</p>
        <h1 className="mt-3 text-3xl font-semibold">Connexion</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Connectez-vous avec votre session Django pour retrouver vos fichiers, vos jobs et vos téléchargements.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-secondary"
              placeholder="Votre mot de passe"
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
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link to="/register" className="font-medium text-secondary transition hover:opacity-85">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
