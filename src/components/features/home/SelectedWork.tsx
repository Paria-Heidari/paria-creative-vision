import { SectionHeader } from '@/components/ui/SectionHeader';
import WorkCard, { WorkCardProps } from '../work/WorkCard';
import { Stack } from '@/components/layout/Stack';
import { Grid, GridItem } from '@/components/layout/Grid';
import { selectedWorkSectionInfo } from '@/data/staticData';

interface SelectedWorkProps {
  cards: Omit<WorkCardProps, 'animateFrom'>[];
}

export default function SelectedWork({ cards }: SelectedWorkProps) {
  return (
    <Stack direction="vertical" gap={{ base: 8, md: 12 }}>
      <SectionHeader
        title={selectedWorkSectionInfo.title}
        subTitle={selectedWorkSectionInfo.subTitle}
        ctaLink={selectedWorkSectionInfo.ctaLink}
      />
      <Grid gap={8} className="grid-cols-1 md:grid-cols-2">
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
