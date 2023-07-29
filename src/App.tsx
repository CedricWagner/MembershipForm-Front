import { useState } from "react";
import Logo from "./components/Logo/Logo";

function App() {

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-white p-2">
        <div className="container mx-auto flex items-center justify-between">
          <Logo />
          [Menu]
        </div>
      </header>
    </div>
  );
}

export default App;
