import { env } from "../env.mjs";
import Card from "../components/card";
import type { Deploy } from "@prisma/client";

interface DeploysProps {
  code: string;
  deploys: {
    PRD: Deploy[];
    UAT: Deploy[];
    U1AT: Deploy[];
    U2AT: Deploy[];
    U3AT: Deploy[];
  };
}

export default async function HomePage() {
  const deploys = (await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/deploy`, {
    next: { revalidate: 600 },
  }).then((res) => {
    return res.json();
  })) as DeploysProps;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
      <Card name={"PRD"} deploys={deploys.deploys.PRD} />
      <Card name={"UAT"} deploys={deploys.deploys.UAT} />
      <Card name={"U1AT"} deploys={deploys.deploys.U1AT} />
      <Card name={"U2AT"} deploys={deploys.deploys.U2AT} />
      <Card name={"U3AT"} deploys={deploys.deploys.U3AT} />
    </div>
  );
}
