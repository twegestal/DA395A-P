/* eslint-disable react/prop-types */
import { NavLink } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

export const NavLinkGroup = ({ toggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <NavLink
        label={'Home'}
        onClick={() => {
          toggle();
          navigate('/');
        }}
        active={location.pathname === '/'}
        styles={(theme) => ({
          label: {
            fontSize: theme.fontSizes.md,
          },
        })}
      />
      <NavLink
        label={'Quizzes'}
        onClick={() => {
          toggle();
          navigate('/quizzes');
        }}
        active={location.pathname === '/quizzes'}
        styles={(theme) => ({
          label: {
            fontSize: theme.fontSizes.md,
          },
        })}
      />
      <NavLink
        label={'Stats'}
        onClick={() => {
          toggle();
          navigate('/stats');
        }}
        active={location.pathname === '/stats'}
        styles={(theme) => ({
          label: {
            fontSize: theme.fontSizes.md,
          },
        })}
      />
    </>
  );
};
