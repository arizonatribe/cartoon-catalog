import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "../features/layout";
import { CatalogContainer, SearchWithAutoCompleteContainer } from "../features/catalog";

export function App() {
    return (
        <Layout fixed headerContent={<SearchWithAutoCompleteContainer />}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CatalogContainer />} />
                    <Route path="/cartoon-catalog" element={<CatalogContainer />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    );
}
