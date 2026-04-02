import { Typography } from "../Typography";

interface TextBlockProps {
  title?: string;
  content: string;
  className?: string;
}

const TextBlock = ({ title, content, className }: TextBlockProps) => {
  return (
    <section className={`w-full py-16 px-6 ${className ?? ''}`}>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 text-center">
        {title ? (
          <div className="flex flex-col items-center gap-3">
            <Typography
              variant="h2"
              as="h2"
              className="text-foreground tracking-tight"
            >
              {title}
            </Typography>
            <span className="block w-12 h-0.5 bg-accent-gold rounded-full" />
          </div>
        ) : null}
        <Typography
          variant="body"
          as="p"
          className="text-foreground-muted leading-relaxed max-w-prose"
        >
          {content}
        </Typography>
      </div>
    </section>
  );
};

export default TextBlock;
