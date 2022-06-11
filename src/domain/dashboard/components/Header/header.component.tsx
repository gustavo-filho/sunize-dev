import  { useState } from 'react'
import { Container, UserInfo, BoxInfo, LogoAndBars } from '@domain/dashboard/components/Header/header.styles'
import { Notifications } from '@domain/dashboard/components/Notifications/notifications.component';
import Logo from '@shared/assets/images/LogoLetter.png'
import { useMedia } from '@shared/hooks/useMedia';
import { FaCaretDown, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Button } from '@mui/material'
import { ReactComponent as Profile } from '@domain/auth/assets/images/Profile.svg'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { SIGN_OUT, userSelector } from '@domain/auth/user/user.store';
import { useHistory } from 'react-router-dom';


export const Header = () => {
    const [isOpenBoxInfo, setIsOpenBoxInfo] = useState(false)
    const mobile = useMedia('(max-width: 500px)')
    const user = useAppSelector(userSelector)
    const history = useHistory()
    const dispatch = useAppDispatch()

    return(
        <Container>
            <LogoAndBars>
                <img src={Logo} alt="Sunize" />
            </LogoAndBars>

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
                    {user.data.photo ? <img src={user.data.photo} alt={user.data.name} /> : <Profile />}

                    {!mobile && <p className="userName">{user.data.name}</p>}
                </div>

                {!mobile && <FaCaretDown size={18} />}

                {isOpenBoxInfo && (
                    <BoxInfo>
                    <ul>
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
                            console.log('cheguei aqui')
                            dispatch(SIGN_OUT())
                        }
                    }
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
}