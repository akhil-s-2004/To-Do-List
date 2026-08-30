import { Link } from "react-router-dom";

import Logo from "../components/atoms/Logo";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <Logo />

        <div className="nav-links">
          <Link to="/signin">
            Sign in
          </Link>

          <Link
            to="/signup"
            className="nav-signup"
          >
            Get started
          </Link>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">
              SIMPLE TASK MANAGEMENT
            </p>

            <h1>
              Get things done,
              <br />
              without the noise.
            </h1>

            <p className="hero-description">
              Organize your everyday tasks,
              keep track of what matters,
              and stay focused on what
              needs to get done.
            </p>

            <div className="hero-actions">
              <Link
                to="/signup"
                className="button button-primary"
              >
                Create account
              </Link>

              <Link
                to="/signin"
                className="button button-secondary"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="hero-preview">
            <div className="preview-window">
              <div className="preview-header">
                <div>
                  <span className="preview-label">
                    TODAY
                  </span>

                  <h3>
                    Today's tasks
                  </h3>
                </div>

                <span>
                  3 tasks
                </span>
              </div>

              <div className="preview-task">
                <span className="preview-check">
                  ✓
                </span>

                <span>
                  Finish project proposal
                </span>
              </div>

              <div className="preview-task">
                <span className="preview-check" />

                <span>
                  Review pull requests
                </span>
              </div>

              <div className="preview-task">
                <span className="preview-check" />

                <span>
                  Plan tomorrow
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <div>
            <span>01</span>
            <h3>Stay organized</h3>
            <p>
              Keep every task in one
              simple, focused workspace.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Group your work</h3>
            <p>
              Organize tasks into groups
              that match the way you work.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Focus on today</h3>
            <p>
              See what needs attention
              without unnecessary complexity.
            </p>
          </div>

          <div>
            <span>04</span>
            <h3>Track your progress</h3>
            <p>
              Complete tasks and keep
              unfinished work visible.
            </p>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <Logo />

        <span>
          Simple tasks. Clear mind.
        </span>
      </footer>
    </div>
  );
}