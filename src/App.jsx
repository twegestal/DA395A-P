import { MantineProvider } from '@mantine/core';
import { AppShell, Burger, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './assets/logo.svg';
import '@mantine/core/styles.css';
import { NavLinkGroup } from './components/NavLinkGroup';
import { HomePage } from './pages/Home.page';
import { QuizzesPage } from './pages/Quizzes.page';
import { HistoryPage } from './pages/History.page';
import { QuizPage } from './pages/Quiz.page';
import { useEffect } from 'react';
import { quizRepository } from './repository/QuizRepository';

export const App = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  useEffect(() => {
    console.log(quizRepository.getAllQuizzes());
  });

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
              <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom='sm' size='sm' />
              <Image src={logo} height={'30px'} />
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p='md'>
            <NavLinkGroup />
          </AppShell.Navbar>
          <AppShell.Main>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/quizzes' element={<QuizzesPage />} />
              <Route path='/history' element={<HistoryPage />} />
              <Route path='/quiz/:id' element={<QuizPage />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
};
