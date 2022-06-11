import { IoMdNotificationsOutline } from 'react-icons/io'

import {
    Container,
    BellNotification,
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