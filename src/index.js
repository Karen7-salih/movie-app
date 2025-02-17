import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // ✅ Import React Query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // ✅ Import DevTools
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient(); // Create a QueryClient instance

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>  {/*  Wrap App in QueryClientProvider */}
      <App />
      
      {/* ✅ Add React Query DevTools here */}
      <ReactQueryDevtools initialIsOpen={false} />  

    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
