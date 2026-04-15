import { SectionHeader } from '@/components/ui/SectionHeader';
import { LinkData } from '@/types/ui.types';
import WorkCard, { WorkCardProps } from './WorkCard';
import { Stack } from '@/components/layout/Stack';
import { Grid, GridItem } from '@/components/layout/Grid';

interface SelectedWorkSectionProps {
  info: {
    title: string;
    subTitle: string;
    ctaLink: LinkData;
  };
  cards: Omit<WorkCardProps, 'animateFrom'>[];
  className?: string;
}

export default function SelectedWorkSection({ info, cards }: SelectedWorkSectionProps) {
  return (
    <Stack direction="vertical" gap={{ base: 8, md: 12 }}>
      <SectionHeader title={info.title} subTitle={info.subTitle} ctaLink={info.ctaLink} />
      <Grid gap={8} cols="2">  
        {cards.map((card, index) => (
          <GridItem key={card.title} colSpan={1}>
            <WorkCard
              {...card}
              animateFrom={index % 2 === 0 ? 'left' : 'right'}
            />
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
}
