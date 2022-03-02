import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "../features/layout";
import { Counter } from "../features/counter";
import { Instructions } from "./Instructions";
import { CatalogContainer, SearchLocationsContainer } from "../features/characters";

export function App() {
    return (
        <Layout headerContent={<SearchLocationsContainer />}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CatalogContainer />} />
                    <Route path="/counter" element={<Counter />} />
                    <Route path="/catalog" element={<CatalogContainer />} />
                    <Route path="/instructions" element={<Instructions />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    );
}
