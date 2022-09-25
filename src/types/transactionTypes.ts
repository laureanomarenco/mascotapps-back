export interface ITransaction {
  id?: undefined | string;
  user_offering_id: string;
  user_offering_name: string | undefined;
  user_demanding_id: string;
  user_demanding_name: string | undefined;
  status: string;
  pet_id: string;
  pet_name: string;
  pet_image: string | undefined;
  user_offering_check: string | undefined;
  user_demanding_check: string | undefined;
}
