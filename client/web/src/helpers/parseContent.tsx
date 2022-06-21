const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/g;
const anchorSyntaxRegex = /(\[.+\]\(.+\))/g;
const anchorSyntaxRegexToExtractContent = /\[(.+)\]\((.+)\)/i;

const string2AnchorElement = (str: string) => {
  const parts = str.match(anchorSyntaxRegexToExtractContent);
  if (parts && parts.length > 2) {
    const content = parts[1];
    const url = parts[2];
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return <></>;
};

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
