import React from "react";

const AnnotationContext = React.createContext();

export const AnnotationContextProvider = ({
  children,
  defaultFolded = true,
}) => {
  const [folding, setFolding] = React.useState(defaultFolded);

  return (
    <AnnotationContext.Provider value={{ folding, setFolding }}>
      {children}
    </AnnotationContext.Provider>
  );
};

export const useAnnotationContext = () => {
  return React.useContext(AnnotationContext);
};
