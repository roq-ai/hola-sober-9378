import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SosInterface {
  id?: string;
  is_active: boolean;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface SosGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
