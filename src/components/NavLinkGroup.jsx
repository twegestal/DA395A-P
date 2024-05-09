import { NavLink } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const NavLinkGroup = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavLink label={'Home'} onClick={() => navigate('/')} />
      <NavLink label={'Quiz'} onClick={() => navigate('/quiz')} />
      <NavLink label={'History'} onClick={() => navigate('/history')} />
    </>
  );
};
