import GenerateClient from "./GenerateClient";

type PageProps = {
  searchParams?: Promise<{ type?: string }>;
};

export default async function GeneratePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialType = params?.type || "реклама";

  return <GenerateClient initialType={initialType} />;
}