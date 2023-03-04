enum EGender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

interface IUserStatistics {}

export interface IUser {
  id: React.Key;
  name: string;
  gender?: EGender;
  statistics?: IUserStatistics;
}
