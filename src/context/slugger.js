import React from "react";
import { slug as githubSlug } from "github-slugger";

const SluggerContext = React.createContext();

export const SluggerContextProvider = ({ children }) => {
  const [curSlug, setCurSlug] = React.useState("");

  React.useEffect(() => {
    const href = window.location.hash.substring(1);
    setCurSlug(window.decodeURI(href));
  }, []);

  return (
    <SluggerContext.Provider
      value={{
        curSlug,
        changeCurSlug: (slug) => {
          setCurSlug(slug);

          let href = window.location.href.replace(/#.*/, "");
          if (slug) {
            window.history.replaceState({}, "", `${href}#${slug}`);
            // we have some expanding action to do, so need to delay it
            window.requestAnimationFrame(() => {
              document.querySelector("#" + slug)?.scrollIntoView?.({
                behavior: "smooth",
                block: "nearest",
                inline: "nearest",
              });
            });
          } else {
            window.history.replaceState({}, "", `${href}`);
          }
        },
        getSlug: (text) => githubSlug(text),
      }}
    >
      {children}
    </SluggerContext.Provider>
  );
};

export const useSluggerContext = () => {
  return React.useContext(SluggerContext);
};
