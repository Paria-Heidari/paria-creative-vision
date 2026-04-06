import Link from 'next/link';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from '@/components/ui/icons';

const linkClassName =
  'bg-foreground/5 text-foreground-muted hover:bg-accent-gold flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:text-white';

const items = [
  {
    href: 'https://www.instagram.com/oceanus.photography/',
    label: 'Instagram',
    Icon: InstagramIcon,
  },
  {
    href: 'https://github.com',
    label: 'GitHub',
    Icon: GitHubIcon,
  },
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    Icon: LinkedInIcon,
  },
] as const;

export function SocialIcons() {
  return (
    <div className="flex items-center gap-4">
      {items.map(({ href, label, Icon }) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
        </Link>
      ))}
    </div>
  );
}
