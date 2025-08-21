import { ReactNode } from "react";
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx'
import './index.css'
import { QuestionsTableProvider } from './components/providers/QuestionsTableProvider.tsx';
import { ThemeProvider } from './hooks/useTheme';

const queryClient = new QueryClient();

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dsa-pathfinder-theme">
      <QueryClientProvider client={queryClient}>
        <QuestionsTableProvider>
          {children}
        </QuestionsTableProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <AppProviders>
    <App />
  </AppProviders>
);