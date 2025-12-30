"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import Chatbot from "@/components/Chatbot";
import { Github, Linkedin, Instagram, Globe } from "lucide-react";


const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%236E44FF&quot; fill-opacity=&quot;0.03&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      {/* Header */}
      <header className="relative z-10 p-6 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                PromptStudio AI
              </h1>
              <p className="text-gray-400 text-sm">Transforme ideias vagas em prompts detalhados</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Conectado ao n8n</p>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full h-[80vh] max-w-6xl bg-gray-800/20 border border-gray-700/30 rounded-3xl backdrop-blur-lg shadow-2xl">
          <Chatbot />
        </div>
      </main>

    {/* Footer */}
<footer className="relative z-10 border-t border-gray-800/50">
  <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

    {/* Left */}
    <p className="text-sm text-gray-500">
      © {new Date().getFullYear()} PromptCraft AI
    </p>

    {/* Center */}
    <p className="text-sm text-gray-400 text-center">
      Desenvolvido com ❤️ para criadores no-code
    </p>

    {/* Right */}
<div className="flex flex-col items-center md:items-end gap-2">

  <a
    href="https://joaovictoralmeida.netlify.app/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition"
  >
    Criado por João Victor Almeida
  </a>

  {/* Social Icons */}
  <div className="flex items-center gap-3">
    <a
      href="https://github.com/JVictorLA"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition"
      aria-label="GitHub"
    >
      <Github size={18} />
    </a>

    <a
      href="https://www.linkedin.com/in/jo%C3%A3o-victor-lima-de-almeida-b0b56a321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition"
      aria-label="LinkedIn"
    >
      <Linkedin size={18} />
    </a>

    <a
      href="https://www.instagram.com/_jvking.la77/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition"
      aria-label="Instagram"
    >
      <Instagram size={18} />
    </a>

    <a
      href="https://joaovictoralmeida.netlify.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition"
      aria-label="Portfolio"
    >
      <Globe size={18} />
    </a>
  </div>

</div>

  </div>
</footer>
    </div>
  );
};

export default Index;