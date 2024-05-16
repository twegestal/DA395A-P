import { NavLink } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const NavLinkGroup = ({ toggle }) => {
  const navigate = useNavigate();
  return (
    <>
      <NavLink
        label={'Home'}
        onClick={() => {
          toggle();
          navigate('/');
        }}
      />
      <NavLink
        label={'Quizzes'}
        onClick={() => {
          toggle();
          navigate('/quizzes');
        }}
      />
    </>
  );
};
