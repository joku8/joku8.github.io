import { Table, Badge, Group, Title } from '@mantine/core';
import experienceData from './experiences.json';

export function ExperienceTable() {
  const rows = experienceData.map((item, index) => (
    <tr key={index}>
      <td style={{ width: '30%' }}>{item.role}</td>
      <td style={{ width: '23%' }}>{item.company}</td>
      <td style={{ width: '10%' }}>{item.date}</td>
      <td style={{ width: '37%' }}>
        <Group spacing="xs">
          {item.skills.map((skill, i) => (
            <Badge key={i} variant="light" size="sm">
              {skill}
            </Badge>
          ))}
        </Group>
      </td>
    </tr>
  ));

  return (
    <div style={{ overflowX: 'auto', overflowY: 'hidden', maxWidth: '100%' }}>
      <Title order={2} style={{ marginBottom: "1rem" }}>
        Experiences
      </Title>
      <Table highlightOnHover withColumnBorders striped style={{ minWidth: '800px' }}>
        <thead>
          <tr>
            <th style={{ width: '25%' }}>Role</th>
            <th style={{ width: '20%' }}>Company</th>
            <th style={{ width: '15%' }}>Date</th>
            <th style={{ width: '40%' }}>Skills</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}
