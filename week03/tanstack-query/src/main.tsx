import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevTools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevTools /> */}
      <App />
    </QueryClientProvider>
  </StrictMode>
);
