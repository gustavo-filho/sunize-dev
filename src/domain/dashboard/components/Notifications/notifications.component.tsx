import { IoMdNotificationsOutline } from 'react-icons/io'
import { useMedia } from '@shared/hooks/useMedia';

import {
    Container,
    BellNotification,
    NotiticationsContainer,
    MessageWithoutNotification,
  } from '@domain/dashboard/components/Notifications/notifications.styles'

export const Notifications = () => {
    return(
        <Container>
            <BellNotification>
                <IoMdNotificationsOutline/>
            </BellNotification>
        </Container>
    )
}