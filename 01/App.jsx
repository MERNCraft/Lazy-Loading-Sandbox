import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';

const LazyComponent = lazy(() => import('./LazyComponent.jsx'))

function App() {
  return (
    <Suspense fallback={<div>Two seconds please...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

createRoot(document.getElementById('root')).render(<App />);
