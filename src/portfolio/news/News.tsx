import { useState } from 'react';
import { Title, Card, Text, Badge, Group, Stack, Button, Collapse } from '@mantine/core';
import newsData from '../../data/news.json';

export function News() {
  const [expandedVideos, setExpandedVideos] = useState<Record<number, boolean>>({});

  const toggleVideo = (index: number) => {
    setExpandedVideos(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div>
      <Title order={2} style={{ marginBottom: "1rem" }}>
        In the News...
      </Title>
      <Stack spacing="md">
        {newsData.map((item, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
            <Group position="apart" mb="xs">
              <Text weight={500} size="lg">
                {item.urls && item.urls.length > 0 ? (
                  <a href={item.urls[0]} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </Text>
              <Group spacing="xs">
                {item.types.map((type, typeIndex) => (
                  <Badge key={typeIndex} color="blue" variant="light">
                    {type}
                  </Badge>
                ))}
              </Group>
            </Group>

            <Text size="sm" color="dimmed" mb="sm">
              {item.source} • {item.date}
            </Text>

            <Text size="sm" mb="md">
              {item.description}
            </Text>

            {item.embedId && (
              <>
                <Button 
                  variant="light" 
                  size="sm" 
                  onClick={() => toggleVideo(index)}
                  mb="sm"
                >
                  {expandedVideos[index] ? 'Hide Video' : 'Show Video'}
                </Button>
                <Collapse in={expandedVideos[index]}>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%' }}>
                    <iframe
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      src={`https://www.youtube.com/embed/${item.embedId}`}
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </Collapse>
              </>
            )}
          </Card>
        ))}
      </Stack>
    </div>
  );
}
