import { Image, Text, Title, Group, ActionIcon } from '@mantine/core';
import { useStyles } from './MyInfo.styles';
import { IconMail, IconBrandLinkedin, IconMapPin, IconBrandGithub, IconSchool } from '@tabler/icons-react';

export function MyInfo() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>
          Joseph (Joe) Ku
        </Title>
        {/* <div style={{ height: "0.5rem" }} /> */}
        <Text fw={500} fz="lg" mb={5}>
          Software Developer
        </Text>
        <Group spacing={6}>
          <IconMapPin/>
          <Text fw={100} fz="md" mb={0}>
            Des Moines, IA
          </Text>
        </Group>
        <div style={{ height: "0.2rem" }} />
        <Group spacing={6}>
          <IconSchool/>
          <Text fw={100} fz="md" mb={0}>
            University of Illinois at Urbana-Champaign (May 2024)
          </Text>
        </Group>
        <div style={{ height: "0.5rem" }} />
        <Text fz="sm" c="dimmed">
          Hello, I'm Joe! I originally set out to study crop breeding and biochemistry, with a focus on specialty crops. Along the way, I found a passion for computer science and its power to drive innovation in agriculture and beyond. Now I build technical solutions that bridge disciplines and tackle real-world problems.
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
          <ActionIcon
            component="a"
            href="https://github.com/joku8"
            target="_blank"
            size="lg"
            variant="subtle"
            aria-label="Github"
          >
            <IconBrandGithub size={20} />
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