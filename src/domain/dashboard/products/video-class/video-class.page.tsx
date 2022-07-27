// @ts-nocheck

import { VideoClassSidebar } from '@domain/dashboard/products/video-class/components/video-class-sidebar/video-class-sidebar.component';

import { useStyles } from './video-class.styles';
import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { theme } from '@shared/styles/theme.constants';

export const VideoClass = () => {
  const classes = useStyles();

  return (
    <>
      <VideoClassSidebar />

      <div className={classes.container}>
        <div className={classes.videoContainer}>
          <iframe
            title="Video_aula"
            id="panda-866e8565-0800-4c43-8521-5017ffc7485a"
            src="https://player-vz-31a5504a-9ea.tv.pandavideo.com.br/embed/?v=866e8565-0800-4c43-8521-5017ffc7485a"
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
            allowFullScreen={true}
            width="720"
            height="360"
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1.5rem',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'white',
                }}
              >
                Modulo 01 - Impactando a multidão
              </p>
              <p
                style={{
                  fontSize: '1.5rem',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Criando sua conta de Anúncio
              </p>
            </div>
            <button
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                fontSize: '1.2rem',
                padding: '0 0.5rem ',
                background: 'transparent',
                border: `1.5px solid ${theme.colors.yellow}`,
                borderRadius: '4px',
                color: 'white',
              }}
            >
              <AiFillCheckCircle color={theme.colors.success} />
              Aula Concluída
            </button>
          </div>
        </div>

        <div className={classes.nextClassesContainer}>
          <p>Próximas aulas</p>
        </div>
      </div>
    </>
  );
};
