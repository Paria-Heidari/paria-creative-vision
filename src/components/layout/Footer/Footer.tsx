import Link from 'next/link';
import { Container } from '../Container';
import { Grid, GridItem } from '../Grid';
import { Stack } from '../Stack';
import { Typography } from '@/components/ui/Typography';
import { MailIcon } from '@/components/ui/icons';
import { SocialIcons } from './SocialIcons';
import { footerInfo, navigation } from '@/data/data';

const NavLinks = () => (
  <ul className="flex flex-col gap-3 mt-4">
    {navigation.map((item) => (
      <li key={item.href}>
        <Link href={item.href}>
          <Typography
            variant="navLink"
            as="span"
            className="text-foreground-muted hover:text-accent-gold transition-colors duration-300"
          >
            {item.name}
          </Typography>
        </Link>
      </li>
    ))}
  </ul>
);

export default function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-foreground/10">
      {/* Main Section */}
      <Container maxWidth="xl" className="py-8 lg:py-12">
        <Grid cols="footer" gap={8}>
          {/* Brand */}
          <GridItem className="md:col-span-2">
            <Stack direction="vertical" gap={4} className="max-w-md">
              <Typography variant="h5" as="h3" className="font-syne">
                {footerInfo.title}
              </Typography>
              <Typography variant="paragraphSmall" as="p" className="text-foreground-muted">
                {footerInfo.content}
              </Typography>
              <SocialIcons />
            </Stack>
          </GridItem>

          {/* Navigation */}
          <GridItem>
            <Typography variant="caption" as="h4" className="font-semibold text-foreground tracking-widest uppercase">
              {footerInfo.navigationTitle}
            </Typography>
            <NavLinks />
          </GridItem>

          {/* Contact */}
          <GridItem>
            <Typography variant="caption" as="h4" className="font-semibold text-foreground tracking-widest uppercase">
              {footerInfo.contactTitle}
            </Typography>
            <Stack direction="vertical" gap={3} className="mt-4">
              <Link
                href={`mailto:${footerInfo.contactEmail}`}
                className="inline-flex items-center gap-2 text-foreground-muted hover:text-accent-gold transition-colors duration-300"
                aria-label={`Email ${footerInfo.contactName}`}
              >
                <MailIcon aria-hidden="true" />
                <Typography variant="caption" as="span">
                  {footerInfo.contactName}
                </Typography>
              </Link>
              <Typography variant="caption" as="p" className="text-foreground-subtle">
                {footerInfo.contactMessage}
              </Typography>
            </Stack>
          </GridItem>

        </Grid>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-foreground/10">
        <Container maxWidth="xl" className="py-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <Typography variant="caption" as="p" className="text-foreground-subtle">
              {footerInfo.copyright}
            </Typography>
            <Typography variant="caption" as="p" className="text-foreground-subtle">
              {footerInfo.craftedWith}
              <span className="text-accent-gold ml-1">{footerInfo.location}</span>
            </Typography>
          </div>
        </Container>
      </div>
    </footer>
  );
}
