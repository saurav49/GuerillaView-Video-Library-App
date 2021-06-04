import React from "react";
import { category } from "../../videoData";
import styles from "./Category.module.css";
import { useTheme } from "../../context/useTheme";
import { useDataContext } from "../../context/dataContext";

const Category = () => {
  const { theme } = useTheme();
  const { setCurrentCategory } = useDataContext();

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.category} ${styles.categoryDark}`
          : `${styles.category} ${styles.categoryLight}`
      }
    >
      {category.map(({ id, name }) => {
        return (
          <button
            className={
              theme === "dark"
                ? `${styles.categoryCapsule} ${styles.categoryCapsuleDark}`
                : `${styles.categoryCapsule} ${styles.categoryCapsuleLight}`
            }
            onClick={() => setCurrentCategory(name)}
            key={id}
          >
            <p className={styles.categoryTitle}> {name} </p>
          </button>
        );
      })}
    </div>
  );
};

export { Category };
