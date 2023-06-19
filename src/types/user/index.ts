type UserId = string | number;
type UserName = string;
interface IUserStatistics {}

export interface IUser {
  id: UserId;
  name: UserName;
  gender?: 'male' | 'female' | 'other';
  statistics?: IUserStatistics;
}
