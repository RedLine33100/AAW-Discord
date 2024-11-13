import React from "react";
import { createRoot } from "react-dom/client";

const Application = ()=> {
 return <h1>Hello World!</h1>;
}

const root = createRoot(document.getElementById("root"));
root.render(<Application/>, document.getElementById("root"))
