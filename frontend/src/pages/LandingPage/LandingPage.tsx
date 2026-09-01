import { useNavigate } from "react-router";
import { useState,useEffect, useRef } from "react";
import Button from "../../components/atoms/Button/Button";
import Logo from "../../components/atoms/Logo/Logo";
import styles from "./LandingPage.module.css";
import Checkbox from "../../components/atoms/Checkbox/Checkbox";

import focusImage from "../../assets/focus.png"
import organizeImage from "../../assets/organize.png";
import rememberImage from "../../assets/remember.png";
import Footer from "../../components/organisms/Footer/Footer";

const features = [
  {
    number: "01",
    title: "Focus",
    description:
      "Keep today's work visible without unnecessary dashboard noise.",
    image: focusImage,
  },
  {
    number: "02",
    title: "Organize",
    description:
      "Separate work, personal tasks, and everything else into groups.",
    image: organizeImage,
  },
  {
    number: "03",
    title: "Remember",
    description:
      "Give tasks due dates when they actually need one.",
    image: rememberImage,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const featureRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )[0];

        if (!visibleEntry) return;

        const index = Number(
          (visibleEntry.target as HTMLElement).dataset.featureIndex
        );

        setActiveFeature(index);
      },
      {
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    featureRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className= {styles.page}>
      <header className={styles.header}>
        <Logo height={60}  />
        {/* <Link to="/signin" style={{ color: "var(--color-primary)" }}>
          Sign in
        </Link> */}
        <div className={styles.actions}>
            <Button variant="secondary" onClick={() => navigate("/signin")}>
                Sign in
            </Button>

            <Button onClick={() => navigate("/signup")}>
            Get started
            </Button>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>
              A simpler way to get things done.
            </p>

            <h1>
              Make space for what matters.
            </h1>

            <p className={styles.description}>
              Organize your tasks into focused
              groups and keep your day clear
              without unnecessary clutter.
            </p>

            <div className={styles.actions} style={{gap: "var(--space-3)"}}>
                <Button onClick={() => navigate("/signup")}>
                  Get started
                </Button>

                <Button variant="secondary" onClick={() => navigate("/signin")} style={{border: "1px solid var(--color-border)"}}>
                  Sign in
                </Button>
            </div>
          </div>

          <div className={styles.preview}>
            <p>Today's tasks</p>
            <div>
                <Checkbox></Checkbox>
                <span>Finish Frontend</span>
            </div>
            <div>
                <Checkbox></Checkbox>
                <span>Finish Backend</span>
            </div>
            <div>
                <Checkbox></Checkbox>
                <span>Finish Documentation</span>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureVisual}>
            <div className={styles.featureImageWrapper}>
              {features.map((feature, index) => (
                <img
                  key={feature.number}
                  src={feature.image}
                  alt=""
                  className={`${styles.featureImage} ${
                    index === activeFeature
                      ? styles.activeImage
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          <div className={styles.featureList}>
            {features.map((feature, index) => (
              <article
                key={feature.number}
                ref={(element) => {
                  featureRefs.current[index] = element;
                }}
                data-feature-index={index}
                className={`${styles.feature} ${
                  index === activeFeature
                    ? styles.activeFeature
                    : ""
                }`}
              >
                <span className={styles.featureNumber}>
                  {feature.number}
                </span>

                <h2>{feature.title}</h2>

                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}