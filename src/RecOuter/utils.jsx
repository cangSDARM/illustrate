import CodeSample from "./CodeSample";
import Annotations, { AnnotationToggler } from "./Annotations";
import Table from "./Table";

export const renderExplanations = (explanations = [], depth = 0, config) => {
  const DefaultTag = config?.defaultTag || "p";

  return explanations.map((exp, idx) => {
    if (typeof exp === "string") {
      if (depth !== 0) return exp;
      else return <DefaultTag key={idx}>{exp}</DefaultTag>;
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
      case "a":
        expProps.target ||= "_blank";
        break;
    }

    let content = expContent;

    if (Array.isArray(exp)) {
      content = renderExplanations(exp, depth + 1, config);
    }
    if (Array.isArray(expChildren)) {
      content = renderExplanations(expChildren, depth + 1, config);
    }

    return (
      <Tag key={idx} {...expProps}>
        {content}
      </Tag>
    );
  });
};
