import { Image, SimpleGrid, Title } from "@mantine/core";

const imageFolder = "/images/volunteering"; // relative to /public

export const Volunteering = () => {
  const imageList = ["PCMG.png", "GDMBG.jpg", "GDMCB.jpg", "CIOS.png"];

  return (
    <>
      <Title order={2} style={{ marginBottom: "1rem" }}>
        Volunteering
      </Title>
      <SimpleGrid cols={4} spacing="md">
        {imageList.map((img, idx) => (
          <Image
            key={idx}
            src={`${imageFolder}/${img}`}
            alt={`Image ${idx + 1}`}
            height={150}
            fit="contain"
            radius="sm"
            withPlaceholder
          />
        ))}
      </SimpleGrid>
    </>
  );
};
