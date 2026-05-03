import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import ReactTest from '@/components/test/ReactTest';
import { Loading } from '@/components/ui/Loading';
import { Typography } from '@/components/ui/Typography';

export default function TestPage() {
  return (
    <Container maxWidth="xl" className="text-center pt-24 md:pt-32">
      <Typography variant="h1" as="h1">
        Title
      </Typography>
      <Loading />
      <Typography variant="h2" as="h2">
        Where code inspires creativity and photography captures emotion. Merging
        the digital and visual worlds to create stories that reflect both
        structure and soul.
      </Typography>
      <Stack direction="vertical" gap={{ base: 4, md: 6 }} className="my-8">
      <ReactTest />

      </Stack>

     
   
    </Container>
  );
}
