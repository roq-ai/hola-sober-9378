import { DailyReflectionInterface } from 'interfaces/daily-reflection';
import { SoberMeetingInterface } from 'interfaces/sober-meeting';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  daily_reflection?: DailyReflectionInterface[];
  sober_meeting?: SoberMeetingInterface[];
  user?: UserInterface;
  _count?: {
    daily_reflection?: number;
    sober_meeting?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
