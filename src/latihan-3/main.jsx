import { createRoot } from "react-dom/client";
import TailwindCSS from "./TailwindCSS";
import './tailwind.css';
import Typography from "./Typography";
import FlexboxGrid from "./FlexboxGrid";
import FormTiket from "./FormTiket";
import "../index.css";
    

createRoot(document.getElementById("root")).render(
  <FormTiket />
);