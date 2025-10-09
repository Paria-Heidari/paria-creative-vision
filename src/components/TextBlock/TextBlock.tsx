interface TextBlockProps {
  title?: string;
  content: string;
}

export const TextBlock = (props: TextBlockProps) => {
  return (
      <div className="max-w-3xl mx-auto my-12 text-justify">
        <h1 className="text-xl">{props.title}</h1>
        <div className="text-foreground text-xl">
          {props.content}
        </div>
      </div>
  );
};

