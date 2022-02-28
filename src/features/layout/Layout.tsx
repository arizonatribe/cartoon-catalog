import React from "react";
import "./Layout.styles.css";

interface Props {
    children: React.ReactNode
    headerContent?: React.ReactNode
    sideContent?: React.ReactNode
}

export function Layout(props: Props) {
    const { children, headerContent, sideContent } = props;
    const layoutStyles = [
        "layout",
        sideContent && "with-sidebar"
    ].filter(Boolean).join(" ");

    return (
        <div className={layoutStyles}>
            <div className="header">{headerContent || "Welcome!"}</div>
            {sideContent && <div className="side">{sideContent}</div>}
            <div className="main">{children}</div>
        </div>
    );
}
