import { Table, Title } from '@mantine/core';
import experienceData from '../../data/experiences.json';
import { BadgeGroup } from '../../components/BadgeGroup';

export function ExperienceTable() {
  const rows = experienceData.map((item, index) => (
    <tr key={index}>
      <td style={{ width: '30%' }}>{item.role}</td>
      <td style={{ width: '23%' }}>
        {item.companyLogo ? (
          <img 
            src={item.companyLogo} 
            alt={item.company} 
            style={{ 
              maxHeight: '40px', 
              maxWidth: '120px', 
              objectFit: 'contain',
              display: 'block'
            }} 
          />
        ) : (
          item.company
        )}
      </td>
      <td style={{ width: '10%' }}>{item.date}</td>
      <td style={{ width: '37%' }}>
        <BadgeGroup 
          badges={item.skills.map(skill => ({ emoji: '', label: skill }))} 
          spacing="xs" 
          variant="light" 
        />
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
