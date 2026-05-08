import { BoothProvider } from "@/lib/booth-context";
import { BoothApp } from "@/components/booth/booth-app";

export default function Home() {
  return (
    <BoothProvider>
      <BoothApp />
    </BoothProvider>
  );
}
