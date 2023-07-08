import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface SoberMeetingInterface {
  id?: string;
  meeting_date: any;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface SoberMeetingGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
}
