import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserProvider from './components/Context/UserProvider/UserProvider';
import './index.css'
import { QueryClient, QueryClientProvider, } from 'react-query'
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <App />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);