import Link from "next/link";
import {
  HomeIcon,
  NewspaperIcon,
  NotebookIcon,
  CalendarIcon,
  PersonStandingIcon,
} from "lucide-react";

import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.links}>
        <Link className={styles.navbarLink} href="/">
          Home <HomeIcon />
        </Link>
        <Link className={styles.navbarLink} href="news">
          News <NewspaperIcon />
        </Link>
        <Link className={styles.navbarLink} href="planner">
          Planner <NotebookIcon />
        </Link>
        <Link className={styles.navbarLink} href="calendar">
          Calendar <CalendarIcon />
        </Link>
        <Link className={styles.navbarLink} href="about">
          About <PersonStandingIcon />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
