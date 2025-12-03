"use client";
import styles from "./List.module.css";

interface ListProps {
  items: string[];
  ordered?: boolean;
}

export default function List({ items, ordered = false }: ListProps) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag className={styles.list}>
      {items.map((item, index) => (
        <li key={index} className={styles.item}>
          {item}
        </li>
      ))}
    </ListTag>
  );
}
