import { FC } from 'react';
import { GAME_NAME } from 'utils/constants';

const Header: FC = () => {
  return (
    <header className='Header'>
      <h1 className='Header__Title'>{GAME_NAME}</h1>
    </header>
  );
};

export default Header;
