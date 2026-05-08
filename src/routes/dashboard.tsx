import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { jobsService } from "@/services/jobs.service";
import { supportedTools } from "@/services/processing.service";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [{ title: "Dashboard | FileOrbit" }],
  }),
});

function DashboardPage() {
  const { user, isLoading, logout } = useAuth();

  const jobsQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: jobsService.list,
    enabled: Boolean(user),
  });

  if (!isLoading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Connecté comme</p>
            <h1 className="text-3xl font-semibold">{user?.full_name || user?.email}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Plan {user?.plan} · rôle {user?.role}
            </p>
          </div>
          <button
            onClick={() => void logout()}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/5"
          >
            Se déconnecter
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Historique des jobs</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Retrouve ici toutes tes conversions récentes et leur statut.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {jobsQuery.isLoading && <p className="text-sm text-muted-foreground">Chargement des jobs...</p>}
              {jobsQuery.isError && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  Impossible de charger l’historique pour le moment.
                </p>
              )}
              {jobsQuery.data?.length === 0 && (
                <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-muted-foreground">
                  Aucun job pour le moment. Lance un premier outil depuis le catalogue.
                </p>
              )}
              {jobsQuery.data?.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-white/10 bg-background/60 px-4 py-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{job.original_filename || job.tool}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{job.tool}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{job.status}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(job.created_at).toLocaleString("fr-FR")}
                      </p>
                    </div>
                  </div>
                  {job.error_message && (
                    <p className="mt-3 text-sm text-red-300">{job.error_message}</p>
                  )}
                  {job.download_url && (
                    <a
                      href={job.download_url}
                      className="mt-4 inline-flex text-sm font-medium text-secondary transition hover:opacity-85"
                    >
                      Télécharger le résultat
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Outils backend disponibles</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Le catalogue affiché correspond aux traitements réellement disponibles.
            </p>
            <div className="mt-6 space-y-3">
              {supportedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  to="/tools/$toolSlug"
                  params={{ toolSlug: tool.slug }}
                  className="block rounded-2xl border border-white/10 px-4 py-4 transition hover:bg-white/5"
                >
                  <p className="text-sm font-medium">{tool.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{tool.description}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
