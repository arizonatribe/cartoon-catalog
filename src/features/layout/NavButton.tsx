import React from "react";
import "./NavButton.styles.css";

interface Props {
    onClick(): void
    children: React.ReactNode
}

export function NavButton(props: Props) {
    const { children, onClick } = props;
    return (
        <button onClick={onClick}>{children}</button>
    )
}
