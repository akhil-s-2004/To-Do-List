    import { Link,useNavigate } from "react-router";
    import Button from "../../components/atoms/Button/Button";
    import Input from "../../components/atoms/Input/Input";
    import Logo from "../../components/atoms/Logo/Logo";
    import styles from "./SignInPage.module.css";
    export default function SignInPage() {
    const navigate = useNavigate();
    return (
        <main className={styles.page}>
        <div className={styles.card}>
            <div className={styles.logo}>
            <Logo />
            </div>

            <div className={styles.heading}>
            <h1>Welcome back.</h1>

            <p>
                Sign in to continue to your tasks.
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

            <Button type="submit" >
                Sign in
            </Button>
            </form>

            <p className={styles.footer}>
            Don't have an account?{" "}
            <Link to="/signup">
                Create one
            </Link>
            </p>
        </div>
        </main>
    );
    }