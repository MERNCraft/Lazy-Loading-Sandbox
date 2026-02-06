import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';

const LazyComponent = lazy(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => 
      resolve(import('./LazyComponent.jsx')),
      2000
    )
  })
});

function App() {
  return (
    <Suspense fallback={<div>Two seconds please...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

createRoot(document.getElementById('root')).render(<App />);
