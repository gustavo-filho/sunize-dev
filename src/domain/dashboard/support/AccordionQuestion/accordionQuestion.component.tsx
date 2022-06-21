
import React, { useEffect, useRef, useState } from 'react'
import { Container, Accordion } from './accordionQuestion.styles'
import { AccordionQuestionProps } from './accordionQuestion.types'

export const AccordionQuestion: React.FC<AccordionQuestionProps> = ({ title, info }) => {
    const [accordion, setAccordion] = useState(false)
    const [accordionHeight, setAccordionHeight] = useState(0)
    const accordionRef = useRef<HTMLTableSectionElement>(null)

    useEffect(() => {
        if (accordionRef && accordionRef.current)
            setAccordionHeight(accordionRef.current.scrollHeight)

        window.addEventListener('resize', () => {
            if (accordionRef && accordionRef.current)
                setAccordionHeight(accordionRef.current.scrollHeight)
        })
    }, [])

    return (
        <Container accordion={Number(accordion)}>
            <div
                onClick={() => {
                    if (accordionRef && accordionRef.current)
                        setAccordionHeight(accordionRef.current.scrollHeight)
                    setAccordion(!accordion)
                }}
            >
                <h3>{title}</h3>
            </div>

            <Accordion
                ref={accordionRef}
                accordionHeight={accordionHeight}
                accordion={Number(accordion)}
            >
                <p>
                    {info}
                </p>
            </Accordion>
        </Container>
    )
}