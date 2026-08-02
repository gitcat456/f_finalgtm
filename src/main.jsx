import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HomePageSkeleton } from './components/skeletons/PageSkeletons.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<HomePageSkeleton />}>
      <App />
    </Suspense>
  </StrictMode>,
)
