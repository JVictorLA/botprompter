"use client";

import { useEffect, useState } from "react";
import Chatbot from "@/components/Chatbot";
import Preloader from "@/components/Preloader";

import { Github, Linkedin, Instagram, Globe } from "lucide-react";

const N8N_STATUS_URL =
  "https://n8n-n8n.serlgy.easypanel.host/webhook/status";

type StatusState = "checking" | "online" | "offline";

const Index = () => {
  const [status, setStatus] = useState<StatusState>("checking");
  const [loading, setLoading] = useState(true);

  // 🔍 Verifica status do n8n
  const checkN8nStatus = async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(N8N_STATUS_URL, {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeout);
      setStatus(response.ok ? "online" : "offline");
    } catch {
      setStatus("offline");
    }
  };

  useEffect(() => {
    checkN8nStatus();
    const interval = setInterval(checkN8nStatus, 30000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
  if (!loading) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // evita animação estranha
    });
  }
}, [loading]);

  return (
    <>
      {/* PRELOADER */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* APP */}
      {!loading && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          {/* Background */}
          <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%236E44FF%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

          {/* HEADER */}
          <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 py-3 md:py-5">

              {/* MOBILE */}
              <div className="flex items-center justify-between md:hidden">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                    <img
                      src="/botPrompter.png"
                      alt="PromptStudio AI"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    PromptStudio
                  </h1>
                </div>

                <StatusBadge status={status} />
              </div>

              {/* DESKTOP */}
              <div className="hidden md:flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg">
                    <img
                      src="/botPrompter.png"
                      alt="PromptStudio AI"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      PromptStudio AI
                    </h1>
                    <p className="text-sm text-gray-400">
                      Transforme ideias vagas em prompts detalhados
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800/40 border border-gray-700/40">
                  <StatusDot status={status} />
                  <span className="text-sm text-gray-300">n8n</span>
                  <span
                    className={`text-xs font-medium ${
                      status === "online"
                        ? "text-green-400"
                        : status === "offline"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {status === "online"
                      ? "Online"
                      : status === "offline"
                      ? "Offline"
                      : "Verificando"}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* MAIN */}
          <main className="relative z-10 flex items-center justify-center p-4 md:p-6">
            <div className="w-full max-w-6xl h-[85vh] bg-gray-800/20 border border-gray-700/30 rounded-3xl backdrop-blur-lg shadow-2xl">
              <Chatbot status={status} />
            </div>
          </main>

          {/* FOOTER */}
          <footer className="relative z-10 border-t border-gray-800/50">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} PromptStudio AI
              </p>

              <p className="text-sm text-gray-400 text-center">
                Desenvolvido com ❤️ para criadores no-code
              </p>

              <div className="flex flex-col items-center gap-3">
                <a
                  href="https://joaovictoralmeida.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-2 md:order-1 text-sm font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition"
                >
                  Criado por João Victor Almeida
                </a>

                <div className="order-1 md:order-2 flex items-center gap-4">
                  <Social href="https://github.com/JVictorLA">
                    <Github size={18} />
                  </Social>
                  <Social href="https://www.linkedin.com/in/jo%C3%A3o-victor-lima-de-almeida-b0b56a321">
                    <Linkedin size={18} />
                  </Social>
                  <Social href="https://www.instagram.com/_jvking.la77/">
                    <Instagram size={18} />
                  </Social>
                  <Social href="https://joaovictoralmeida.netlify.app/">
                    <Globe size={18} />
                  </Social>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Index;

/* COMPONENTES AUXILIARES */

const StatusBadge = ({ status }: { status: StatusState }) => (
  <div className="flex items-center gap-2 text-xs">
    <StatusDot status={status} />
    <span className={
      status === "online"
        ? "text-green-400"
        : status === "offline"
        ? "text-red-400"
        : "text-yellow-400"
    }>
      {status === "online"
        ? "Online"
        : status === "offline"
        ? "Offline"
        : "Verificando"}
    </span>
  </div>
);

const StatusDot = ({ status }: { status: StatusState }) => (
  <span
    className={`w-2 h-2 rounded-full ${
      status === "online"
        ? "bg-green-400 animate-pulse"
        : status === "offline"
        ? "bg-red-400"
        : "bg-yellow-400 animate-pulse"
    }`}
  />
);

const Social = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition"
  >
    {children}
  </a>
);
