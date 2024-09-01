import Link from "next/link";
import {
  HomeIcon,
  NewspaperIcon,
  NotebookIcon,
  CalendarIcon,
  PersonStandingIcon,
  LogInIcon,
  LogOutIcon,
  LockIcon,
  MoveDiagonalIcon,
} from "lucide-react";

import styles from "./Navbar.module.css";
import { getServerSession } from "next-auth";

async function Navbar() {
  const session = await getServerSession();
  const isLogged = !!session?.user;

  return (
    <header className={styles.navbar}>
      <div className={styles.links}>
        <Link className={styles.navbarLink} href="/">
          Home <HomeIcon />
        </Link>
        <Link className={styles.navbarLink} href="/news">
          News <NewspaperIcon />
        </Link>
        <Link
          className={!isLogged ? styles.navbarLinkLocked : styles.navbarLink}
          href="/planner"
        >
          Planner {!isLogged ? <LockIcon /> : <NotebookIcon />}
        </Link>
        <Link
          className={!isLogged ? styles.navbarLinkLocked : styles.navbarLink}
          href="/manager"
        >
          Manager {!isLogged ? <LockIcon /> : <MoveDiagonalIcon />}
        </Link>
        <Link
          className={!isLogged ? styles.navbarLinkLocked : styles.navbarLink}
          href="/calendar"
        >
          Calendar {!isLogged ? <LockIcon /> : <CalendarIcon />}
        </Link>
        <Link className={styles.navbarLink} href="/about">
          About <PersonStandingIcon />
        </Link>
        {!isLogged ? (
          <Link className={styles.navbarLink} href="/api/auth/signin">
            Login <LogInIcon />
          </Link>
        ) : (
          <Link className={styles.navbarLink} href="/api/auth/signout">
            Logout <LogOutIcon />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
