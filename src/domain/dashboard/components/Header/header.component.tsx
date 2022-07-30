import { useEffect, useState } from 'react';
import {
  Container,
  UserInfo,
  BoxInfo,
  LogoAndBars,
} from '@domain/dashboard/components/Header/header.styles';
import { Notifications } from '@domain/dashboard/components/Notifications/notifications.component';
import Logo from '@shared/assets/images/LogoLetter.png';
import { useMedia } from '@shared/hooks/useMedia';
import { FaCaretDown, FaHome, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Button } from '@mui/material';
import { ReactComponent as Profile } from '@domain/auth/assets/images/Profile.svg';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { SIGN_OUT, userSelector } from '@domain/auth/user/user.store';
import { useHistory, useLocation } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import {
  sideBarSelector,
  TOGGLE_SIDE_BAR,
} from '@domain/dashboard/components/side-bar/side-bar.store';
import { ASYNC_GET_NOTIFICATIONS } from '@domain/dashboard/components/Notifications/notifications.store';
import { MdDashboard } from 'react-icons/md';
import { shouldShowSideBar } from '@domain/dashboard/products/my-content/my-content.utils';

export const Header = () => {
  const [isOpenBoxInfo, setIsOpenBoxInfo] = useState(false);
  const mobile = useMedia('(max-width: 700px)');
  const user = useAppSelector(userSelector);
  const sidebar = useAppSelector(sideBarSelector);
  const { pathname } = useLocation();

  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ASYNC_GET_NOTIFICATIONS({ userId: user.data.id }));
  }, [dispatch, user.data.id]);

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
            {user.data.photo ? (
              <img src={user.data.photo} alt={user.data.name} />
            ) : (
              <Profile />
            )}

            {!mobile && <p className="userName">{user.data.name}</p>}
          </div>

          {!mobile && <FaCaretDown size={18} />}

          {isOpenBoxInfo && (
            <BoxInfo>
              <ul>
                {user.data.account_type === 'ADMIN' && (
                  <li onClick={() => setIsOpenBoxInfo(false)}>
                    <Button
                      variant="text"
                      onClick={() => history.push('/admin')}
                    >
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
                      history.push('/dashboard/edit-account/person-data')
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
                    onClick={() => history.push('/dashboard/my-content')}
                  >
                    <span>
                      <MdDashboard />
                      Painel do aluno
                    </span>
                  </Button>
                </li>
                <li onClick={() => setIsOpenBoxInfo(false)}>
                  <Button
                    variant="text"
                    onClick={() => history.push('/dashboard')}
                  >
                    <span>
                      <FaHome />
                      Dashboard
                    </span>
                  </Button>
                  </li>
                <li onClick={() => setIsOpenBoxInfo(false)}>
                  <Button
                    variant="text"
                    onClick={() => {
                      dispatch(SIGN_OUT());
                    }}
                  >
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
