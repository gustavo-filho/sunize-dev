// @ts-nocheck

import { VideoClassSidebar } from '@domain/dashboard/products/video-class/components/video-class-sidebar/video-class-sidebar.component';

import {
  CREATE_COMMENT,
  REPLY_RESPONSE,
  videoClassSelector,
} from '@domain/dashboard/products/video-class/video-class.store';
import { Avatar, Box, Button, TextField } from '@mui/material';
import { useUser } from '@shared/contexts/user-context/user.context';
import { theme } from '@shared/styles/theme.constants';
import React, { useState } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineComment,
  AiOutlineDownload,
  AiOutlineFileImage,
  AiOutlineFilePdf,
  AiOutlineLike,
} from 'react-icons/ai';
import ReactStars from 'react-rating-stars-component';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import Thumbnail from './assets/images/youtube-video-thumbnail.jpeg';
import {
  StyledTab,
  StyledTabs,
  useStyles,
  VideoBackground,
} from './video-class.styles';

export const VideoClass = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const videoClass = useAppSelector(videoClassSelector);
  const { comments, files } = videoClass;
  const dispatch = useAppDispatch();
  const { user } = useUser();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const startConfigs = {
    size: 14,
    count: 5,
    color: 'black',
    activeColor: theme.colors.yellow,
    value: 7.5,
    border: `1px solid red`,
    a11y: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: newValue => {
      console.log('Changed value');
    },
  };

  return (
    <>
      <VideoClassSidebar />

      <div className={classes.container}>
        <div className={classes.videoContainer}>
          <div style={{ width: '100%' }}></div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                display: 'flex',
                borderRadius: '100%',
                justifyContent: 'center',
                fontSize: '24px',
                alignItems: 'center',
                padding: '0.5rem',
                width: '50px',
                height: '50px',
                fontWeight: 'bold',
                color: 'white',
                border: `1px solid ${theme.colors.yellow}`,
                cursor: 'pointer',
              }}
            >
              {'<'}
            </div>
            <VideoBackground />
            <div>
              <div
                style={{
                  width: '1080px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: '0.5rem',
                }}
              >
                <ReactStars {...startConfigs} />
              </div>
              <iframe
                title="Video_aula"
                id="panda-866e8565-0800-4c43-8521-5017ffc7485a"
                src="https://player-vz-31a5504a-9ea.tv.pandavideo.com.br/embed/?v=866e8565-0800-4c43-8521-5017ffc7485a"
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                allowFullScreen={true}
                width="1080"
                height="500"
                style={{
                  maxWidth: '100%',
                  boxShadow: `3px 4px 15px 0px rgba(0,0,0,0.4)`,
                }}
              />
            </div>

            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                display: 'flex',
                borderRadius: '100%',
                justifyContent: 'center',
                fontSize: '24px',
                alignItems: 'center',
                padding: '0.5rem',
                width: '50px',
                height: '50px',
                fontWeight: 'bold',
                color: 'white',
                border: `1px solid ${theme.colors.yellow}`,
                cursor: 'pointer',
              }}
            >
              {'>'}
            </div>
          </div>

          <div
            style={{
              width: '100%',
              maxWidth: '1080px',
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1.5rem',
              flexWrap: 'wrap',
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
              <AiOutlineCheckCircle color={'#adadad'} size={24} />
              Aula Concluída
            </button>
          </div>
        </div>
      </div>
      <div className={classes.nextClassesContainer}>
        <Box sx={{ width: '90%', maxWidth: '1080px' }}>
          <Box>
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="styled tabs example"
            >
              <StyledTab label="Descrição" />
              <StyledTab label="Comentários" />
              <StyledTab label="Materiais" />
            </StyledTabs>
          </Box>
        </Box>
        {value === 0 && (
          <div style={{ width: '90%', margin: '2rem 0', maxWidth: '1080px' }}>
            <p style={{ opacity: 0.7 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur
              adipiscing elit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                Próximas aulas
              </p>
              <div style={{ width: '150px', marginTop: '1rem' }}>
                <img
                  alt={'thumbnail'}
                  style={{ width: '100%' }}
                  src={Thumbnail}
                />
                <p
                  style={{
                    fontSize: '0.9rem',
                    opacity: '0.6',
                    textAlign: 'justify',
                  }}
                >
                  Aula 02 - Apenas um exemplo de aula.
                </p>
              </div>
            </div>
          </div>
        )}
        {value === 2 && (
          <div style={{ width: '90%', marginTop: '1rem', maxWidth: '1080px' }}>
            {files.map((el, i) => {
              return (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom:
                      i === files.length - 1 ? 'none' : '1px solid #eee',
                    padding: '1rem',
                  }}
                >
                  <p style={{ display: 'flex', alignItems: 'center' }}>
                    {el.type === 'image' ? (
                      <AiOutlineFileImage
                        color={'white'}
                        style={{ marginRight: '0.5rem' }}
                      />
                    ) : (
                      <AiOutlineFilePdf
                        color={'white'}
                        style={{ marginRight: '0.5rem' }}
                      />
                    )}
                    {el.title}
                  </p>
                  <Button
                    startIcon={<AiOutlineDownload />}
                    variant={'contained'}
                  >
                    Fazer download
                  </Button>
                </div>
              );
            })}
          </div>
        )}
        {value === 1 && (
          <div
            style={{
              width: '90%',
              maxWidth: '1080px',
              margin: '2rem 1rem',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem 0',
              gap: '1rem',
            }}
          >
            <Box
              component={'form'}
              onSubmit={e => {
                e.preventDefault();
                dispatch(
                  CREATE_COMMENT({
                    author: user.name,
                    comment: e.target[0].value,
                    date: new Date(),
                    id: comments.length,
                  }),
                );
              }}
              style={{
                padding: '1rem 0',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              }}
              sx={{
                '& .MuiFormControl-root': {
                  width: '100%',
                },
                '& .MuiOutlinedInput-root': {
                  color: 'white !important',
                  borderColor: 'white !important',
                },
                '& .MuiInputLabel-root': { color: 'white !important' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(194, 124, 44, 1) !important',
                },
                '& .MuiButton-root': {
                  background: `${theme.colors.yellow} !important`,
                  height: '100% !important',
                },
                '& .MuiInput-underline': {
                  borderBottom: `1px solid ${theme.colors.yellow}`,
                },
                '& .MuiInputLabel-standard': {
                  marginTop: '-5px',
                },
                '& .MuiInputBase-root::after': {
                  borderBottom: `1px solid ${theme.colors.yellow}`,
                },
              }}
            >
              <Avatar />
              <TextField
                id="outlined-multiline-flexible"
                label="Comentário"
                multiline
                variant={'standard'}
                maxRows={4}
              />
              <Button type={'submit'} variant={'contained'}>
                Comentar
              </Button>
            </Box>

            {comments.map(comment => {
              return (
                <>
                  <div
                    style={{
                      width: '100%',
                      marginTop: '1rem',
                      border: '1px solid #666',
                      borderRadius: '5px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      padding: '1rem',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        <Avatar />
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.2rem',
                          }}
                        >
                          <p>{comment.author}</p>
                          <p style={{ color: theme.colors.yellow }}>
                            {comment.comment} - {comment.date.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#666',
                            gap: '0.2rem',
                          }}
                        >
                          5 <AiOutlineLike />
                        </div>{' '}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#666',
                            gap: '0.2rem',
                          }}
                        >
                          10 <AiOutlineComment />
                        </div>
                      </div>
                    </div>
                    <Box
                      component={'form'}
                      onSubmit={e => {
                        e.preventDefault();
                        dispatch(
                          REPLY_RESPONSE({
                            author: user.name,
                            comment: e.target[0].value,
                            date: new Date(),
                            id: comment.id,
                          }),
                        );

                        console.log({ e });
                      }}
                      style={{
                        padding: '1rem 0',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                      }}
                      sx={{
                        '& .MuiFormControl-root': {
                          width: '100%',
                        },
                        '& .MuiOutlinedInput-root': {
                          color: 'white !important',
                          borderColor: 'white !important',
                        },
                        '& .MuiInputLabel-root': { color: 'white !important' },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(194, 124, 44, 1) !important',
                        },
                        '& .MuiButton-root': {
                          background: `${theme.colors.yellow} !important`,
                          height: '100% !important',
                        },
                        '& .MuiInput-underline': {
                          borderBottom: `1px solid ${theme.colors.yellow}`,
                        },
                        '& .MuiInputLabel-standard': {
                          marginTop: '-5px',
                        },
                        '& .MuiInputBase-root::after': {
                          borderBottom: `1px solid ${theme.colors.yellow}`,
                        },
                      }}
                    >
                      <Avatar />
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Responder"
                        multiline
                        variant={'standard'}
                        maxRows={4}
                      />
                      <Button type={'submit'} variant={'contained'}>
                        Responder
                      </Button>
                    </Box>
                    {comment.responses.map(response => {
                      return (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                          }}
                        >
                          <Avatar />
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.2rem',
                            }}
                          >
                            <p>{response.author}</p>
                            <p style={{ color: theme.colors.yellow }}>
                              {response.comment} -{' '}
                              {response.date.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
