import React from "react";
import clsx from "clsx";
import classes from "./style.module.css";

const jump = (href) => {
  if (globalThis.location.pathname.startsWith(href)) return;

  globalThis.history.pushState({}, "", globalThis.location.pathname);
  globalThis.history.replaceState({}, "", href);
};

const getRouterUsingPath = (routers = [], path = "") =>
  routers.find((rt) => rt.href.startsWith(path)) || routers[0];

const Header = ({ routers = [], onRouterChange, base = "" }) => {
  const [pathName, setPathName] = React.useState([
    globalThis.location.pathname,
  ]);

  const handleRouterChange = React.useCallback((rt) => {
    onRouterChange?.(rt);
    setPathName(rt.href);
    window.document.title = rt.title;
  }, []);

  React.useEffect(() => {
    let curPath = globalThis.location.pathname;

    if (
      !routers.every((rt) => {
        return curPath.startsWith(rt);
      })
    ) {
      curPath = routers[0];
      jump(curPath.href);
      handleRouterChange(getRouterUsingPath(routers, curPath));
    }
  }, []);

  React.useEffect(() => {
    const listener = (e) => {
      const curPath = globalThis.document.location.pathname;
      setPathName(curPath);
      handleRouterChange(getRouterUsingPath(routers, curPath));
    };

    window?.addEventListener("popstate", listener);

    return () => window?.removeEventListener("popstate", listener);
  }, []);

  return (
    <div className={classes.header}>
      {routers.map((rt) => (
        <a
          key={rt.href}
          href={rt.href}
          className={clsx(rt.href === pathName && classes["this-page"])}
          onClick={(e) => {
            if (rt.href === pathName) return;

            e.stopPropagation();
            e.preventDefault();
            jump(rt.href);
            handleRouterChange?.(rt);
          }}
        >
          {rt.label}
        </a>
      ))}
    </div>
  );
};

export default Header;