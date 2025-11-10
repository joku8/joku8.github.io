import { Image, Text, Title, Group, ActionIcon } from '@mantine/core';
import { useStyles } from './MyInfo.styles';
import { IconMail, IconBrandLinkedin, IconMapPin } from '@tabler/icons-react';

export function MyInfo() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Joseph Ku</Title>
        {/* <div style={{ height: "0.5rem" }} /> */}
        <Text fw={500} fz="lg" mb={5}>
          Software Developer
        </Text>
                <Group spacing={3}>
          <IconMapPin/>
          <Text fw={100} fz="md" mb={0}>
            Des Moines, IA
          </Text>
        </Group>
        <div style={{ height: "0.5rem" }} />
        <Text fz="sm" c="dimmed">
          Hello! I got my start in crop science and plant biochemistry, but discovered a passion for computer science — and now I build technical solutions that bridge disciplines and solve real-world problems.
        </Text>
        <Group spacing="xs" mb="md">
          <ActionIcon
            component="a"
            href="mailto:josephku825@gmail.com"
            target="_blank"
            size="lg"
            variant="subtle"
            aria-label="Email"
          >
            <IconMail size={20} />
          </ActionIcon>
          <ActionIcon
            component="a"
            href="https://www.linkedin.com/in/joseph-s-ku"
            target="_blank"
            size="lg"
            variant="subtle"
            aria-label="LinkedIn"
          >
            <IconBrandLinkedin size={20} />
          </ActionIcon>
        </Group>
      <Group spacing="md">
        <Image src="/images/uiuc_banner.png" className={classes.image} />
        <Image src="/images/deere_logo.jpg" className={classes.image} />
      </Group>
      </div>
      <Image src="/images/pfp.png" className={classes.image} />
    </div>
  );
}