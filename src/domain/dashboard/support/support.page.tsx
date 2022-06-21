import { useCallback, useState } from "react";
import { CopyrightFooter } from "../components/copyright-footer/copyright-footer.component";
import { AccordionQuestion } from "./AccordionQuestion/accordionQuestion.component";
import { Container, Contact, AccordionWrapper } from "./support.styles";


export const Support = (): JSX.Element => {
    const sunizeEmail: string = 'suporte@sunize.com.br';
    const sunizeTelefone: string = '+55 (11) 96268-0847'
    const [textTransfer, setTextTransfer] = useState(
        'Copiar para área de transferência',
    )
    const handleCopyToClipboard = useCallback((): void => {
        setTextTransfer('Copiado!')
        navigator.clipboard.writeText(sunizeEmail)
        setTimeout(() => {
            setTextTransfer('Copiar para área de transferência')
        }, 3000)
    }, [])

    return (
        <>
            <Container>

                <h2>Suporte</h2>
                <p>Faça contato com o nosso suporte e tire todas as suas dúvidas.</p>

                <Contact>
                    <strong>Entre em contato por e-mail</strong>
                    <div onClick={handleCopyToClipboard}>
                        <p>{sunizeEmail}</p>
                        <span>
                            <small>{textTransfer}</small>
                        </span>
                    </div>
                </Contact>

                <Contact>
                    <strong>Entre em contato por WhatsApp</strong>

                    <div>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://wa.me/5511962680847?text=Ol%C3%A1%2C+estou+precisando+de+ajuda%21"
                        >
                            <p>{sunizeTelefone}</p>
                        </a>
                    </div>
                </Contact>

                <h2 style={{ marginTop: '3rem' }}>Perguntas Frequentes</h2>
                <AccordionWrapper>
                    <AccordionQuestion
                        title="Não consigo acessar o meu produto1"
                        info=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi earum
                               nulla unde officia, minima suscipit eveniet consequatur totam dicta
                               consequuntur soluta placeat voluptate pariatur accusamus error ipsum a eum adipisci."
                    />
                    <AccordionQuestion
                        title="Não consigo acessar o meu produto2"
                        info=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi earum
                               nulla unde officia, minima suscipit eveniet consequatur totam dicta
                               consequuntur soluta placeat voluptate pariatur accusamus error ipsum a eum adipisci."
                    />
                    <AccordionQuestion
                        title="Não consigo acessar o meu produto3"
                        info=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi earum
                               nulla unde officia, minima suscipit eveniet consequatur totam dicta
                               consequuntur soluta placeat voluptate pariatur accusamus error ipsum a eum adipisci."
                    />
                    <AccordionQuestion
                        title="Não consigo acessar o meu produto4"
                        info=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi earum
                               nulla unde officia, minima suscipit eveniet consequatur totam dicta
                               consequuntur soluta placeat voluptate pariatur accusamus error ipsum a eum adipisci."
                    />

                    <AccordionQuestion
                        title="Não consigo acessar o meu produto5"
                        info=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi earum
                               nulla unde officia, minima suscipit eveniet consequatur totam dicta
                               consequuntur soluta placeat voluptate pariatur accusamus error ipsum a eum adipisci."
                    />
                    <AccordionQuestion
                        title="Não consigo acessar o meu produto6"
                        info=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi earum
                               nulla unde officia, minima suscipit eveniet consequatur totam dicta
                               consequuntur soluta placeat voluptate pariatur accusamus error ipsum a eum adipisci."
                    />
                    <AccordionQuestion
                        title="Não consigo acessar o meu produto7"
                        info=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi earum
                               nulla unde officia, minima suscipit eveniet consequatur totam dicta
                               consequuntur soluta placeat voluptate pariatur accusamus error ipsum a eum adipisci."
                    />
                    <AccordionQuestion
                        title="Não consigo acessar o meu produto8"
                        info=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi earum
                               nulla unde officia, minima suscipit eveniet consequatur totam dicta
                               consequuntur soluta placeat voluptate pariatur accusamus error ipsum a eum adipisci."
                    />
                </AccordionWrapper>


                <CopyrightFooter limitWidth={1030} />
            </Container>
        </>
    );
};
