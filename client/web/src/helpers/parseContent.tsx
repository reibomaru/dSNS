const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/g;
const anchorSyntaxRegex = /(\[.+\]\(.+\))/g;
const anchorSyntaxRegexToExtractContent = /\[(.+)\]\((.+)\)/i;

/**
 * detect anchorSyntaxRegex and replace anchor element
 * @param str raw string
 * @returns anchor element
 */
const string2AnchorElement = (str: string) => {
  const parts = str.match(anchorSyntaxRegexToExtractContent);
  if (parts && parts.length > 2) {
    const content = parts[1];
    const url = parts[2];
    return (
      <a
        href={url}
        style={{ color: "inherit" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }
  return <></>;
};

/**
 * parse string and create jsx element
 * @param content
 * @returns
 */
export const parseContent = (content: string) => {
  return content
    .replace(urlRegex, "[$&]($&)")
    .split(anchorSyntaxRegex)
    .map((part, index) => {
      return (
        <span key={`${part}_${index}`}>
          {anchorSyntaxRegex.test(part) ? string2AnchorElement(part) : part}
        </span>
      );
    });
};
