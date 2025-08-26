import { BrowserRouter, Route, Routes } from 'react-router';

import { ShortUrlListProvider } from './context/shortUrlList.context';
import { NotFound } from './pages/404';
import { Home } from './pages/Home';
import { ShortUrl } from './pages/ShortUrl';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ShortUrlListProvider>
              <Home />
            </ShortUrlListProvider>
          }
        />

        <Route path="/:short-url" element={<ShortUrl />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
