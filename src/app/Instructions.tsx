import React from "react";
import logo from "./logo.svg";
import styles from "./Instructions.module.css";

export function Instructions() {
    return (
        <div className={styles.instructions}>
            <header className={styles.header}>
                <img src={logo} className={styles.logo} alt="logo" />
                <p>
                  Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <span>
                    <span>Learn </span>
                    <a
                      className={styles.link}
                      href="https://reactjs.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      React
                    </a>
                    <span>, </span>
                    <a
                      className={styles.link}
                      href="https://redux.js.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Redux
                    </a>
                    <span>, </span>
                    <a
                      className={styles.link}
                      href="https://redux-toolkit.js.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Redux Toolkit
                    </a>
                    ,<span> and </span>
                    <a
                      className={styles.link}
                      href="https://react-redux.js.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      React Redux
                    </a>
                </span>
            </header>
        </div>
    );
}
