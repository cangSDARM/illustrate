import React from "react";

const AnnotationContext = React.createContext();

export const AnnotationContextProvider = ({ children }) => {
  const [folding, setFolding] = React.useState(true);

  return (
    <AnnotationContext.Provider value={{ folding, setFolding }}>
      {children}
    </AnnotationContext.Provider>
  );
};

export const useAnnotationContext = () => {
  return React.useContext(AnnotationContext);
};
