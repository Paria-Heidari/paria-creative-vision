interface TextBlockProps {
  title?: string;
  content: string;
}

const TextBlock = (props: TextBlockProps) => {
  return (
      <div className="max-w-3xl mx-auto my-12 text-justify px-4">
        <h1 className="text-xl">{props.title}</h1>
        <div className="text-foreground text-xl leading-relaxed">
          {props.content}
        </div>
      </div>
  );
};

export default TextBlock;