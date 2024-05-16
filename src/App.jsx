import { MantineProvider } from '@mantine/core';
import { AppShell, Burger, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import logo from './assets/logo.svg';
import '@mantine/core/styles.css';
import { NavLinkGroup } from './components/NavLinkGroup';
import { HomePage } from './pages/Home.page';
import { QuizzesPage } from './pages/Quizzes.page';
import { QuizPage } from './pages/Quiz.page';
import { ErrorPage } from './pages/Error.page';

export const App = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened] = useDisclosure(true);

  return (
    <BrowserRouter>
      <MantineProvider>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
          }}
          padding='md'
        >
          <AppShell.Header>
            <Group h='100%' px='md'>
              <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom='sm' size='sm' />
              <Link to='/'>
                <Image src={logo} height={'30px'} />
              </Link>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p='md'>
            <NavLinkGroup toggle={toggleMobile} />
          </AppShell.Navbar>
          <AppShell.Main>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/quizzes' element={<QuizzesPage />} />
              <Route path='/quiz/:id' element={<QuizPage />} />
              <Route path='/error' element={<ErrorPage />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
};
