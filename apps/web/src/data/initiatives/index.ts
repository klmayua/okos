export interface InitiativeData {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'completed';
}

export const initiativesData: InitiativeData[] = [];
