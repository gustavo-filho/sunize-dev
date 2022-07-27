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
import { AiFillCheckCircle } from 'react-icons/ai';
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
          <Accordion>
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
