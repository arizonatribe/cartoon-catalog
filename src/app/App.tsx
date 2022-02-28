import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "../features/layout";
import { Counter } from "../features/counter";
import { Instructions } from "./Instructions";
import { CatalogContainer } from "../features/characters";

export function App() {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Instructions />} />
                    <Route path="/counter" element={<Counter />} />
                    <Route path="/catalog" element={<CatalogContainer />} />
                    <Route path="/instructions" element={<Instructions />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    );
}
