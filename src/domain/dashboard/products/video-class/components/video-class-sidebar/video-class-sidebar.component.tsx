import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Drawer,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks';
import {
  sideBarSelector,
  TOGGLE_SIDE_BAR,
} from '@domain/dashboard/components/side-bar/side-bar.store';
import { useStyles } from './video-class-sidebar.styles';
import { AiOutlineLeft } from 'react-icons/ai';
import { theme } from '@shared/styles/theme.constants';

export const VideoClassSidebar = () => {
  const sidebar = useAppSelector(sideBarSelector);
  const dispatch = useAppDispatch();
  const classes = useStyles();
  return (
    <React.Fragment key={'left'}>
      <Drawer
        open={sidebar.isOpen}
        anchor={'left'}
        onClose={() => {
          dispatch(TOGGLE_SIDE_BAR());
        }}
      >
        <div className={classes.container}>
          <div style={{ margin: '1rem', cursor: 'pointer' }}>
            <AiOutlineLeft
              color={theme.colors.yellow}
              size={40}
              onClick={() => {
                dispatch(TOGGLE_SIDE_BAR());
              }}
            />
          </div>
          <div style={{ width: '100%' }}>
            <p
              style={{
                width: '100%',
                textAlign: 'right',
                paddingRight: '1rem',
              }}
            >
              30%
            </p>
            <div
              style={{
                height: '4px',
                background: 'white',
                width: '100%',
                transition: 'all 0.2s',
                position: 'relative',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  height: '1px',
                  border: `2px solid ${theme.colors.yellow}`,
                  width: '30%',
                  transition: 'all 0.2s',
                  position: 'absolute',
                  zIndex: 1,
                }}
              />
            </div>
          </div>
          <Accordion
            style={{
              width: '100%',
              padding: '0 10px',
              background: theme.colors.darkBlue,
            }}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{
                background: '#122159',
                color: 'white',
                borderRadius: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Módulo 1{' '}
                  <Typography style={{ fontWeight: 300, fontSize: '0.8rem' }}>
                    {' - '} Modulo 1
                  </Typography>
                </Typography>
                <p style={{ padding: '1rem 0', color: '#949494' }}>2 aulas</p>
              </div>
            </AccordionSummary>
            <AccordionDetails
              style={{
                padding: '16px 8px 16px 16px',
                background: theme.colors.darkBlue,
              }}
            >
              <Button
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  color: 'white',
                  textTransform: 'capitalize',
                }}
              >
                <p style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: 'yellow',
                      borderRadius: '999px',
                      marginRight: '10px',
                    }}
                  ></div>
                  Aula 01 - Dê um título{' '}
                </p>
              </Button>

              <Button
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  color: 'white',
                  textTransform: 'capitalize',
                }}
              >
                <p style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: 'yellow',
                      borderRadius: '999px',
                      marginRight: '10px',
                    }}
                  ></div>
                  Aula 02 - Dê um título{' '}
                </p>
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{
              width: '100%',
              padding: '0 10px',
              background: theme.colors.darkBlue,
              marginTop: '1rem',
            }}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{
                background: '#122159',
                color: 'white',
                borderRadius: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Módulo 1{' '}
                  <Typography style={{ fontWeight: 300, fontSize: '0.8rem' }}>
                    {' - '} Modulo 1
                  </Typography>
                </Typography>
                <p style={{ padding: '1rem 0', color: '#949494' }}>0 aulas</p>
              </div>
            </AccordionSummary>
          </Accordion>
        </div>
      </Drawer>
    </React.Fragment>
  );
};
