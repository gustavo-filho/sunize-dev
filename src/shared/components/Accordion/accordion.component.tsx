import React, { useState, useCallback, useRef, useEffect } from 'react';

// Assets
import { ReactComponent as More } from 'Assets/index/More.svg';
import { ReactComponent as Less } from 'Assets/index/Less.svg';

import { Acordion } from './accordion.styles';

interface AccordionData {
  title: string;
  content: string;
}

export const Accordion: React.FC<AccordionData> = ({ title, content }) => {
  const [active, setActive] = useState(false);
  const contentHeight = useRef<HTMLElement>(null);
  const [heightState, setHeightState] = useState(0);
  useEffect(() => {
    if (contentHeight.current)
      setHeightState(contentHeight.current.scrollHeight);
  }, []);

  const setarActive = useCallback(() => {
    setActive(!active);
  }, [active]);

  return (
    <>
      <Acordion active={Number(active)} heightState={heightState}>
        <dt onClick={setarActive}>
          {active ? <Less /> : <More />}
          &nbsp;&nbsp;
          {title}
        </dt>
        <div className="content">
          <dd ref={contentHeight}>{content}</dd>
        </div>
      </Acordion>
    </>
  );
};
