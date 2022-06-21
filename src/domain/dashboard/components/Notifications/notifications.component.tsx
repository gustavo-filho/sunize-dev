import { IoMdCloseCircleOutline } from 'react-icons/io'
import { AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useMedia } from '@shared/hooks/useMedia';

import {
    Container,
    BellNotification,
    NotiticationsContainer,
    MessageWithoutNotification,
} from '@domain/dashboard/components/Notifications/notifications.styles'
import { FaRegBell } from 'react-icons/fa';
import NotificationAffiliate from './Components/NotificationAffiliate/notificationAffiliate.component';
import NotificationCoProduction from './Components/NotificationCoProduction/notificationCoProduction.component';

export const Notifications = () => {

    // const { user } = useAuth()
    const mobile = useMedia('(max-width:500px)')
    const [isVisible, setIsVisible] = useState(false)
    const notificationsContainerRef = useRef<HTMLDivElement>(null)
    const [notifications, setNotifications] = useState({} as any)
    const notifyTest = 1
    return (
        <Container
            ref={notificationsContainerRef}
            onClick={() => setIsVisible(!isVisible) }>
            <BellNotification>
                
                {notifyTest >= 1 && (
                     <>
                        <FaRegBell className='shine' />
                        <span>
                        <p>{notifyTest}</p>
                        </span>
                    </>
                )}
                
                {notifyTest < 1 && (
                    <><FaRegBell /></>
                )}
                

            </BellNotification>
            {isVisible && (

                <AnimatePresence>
                    <NotiticationsContainer
                        initial={{ right: '-120%' }}
                        animate={{ right: '2%' }}
                        exit={{ right: '-120%' }}

                    >
                        {/* {mobile && (
                                <button type="button" onClick={() => setIsVisible(false)}>
                                    <IoMdCloseCircleOutline />
                                </button>
                            )} */}
                        {(
                                <button type="button" onClick={() => setIsVisible(false)}>
                                    <div><IoMdCloseCircleOutline size='37px' /></div>
                                </button>
                            )}


                        <h1>Notificações</h1>

                        {
                            notifications.affiliates?.length > 0 &&
                            notifications.affiliates?.map(
                                (
                                    item: {
                                        product_id: number
                                        affiliate_id: number
                                        id: number
                                    },
                                    k: number
                                ) => (
                                    <NotificationAffiliate 
                                        key={k}
                                        product_id={item.product_id}
                                        afilliate_id={item.affiliate_id}
                                        setNotifications={setNotifications}
                                        notifications={notifications}
                                        affiliation_id={item.id}
                                    />
                                ),
                            )
                        }

                        {notifications.coProducion?.length > 0 &&
                        notifications.coProducion?.map((v: any, k: number) => (
                            <NotificationCoProduction
                                key={k}
                                {...v}
                                // reseNotifications={getNotifications}
                                />
                        ))
                        }

                        {/* {notifications.affiliates?.length + */}
                        {/* notifications.coProducion?.length === */}
                        {/* 0 && ( */}
                            <MessageWithoutNotification>
                                <strong>Você não tem nenhuma notificação.</strong>
                            </MessageWithoutNotification>
                         {/* )} */}

                    </NotiticationsContainer>
                </AnimatePresence>

            )

            }

        </Container>
    )
}