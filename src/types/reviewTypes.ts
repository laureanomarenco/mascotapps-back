export interface IReview {
  id?: undefined;
  transaction_id: string;
  reviewer_id: string;
  comments: string | undefined;
  stars: number;
}
