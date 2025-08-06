import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/404";
import { ShortUrl } from "./pages/ShortUrl";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:short-url" element={<ShortUrl />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}