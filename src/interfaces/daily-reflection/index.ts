import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface DailyReflectionInterface {
  id?: string;
  reflection_text: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface DailyReflectionGetQueryInterface extends GetQueryInterface {
  id?: string;
  reflection_text?: string;
  organization_id?: string;
}
