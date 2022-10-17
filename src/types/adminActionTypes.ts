export interface IAdminAction {
  id?: number;
  admin_id: string;
  route: string;
  action: string;
  action_status: number;
  error_msg?: string;
  action_msg?: string;
}
