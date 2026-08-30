import Button from "../atoms/Button";
import Logo from "../atoms/Logo";

import type { User } from "../../types/auth";

interface Props {
  user: User;
  onLogout: () => Promise<void>;
}

export default function Header({
  user,
  onLogout,
}: Props) {
  return (
    <header className="app-header">
      <Logo />

      <div className="header-right">
        <span>{user.email}</span>

        <Button
          variant="ghost"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}