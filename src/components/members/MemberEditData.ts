// Sample data for member editing
export const members = [
  {
    id: 1,
    name: 'Takashi Yamada',
    email: 'takashi@example.com',
    phone: '+81 90-1234-5678',
    status: 'active',
    memberSince: '2020-03-15',
    baptized: true,
    baptismDate: '2015-05-20',
    birthDate: '1982-07-12',
    address: 'Shibuya-ku, Tokyo, Japan',
    family: 'Yamada Family',
    photo: 'https://i.pravatar.cc/300?img=33',
    roles: ['financial', 'secretary'],
    familyMembers: [
      { id: 8, name: 'Yuki Yamada', relation: 'spouse', age: 38, photo: 'https://i.pravatar.cc/300?img=32' },
      { id: 9, name: 'Haruto Yamada', relation: 'child', age: 10, photo: 'https://i.pravatar.cc/300?img=11' },
    ],
    allergies: [],
    notes: 'Takashi is a dedicated member who has been helping with finance and administrative tasks.',
  },
  // other members would be here
];

export const availableRoles = [
  { id: 'financial', name: 'Financeiro', description: 'Acesso ao módulo financeiro' },
  { id: 'secretary', name: 'Secretário', description: 'Funções administrativas e de secretaria' },
  { id: 'children_ministry_teacher', name: 'Professor Min. Infantil', description: 'Acesso ao módulo do ministério infantil' },
  { id: 'admin', name: 'Administrador', description: 'Acesso completo ao sistema' },
];

export const commonAllergies = [
  { id: 'peanuts', label: 'Amendoim' },
  { id: 'gluten', label: 'Glúten' },
  { id: 'dairy', label: 'Laticínios' },
  { id: 'eggs', label: 'Ovos' },
  { id: 'seafood', label: 'Frutos do Mar' },
  { id: 'medicine_penicillin', label: 'Penicilina' },
];
