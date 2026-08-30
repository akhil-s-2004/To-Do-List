import {
  FormEvent,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Logo from "../components/atoms/Logo";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";

import { useAuth } from "../hooks/useAuth";

export default function SignInPage() {
  const navigate = useNavigate();

  const {
    signIn,
    error,
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent,
  ) {
    event.preventDefault();

    try {
      setLoading(true);

      await signIn(
        email,
        password,
      );

      navigate("/tasks");
    } catch {
      // Error is exposed by useAuth.
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Logo />

        <h1>
          Welcome back
        </h1>

        <p>
          Sign in to manage your tasks.
        </p>

        <form
          onSubmit={handleSubmit}
        >
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value,
              )
            }
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value,
              )
            }
            required
          />

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign in"}
          </Button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}