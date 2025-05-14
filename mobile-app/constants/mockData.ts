export const dataSource: Array<{
  id: number;
  itemType: string;
  company: string;
  amount: number;
  note: string;
  user: string;
  status: string;
  timeCreate: string;
  timeUpdate: string;
}> = [
  { id: 1, itemType: 'Type1', company: 'CompanyA', amount: 100, note: 'Note1', user: 'user', status: 'Active', timeCreate: '2025-05-13', timeUpdate: '2025-05-13' },
];

export const itemTypeSource: Array<{
  id: number;
  name: string;
  user: string;
  timeCreate: string;
  timeUpdate: string;
}> = [
  { id: 1, name: 'Type1', user: 'admin', timeCreate: '2025-05-13', timeUpdate: '2025-05-13' },
];

export const historySource: Array<{
  id: number;
  action: string;
  content: string;
  user: string;
  timeCreate: string;
  timeUpdate: string;
}> = [
  { id: 1, action: 'Create', content: 'Created item', user: 'admin', timeCreate: '2025-05-13', timeUpdate: '2025-05-13' },
];