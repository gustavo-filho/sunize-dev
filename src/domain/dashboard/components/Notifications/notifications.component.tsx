import { AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

import { notificationsSelector } from '@domain/dashboard/components/Notifications/notifications.store';
import {
  BellNotification,
  Container,
  MessageWithoutNotification,
  NotiticationsContainer,
} from '@domain/dashboard/components/Notifications/notifications.styles';
import { FaBell, FaRegBell } from 'react-icons/fa';
import { useAppSelector } from '../../../../store/hooks';
import NotificationAffiliate from './Components/NotificationAffiliate/notificationAffiliate.component';
import NotificationCoProduction from './Components/NotificationCoProduction/notificationCoProduction.component';

export const Notifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const notificationsContainerRef = useRef<HTMLDivElement>(null);
  const notifications = useAppSelector(notificationsSelector);
  const totalOfNotifications =
    notifications?.affiliates?.length ??
    0 + notifications?.coProduction?.length ??
    0;

  return (
    <Container
      ref={notificationsContainerRef}
      onClick={() => setIsVisible(!isVisible)}
    >
      <BellNotification>
        {totalOfNotifications !== 0 && (
          <>
            <FaBell className={'shine'} />
            <span>
              <p>{totalOfNotifications}</p>
            </span>
          </>
        )}

        {totalOfNotifications === 0 && (
          <>
            <FaRegBell />
          </>
        )}
      </BellNotification>
      {isVisible && (
        <AnimatePresence>
          <NotiticationsContainer
            initial={{ right: '-120%' }}
            animate={{ right: '2%' }}
            exit={{ right: '-120%' }}
          >
            {
              <button type="button" onClick={() => setIsVisible(false)}>
                <div>
                  <IoMdCloseCircleOutline size="37px" />
                </div>
              </button>
            }

            <h1>Notificações</h1>

            {notifications.affiliates?.length > 0 &&
              notifications.affiliates?.map(
                (
                  item: {
                    product_id: number;
                    affiliate_id: number;
                    id: number;
                  },
                  k: number,
                ) => (
                  <NotificationAffiliate
                    key={k}
                    product_id={item.product_id}
                    afilliate_id={item.affiliate_id}
                    affiliation_id={item.id}
                  />
                ),
              )}

            {notifications.coProduction?.length > 0 &&
              notifications.coProduction?.map((v: any, k: number) => (
                <NotificationCoProduction key={k} {...v} />
              ))}

            {totalOfNotifications === 0 && (
              <MessageWithoutNotification>
                <strong>Você não tem nenhuma notificação.</strong>
              </MessageWithoutNotification>
            )}
          </NotiticationsContainer>
        </AnimatePresence>
      )}
    </Container>
  );
};
