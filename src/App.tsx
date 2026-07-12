import { Route, Routes } from "react-router";
import Index from "./pages/Index";
import License from "./pages/License";
import { PATHS } from "./consts/routes";

function App() {
  return (
    <Routes>
      <Route index path={PATHS.index} element={<Index />} />
      <Route path={PATHS.licenses} element={<License />} />
    </Routes>
  );
}

export default App;
