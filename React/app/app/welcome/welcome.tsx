import { useState } from "react";

export function Welcome() {
  const [name, setName] = useState('kob');

  return (
    <main className="flex text-4xl h-screen items-center justify-center pt-16 pb-4">
      Hello {name}
    </main>
  );
}
