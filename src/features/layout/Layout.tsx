import React from "react";
import cn from "classnames";
import styles from "./Layout.module.css";

interface Props {
    fixed?: boolean
    children: React.ReactNode
    headerContent?: React.ReactNode
    sideContent?: React.ReactNode
}

export function Layout(props: Props) {
    const { children, fixed, headerContent, sideContent } = props;

    const layoutStyles = cn({
        [styles.layout]: true,
        [styles.fixed]: fixed,
        [styles["with-sidebar"]]: !!sideContent
    });

    return (
        <div className={layoutStyles}>
            <div className={styles.header}>{headerContent || "Welcome!"}</div>
            {sideContent && <div className={styles.side}>{sideContent}</div>}
            <div className={styles.main}>{children}</div>
        </div>
    );
}
