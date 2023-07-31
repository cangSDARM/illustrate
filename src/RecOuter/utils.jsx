import CodeSample from "./CodeSample";
import Annotations, { AnnotationToggler } from "./Annotations";
import Table from "./Table";
import MathBlock from "./Math";
import FlexContainer from "./Flex";

const mdText = (str = "") => {
  const strong = /\*\*(.*?)\*\*/gi;
  const result = [str];
  let matched,
    lastIndex = 0;

  while ((matched = strong.exec(str)) !== null) {
    result.pop();
    result.push(str.slice(lastIndex, strong.lastIndex - matched[0].length));
    result.push(<strong key={matched[1] + lastIndex}>{matched[1]}</strong>);
    lastIndex = strong.lastIndex;
    result.push(str.slice(lastIndex));
  }

  if (result.every((v) => typeof v === "string")) return result.join("");
  return result;
};

export const renderExplanations = (explanations = [], depth = 0, config) => {
  const DefaultTag = config?.defaultTag || "p";

  return explanations.map((exp, idx) => {
    if (typeof exp === "string") {
      // p don't allowed in p
      if (depth !== 0) return mdText(exp);
      else return <DefaultTag key={idx}>{mdText(exp)}</DefaultTag>;
    }

    const {
      Tag: expTag = DefaultTag,
      content: expContent,
      children: expChildren,
      props: expProps = {},
    } = exp;

    let Tag = expTag || "p";

    switch (Tag) {
      case "CodeSample":
        Tag = CodeSample;
        break;
      case "Annotations":
        Tag = Annotations;
        break;
      case "AnnotationToggler":
        Tag = AnnotationToggler;
        break;
      case "Table":
        Tag = Table;
        break;
      case "Math":
        Tag = MathBlock;
        break;
      case "Flex":
        Tag = FlexContainer;
        break;
      case "a":
        expProps.target ||= "_blank";
        break;
    }

    let content = expContent;

    // support naked string
    if (Array.isArray(exp)) {
      content = renderExplanations(exp, depth + 1, config);
    }
    // configured children
    if (Array.isArray(expChildren)) {
      content = renderExplanations(expChildren, depth + 1, config);
    }

    if (typeof content === "string") content = mdText(content);

    return (
      <Tag key={idx} {...expProps}>
        {content}
      </Tag>
    );
  });
};
