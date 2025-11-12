import { Image, SimpleGrid, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

const imageFolder = '/images/volunteering'; // relative to /public

export const Volunteering = () => {
  const [imageList, setImageList] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetching image names from a known list
    // In real apps, you'd fetch this from an API or hardcode it
    const images = [
      'PCMG.png',
      'GDMBG.jpg',
      'GDMCB.jpg',
      'CIOS.jpg',
    ];
    setImageList(images);
  }, []);

  return (
    <>
      <Title order={2} style={{ marginBottom: '1rem' }}>
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