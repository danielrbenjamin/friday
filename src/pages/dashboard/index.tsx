import { PageLayout } from "@/layouts";

const Dashboard = () => {
  return (
    <PageLayout
      title="Dashboard"
      description="Pluely is now fully self-hosted. Configure your own AI providers and STT providers in Dev Space."
    >
      <div className="p-6 rounded-lg border border-input/50 bg-muted/20">
        <h3 className="text-lg font-semibold mb-2">🎉 Fully Independent</h3>
        <p className="text-muted-foreground">
          All AI and speech-to-text processing now uses your own API keys or local LLMs.
          No external servers or licenses required.
        </p>
        <p className="text-muted-foreground mt-2">
          Configure your providers in <strong>Dev Space</strong> to get started.
        </p>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
