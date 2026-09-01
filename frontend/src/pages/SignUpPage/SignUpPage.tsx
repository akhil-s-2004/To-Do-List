import { useNavigate,Link } from "react-router";
import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";
import Logo from "../../components/atoms/Logo/Logo";
import styles from "./SignUpPage.module.css";
export default function SignUpPage() {
  const navigate = useNavigate();
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.heading}>
          <h1>Create your account.</h1>

          <p>
            Start with a clean space for
            your tasks.
          </p>
        </div>

        <form className={styles.form} onSubmit={(e) => {
          e.preventDefault();
          navigate("/tasks");
        }}> 
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
          />

          <Button type="submit">
            Create account
          </Button>
        </form>

        <p className={styles.footer}>
          Already have an account?{" "}
          <Link to="/signin">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}