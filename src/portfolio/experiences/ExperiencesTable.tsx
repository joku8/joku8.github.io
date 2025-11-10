import { Table, Badge, Group } from '@mantine/core';

const experienceData = [
    {
        role: 'Test / Robotics Product Engineer',
        company: 'John Deere',
        date: 'Jul 2024 – Present',
        skills: [
            '⚙️ Automation',
            '🐍 Python',
            '💻 C/C++',
            '🐹 Golang',
            '☁️ AWS',
            '🧪 Databricks',
            '📦 Kubernetes',
            '🤖 Robotics',
            '📊 Data Visualization',
        ],
    },
    {
        role: 'Full Stack Software Engineer Intern/Part-time Student',
        company: 'Cargill',
        date: 'May 2023 – May 2024',
        skills: [
            '📊 Data Analysis/Visualization',
            '⚛️ React/JS',
            '🎨 Material UI',
            '🐍 Python',
        ],
    },
    {
        role: 'Undergraduate Researcher - Dr. Elhan Ersoz',
        company: 'National Center for Supercomputing Applications (UIUC)',
        date: 'Aug 2023 – May 2024',
        skills: [
            '🌾 Digital Agriculture',
            '🧬 Genetics',
            '🧠 Machine Learning',
            '🌱 Crop Breeding',
            '📊 Data Analysis/Visualization',
            '🐍 Python',
        ],
    },
    {
        role: 'Plant Biochemistry Research Intern - Dr. Aleksandra Skirycz',
        company: 'Boyce Thompson Institute',
        date: 'Summer 2022',
        skills: [
            '📊 R (Data Analysis & Visualization)',
            '🧬 Biochemistry',
            '🧫 Enzymology',
            '🧪 Wet Lab Techniques',
            '🦠 Cell Culture'
        ],
    },
    {
        role: 'Chemistry Teaching Assistant (General & Organic)',
        company: 'University of Illinois at Urbana-Champaign',
        date: 'Aug 2021 - May 2024',
        skills: [
            '🧪 Chemistry (General & Organic)',
            '👨‍🏫 Teaching'
        ],
    }
];

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
