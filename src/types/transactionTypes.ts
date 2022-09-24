export interface ITransaction {
  id: undefined | string;
  user_offering_id: string;
  user_demanding_id: string;
  status: string;
  pet_id: string;
  user_offering_check: string | undefined;
  user_demanding_check: string | undefined;
}
