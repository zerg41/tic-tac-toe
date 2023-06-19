import { FC, PropsWithChildren } from 'react';

const Content: FC<PropsWithChildren> = ({ children }) => {
  return <main className='Content'>{children}</main>;
};

export default Content;
