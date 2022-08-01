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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useStyles } from './video-class-sidebar.styles';
import { AiFillCheckCircle, AiOutlineLeft } from 'react-icons/ai';
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
          <Accordion style={{ width: '100%' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ background: theme.colors.darkBlue, color: 'white' }}
            >
              <Typography>Módulo 1</Typography>
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
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <p>Aula 01</p>
                <AiFillCheckCircle color={theme.colors.success} />
              </Button>
            </AccordionDetails>
          </Accordion>
        </div>
      </Drawer>
    </React.Fragment>
  );
};
