import { createFileRoute, Link } from "@tanstack/react-router";
import { getToolBySlug } from "@/services/processing.service";

export const Route = createFileRoute("/tools/$toolSlug")({
  component: ToolRoute,
  head: ({ params }) => ({
    meta: [{ title: `${params.toolSlug} | FileOrbit` }],
  }),
});

function ToolRoute() {
  const { toolSlug } = Route.useParams();
  const tool = getToolBySlug(toolSlug);

  if (!tool) {
    return (
      <div className="min-h-screen bg-background px-4 py-24 text-foreground">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-semibold">Outil introuvable</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Ce slug n’est pas aligné avec le catalogue backend actuel.
          </p>
          <Link to="/dashboard" className="mt-6 inline-flex font-medium text-secondary">
            Retour au dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-24 text-foreground">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm font-medium text-gradient">Outil connecté au backend</p>
        <h1 className="mt-3 text-4xl font-semibold">{tool.title}</h1>
        <p className="mt-4 text-muted-foreground">{tool.description}</p>

        <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-5">
          <p className="text-sm font-medium">Connexion en cours</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Cette page est prête pour recevoir le vrai flux d’upload, le suivi du traitement et le téléchargement.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/dashboard"
            className="rounded-xl bg-cosmic px-4 py-3 font-medium text-primary-foreground"
          >
            Voir l’historique
          </Link>
          <Link to="/" className="rounded-xl border border-white/10 px-4 py-3 font-medium">
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
