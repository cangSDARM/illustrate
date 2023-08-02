import classes from "./style.module.css";
import Balancer from "react-wrap-balancer";

const Intro = ({ title = "", subtitle = "", desc = "", intro = "" }) => {
  return (
    <section>
      <h1>
        <Balancer>{title}</Balancer>
      </h1>
      {subtitle && (
        <h3>
          <Balancer>{subtitle}</Balancer>
        </h3>
      )}
      {desc && (
        <h5>
          <Balancer>{desc}</Balancer>
        </h5>
      )}
      {intro && (
        <div className={classes["intro-block"]}>
          <p>
            <Balancer>{intro}</Balancer>
          </p>
        </div>
      )}
    </section>
  );
};

export default Intro;
