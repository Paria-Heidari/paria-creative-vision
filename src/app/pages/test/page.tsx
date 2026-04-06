import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';

export default function TestPage() {
  return (
    <Grid cols="12" gap={4}>
      <Typography variant="caption" as="span">
        Title
      </Typography>
      <Typography variant="h2" as="h2">
        Where code inspires creativity and photography captures emotion. Merging
        the digital and visual worlds to create stories that reflect both
        structure and soul.
      </Typography>
      <Typography variant="h1" as="h1">
        Where code inspires creativity and photography captures emotion. Merging
        the digital and visual worlds to create stories that reflect both
        structure and soul.
      </Typography>
      <Button variant="primary" size="lg">
        Click me
      </Button>
    </Grid>
  );
}
