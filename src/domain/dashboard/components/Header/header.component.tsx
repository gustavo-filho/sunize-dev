import React, { useState, useMemo } from 'react'
import { Container, UserInfo, BoxInfo, LogoAndBars } from '@domain/dashboard/components/Header/header.styles'
import { Notifications } from '@domain/dashboard/components/Notifications/notifications.component';
import Logo from '@shared/assets/images/LogoLetter.png'
import { useMedia } from '@shared/hooks/useMedia';
import { FaCaretDown, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Button } from '@mui/material'
import { ReactComponent as Profile } from '@domain/auth/assets/images/Profile.svg'


export const Header = () => {
    const [isOpenBoxInfo, setIsOpenBoxInfo] = useState(false)
    const mobile = useMedia('(max-width: 500px)')


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
                    {/*photo ? <img src={photo} alt={nameFull} /> : */<Profile />}

                    {!mobile && <p className="userName">{/*nameFull*/} Anisio</p>}
                </div>

                {!mobile && <FaCaretDown size={18} />}

                {isOpenBoxInfo && (
                    <BoxInfo>
                    <ul>
                        <li onClick={() => setIsOpenBoxInfo(false)}>
                        <Button
                            variant="text"
                            /*onClick={() =>
                            history.push('/dashboard/edit-account/person-data')
                            }*/
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
                            //onClick={() => signOut(Number(user.id))}
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