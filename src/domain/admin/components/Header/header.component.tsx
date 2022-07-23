import { useEffect, useState } from 'react';
import {
  Container,
  UserInfo,
  BoxInfo,
  LogoAndBars,
} from '@domain/admin/components/Header/header.styles';
import { Notifications } from '@domain/admin/components/Notifications/notifications.component';
import Logo from '@shared/assets/images/LogoLetter.png';
import { useMedia } from '@shared/hooks/useMedia';
import { FaCaretDown, FaHome, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Button } from '@mui/material';
import { ReactComponent as Profile } from '@domain/auth/assets/images/Profile.svg';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { SIGN_OUT, userSelector } from '@domain/auth/user/user.store';
import { useHistory } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import {
  sideBarSelector,
  TOGGLE_SIDE_BAR,
} from '@domain/admin/components/side-bar/side-bar.store';
import { ASYNC_GET_NOTIFICATIONS } from '@domain/admin/components/Notifications/notifications.store';

export const Header = () => {
  const [isOpenBoxInfo, setIsOpenBoxInfo] = useState(false);
  const mobile = useMedia('(max-width: 700px)');
  const user = useAppSelector(userSelector);
  const sidebar = useAppSelector(sideBarSelector);
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
        <Hamburger
          color={'#ffffff'}
          toggled={sidebar.isOpen}
          onToggle={() => {
            dispatch(TOGGLE_SIDE_BAR());
          }}
        />


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
