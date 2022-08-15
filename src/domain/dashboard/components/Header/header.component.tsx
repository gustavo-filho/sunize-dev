import { ReactComponent as Profile } from '@domain/auth/assets/images/Profile.svg';
import {
  BoxInfo,
  Container,
  LogoAndBars,
  UserInfo,
} from '@domain/dashboard/components/Header/header.styles';
import { Notifications } from '@domain/dashboard/components/Notifications/notifications.component';
import { ASYNC_GET_NOTIFICATIONS } from '@domain/dashboard/components/Notifications/notifications.store';
import {
  sideBarSelector,
  TOGGLE_SIDE_BAR,
} from '@domain/dashboard/components/side-bar/side-bar.store';
import { shouldShowSideBar } from '@domain/dashboard/products/my-content/my-content.utils';
import { Button } from '@mui/material';
import Logo from '@shared/assets/images/LogoLetter.png';
import { useUser } from '@shared/contexts/user-context/user.context';
import { useMedia } from '@shared/hooks/useMedia';
import Hamburger from 'hamburger-react';
import { useEffect, useState } from 'react';
import { FaCaretDown, FaHome, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

export const Header = () => {
  const [isOpenBoxInfo, setIsOpenBoxInfo] = useState(false);
  const mobile = useMedia('(max-width: 700px)');
  const { user, signOut } = useUser();
  const sidebar = useAppSelector(sideBarSelector);
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ASYNC_GET_NOTIFICATIONS({ userId: user!.id }));
  }, [dispatch, user]);

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        {shouldShowSideBar(pathname) && (
          <Hamburger
            color={'#ffffff'}
            toggled={sidebar.isOpen}
            onToggle={() => {
              dispatch(TOGGLE_SIDE_BAR());
            }}
          />
        )}

        <LogoAndBars>
          <img src={Logo} alt="Sunize" />
        </LogoAndBars>
      </div>

      <UserInfo>
        <Notifications />
        <div
          onClick={() => setIsOpenBoxInfo(!isOpenBoxInfo)}
          className="container-user"
        >
          <div
            onClick={() => mobile && setIsOpenBoxInfo(!isOpenBoxInfo)}
            className="user-flex-box"
          >
            {user?.photo ? (
              <img src={user?.photo} alt={user?.name} />
            ) : (
              <Profile />
            )}

            {!mobile && <p className="userName">{user?.name}</p>}
          </div>

          {!mobile && <FaCaretDown size={18} />}

          {isOpenBoxInfo && (
            <BoxInfo>
              <ul>
                {user?.account_type === 'ADMIN' && (
                  <li onClick={() => setIsOpenBoxInfo(false)}>
                    <Button variant="text" onClick={() => navigate('/admin')}>
                      <span>
                        <FaHome />
                        Admin
                      </span>
                    </Button>
                  </li>
                )}
                <li onClick={() => setIsOpenBoxInfo(false)}>
                  <Button
                    variant="text"
                    onClick={() =>
                      navigate('/dashboard/edit-account/person-data')
                    }
                  >
                    <span>
                      <FaUser />
                      Perfil
                    </span>
                  </Button>
                </li>
                <li onClick={() => setIsOpenBoxInfo(false)}>
                  <Button
                    variant="text"
                    onClick={() => navigate('/dashboard/my-content')}
                  >
                    <span>
                      <MdDashboard />
                      Painel do aluno
                    </span>
                  </Button>
                </li>
                <li onClick={() => setIsOpenBoxInfo(false)}>
                  <Button variant="text" onClick={() => navigate('/dashboard')}>
                    <span>
                      <FaHome />
                      Dashboard
                    </span>
                  </Button>
                </li>
                <li onClick={() => setIsOpenBoxInfo(false)}>
                  <Button variant="text" onClick={signOut}>
                    <span>
                      <FaSignOutAlt />
                      Sair
                    </span>
                  </Button>
                </li>
              </ul>
            </BoxInfo>
          )}
        </div>
      </UserInfo>
    </Container>
  );
};
