import React from "react";

import "./common.css";
import "./hard-encoded.css";
import "./illustrated.css";

import Header from "./Header";
import Intro from "./Intro";
import { routers, base } from "./router";
import RecOuter from "./RecOuter";
import { SluggerContextProvider } from "./context/slugger";
import Datagram from "./Datagram";
import Footer from "./Footer";

const App = () => {
  const [curPage, setCurPage] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [JSON, setJSON] = React.useState({});

  React.useEffect(() => {
    curPage?.json().then((json) => {
      setJSON(json?.default || json);
      setLoading(false);
    });
  }, [curPage]);

  return (
    <>
      <Header
        routers={routers}
        base={base}
        onRouterChange={(rt) => {
          window.document.title = rt.title;
          setLoading(true);
          setCurPage(rt);
        }}
      />
      {loading ? (
        <div>loading...</div>
      ) : (
        <SluggerContextProvider>
          <Intro {...JSON?.intro} />
          {(function () {
            let datagramMeta = { name: "", children: [], length: 0 };

            return JSON?.sections?.map((sec) => {
              const { type, tags, datagram, ...restSec } = sec;
              const key = sec.id || sec.label;

              if (type === "Datagram") {
                datagramMeta.name = sec.label;
                datagramMeta.length = datagram;
                datagramMeta.children = [];

                return undefined;
              }

              if (datagramMeta.name) {
                let newLen = datagramMeta.children.length;
                if (newLen < datagramMeta.length) {
                  newLen = datagramMeta.children.push(
                    <RecOuter key={sec.label} types={tags} {...restSec} />
                  );
                }

                if (newLen < datagramMeta.length) {
                  return undefined;
                } else {
                  const { name, children } = datagramMeta;
                  datagramMeta = {};
                  return (
                    <Datagram key={key} label={name} children={children} />
                  );
                }
              }

              return <RecOuter key={key} types={tags} {...restSec} />;
            });
          })()}
          <Footer {...JSON.ending} />
        </SluggerContextProvider>
      )}
    </>
  );
};

export default App;
