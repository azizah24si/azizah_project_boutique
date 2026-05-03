import { createRoot } from "react-dom/client";
import './tailwind.css';    
import FrameworkList from "./FrameworkList";
import frameworkData from "./framework.json";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import ResponsiveDesign from "./ResponsiveDesign";

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <FrameworkList /> */}
            {/* <FrameworkListSearchFilter/> */}
            <ResponsiveDesign/>
        </div>
    )