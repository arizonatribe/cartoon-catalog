import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "../features/layout";
import { CatalogContainer, SearchLocationsContainer } from "../features/catalog";

export function App() {
    return (
        <Layout headerContent={<SearchLocationsContainer />}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CatalogContainer />} />
                    <Route path="/catalog" element={<CatalogContainer />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    );
}
