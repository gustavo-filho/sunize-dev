import {
  Container,
  Main,
  Section,
  CardsWrapper,
  Card,
  ConversionColumn,
  ExperienceThumbColumn,
  ExperienceColumn,
  CardBenefits,
  BenefitsColumn,
  FaqColumn,
  GlobalPageStyle,
} from './landing.styles';
import { Header } from '@domain/landing/components/Header/header.component';
import TaxImage from '@shared/assets/images/tax1.png';
import PriorityImage from '@shared/assets/images/prior.png';
import SecImage from '@shared/assets/images/sec.png';
import ProductImage from '@shared/assets/images/product.png';
import ConversationImage from '@shared/assets/images/conv.png';
import BenefitsImage from '@shared/assets/images/benefits.webp';
import CheckoutImage from '@shared/assets/images/check-out.png';
import CreateProductImage from '@shared/assets/images/create-product-image.png';
import { DefaultButton } from '@shared/components/DefaultButton/default-button.component';
import { GrSend } from 'react-icons/gr';
import { Accordion } from '@shared/components/Accordion/accordion.component';
import { Footer } from '@domain/landing/components/Footer/footer.component';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <Container>
      <GlobalPageStyle />
      <Header />

      <Main>
        <Section>
          <h3>
            Uma plataforma
            <mark>completa para você</mark>
          </h3>
          <CardsWrapper>
            <Card data-scroll="left">
              <img src={TaxImage} alt="Taxa Baixa para Todos" />
              <figcaption>
                <h4>
                  Taxa Baixa
                  <br />
                  para Todos
                </h4>
                <p>Conte com as menores taxas e condições do mercado.</p>
              </figcaption>
            </Card>
            <Card data-scroll="left">
              <img src={PriorityImage} alt="Taxa Baixa para Todos" />
              <figcaption>
                <h4>
                  Você como
                  <br />
                  Prioridade!
                </h4>
                <p>
                  Aqui nos importamos com nossos usuários, nossa prioridade
                  sempre será <strong>você</strong>!
                </p>
              </figcaption>
            </Card>
            <Card data-scroll="left">
              <img src={SecImage} alt="Taxa Baixa para Todos" />
              <figcaption>
                <h4>
                  Máxima
                  <br />
                  Segurança
                </h4>
                <p>
                  Tecnologia de ponta para proteger seus cursos, ebooks e
                  arquivos.
                </p>
              </figcaption>
            </Card>
            <Card data-scroll="left">
              <img src={ConversationImage} alt="Taxa Baixa para Todos" />
              <figcaption>
                <h4>
                  Suporte
                  <br />
                  Exclusivo
                </h4>
                <p>
                  Tenha acesso a uma equipe qualificada pronta para lhe oferecer
                  as melhores soluções.
                </p>
              </figcaption>
            </Card>
          </CardsWrapper>
        </Section>

        <Section columns titleDestach>
          <ConversionColumn data-scroll="left">
            <h3>
              Checkout de <mark>Alta Conversão</mark>
            </h3>

            <p>
              Cansado de plataformas que cai no meio do seu lançamento? Com a
              Sunize você tem a garantia de ter um Checkout de ponta! Contamos
              com uma <strong>infraestrutura exclusiva</strong>, capaz de
              oferecer segurança no processamento dos pagamentos. Tudo isso
              alinhado com segurança, design atrativo e inovação.
            </p>
          </ConversionColumn>

          <ConversionColumn data-scroll="left">
            <img src={CheckoutImage} alt="Checkout de Alta Conversão" />
          </ConversionColumn>
        </Section>

        <Section columns dark>
          <ExperienceThumbColumn data-scroll="left">
            <img
              style={{ maxWidth: '407px' }}
              src={CreateProductImage}
              alt="A melhor experiência visual do mercado"
            />
          </ExperienceThumbColumn>

          <ExperienceColumn data-scroll="left">
            <h3>
              A melhor experiência <mark>visual do mercado.</mark>
            </h3>

            <p>
              Entregue a melhor qualidade e experiência para seus alunos, com a
              sunize você conta com ferramentas e a melhor interface do mercado.
            </p>

            <img
              src={ProductImage}
              alt="A melhor experiência visual do mercado"
            />

            <Link style={{ display: 'contents' }} to="/register">
              <DefaultButton>Criar meu Produto</DefaultButton>
            </Link>
          </ExperienceColumn>
        </Section>

        <Section columns titleDestach orange="first-column">
          <div className="no-padding background-color-full" data-scroll="left">
            <h3 className="benefits-main-title">
              Tudo que você
              <mark>Precisa!</mark>
            </h3>

            <img
              style={{ maxWidth: '550px' }}
              src={BenefitsImage}
              alt="Tudo que você precisa"
            />
          </div>

          <BenefitsColumn>
            <span className="benefits-title" data-scroll="left">
              Todas as ferramentas necessárias para seu negócio crescer{' '}
              <strong>em um só lugar.</strong>
            </span>

            <CardBenefits data-scroll="left">
              <div className="card-benefits-icon">
                <GrSend />
              </div>

              <figcaption>
                <h4>Construa suas páginas em minutos:</h4>

                <p>
                  Acesse modelos prontos e de alta conversão, personalize com
                  imagens e textos de forma prática
                </p>
              </figcaption>
            </CardBenefits>

            <CardBenefits data-scroll="left">
              <div className="card-benefits-icon">
                <GrSend />
              </div>

              <figcaption>
                <h4>Construa suas páginas em minutos:</h4>

                <p>
                  Acesse modelos prontos e de alta conversão, personalize com
                  imagens e textos de forma prática
                </p>
              </figcaption>
            </CardBenefits>

            <CardBenefits data-scroll="left">
              <div className="card-benefits-icon">
                <GrSend />
              </div>

              <figcaption>
                <h4>Construa suas páginas em minutos:</h4>

                <p>
                  Acesse modelos prontos e de alta conversão, personalize com
                  imagens e textos de forma prática
                </p>
              </figcaption>
            </CardBenefits>

            <CardBenefits data-scroll="left">
              <div className="card-benefits-icon">
                <GrSend />
              </div>

              <figcaption>
                <h4>Construa suas páginas em minutos:</h4>

                <p>
                  Acesse modelos prontos e de alta conversão, personalize com
                  imagens e textos de forma prática
                </p>
              </figcaption>
            </CardBenefits>

            <CardBenefits data-scroll="left">
              <div className="card-benefits-icon">
                <GrSend />
              </div>

              <figcaption>
                <h4>Construa suas páginas em minutos:</h4>

                <p>
                  Acesse modelos prontos e de alta conversão, personalize com
                  imagens e textos de forma prática
                </p>
              </figcaption>
            </CardBenefits>

            <span className="benefits-and-more" data-scroll="left">
              E muito +
            </span>
          </BenefitsColumn>
        </Section>

        <Section titleDestach dark>
          <FaqColumn>
            <h3 className="benefits-main-title" data-scroll="left">
              Perguntas <mark>Frequentes</mark>
            </h3>

            <div className="faq-accordion-wrapper">
              <Accordion
                data-scroll="left"
                title="1 - A Sunize tem sistema de afiliados?"
                content="Dentro da plataforma, há uma vitrine para você afiliar-se a qualquer produto digital, desde que seja aprovada pelo produtor de conteúdo."
              />

              <Accordion
                data-scroll="left"
                title="2 - Qual o tempo mínimo e valor mínimo para realizar meus saques?"
                content="Para cartão de crédito, o tempo mínimo para saque é de 30 dias, caso hajam parcelamentos cobramos antecipação de 2% a.m. Para boletos, pix, cartão de débito, apenas 7 dias."
              />

              <Accordion
                data-scroll="left"
                title="3 - Quais os benefícios do checkout da Sunize?"
                content="Em nosso checkout, você possui diversos benefícios, dentre eles: upsell de um clique, contagem regressiva de escassez, mensagem de urgência, estética limpa e direto ao ponto, cupom de desconto, exibição de usuários que adquirem seus produtos, facilidade nos pagamentos, diversas opções de pagamentos (boleto, pix e cartão de crédito ou débito)."
              />

              <Accordion
                data-scroll="left"
                title="4 - Qual é o custo para utilizar a Sunize?"
                content="A Sunize é a plataforma com os maiores custos-benefícios do mercado. Contamos com uma taxa padrão única de 6,99%, sem um centavo a mais (negociável de acordo com seu faturamento e visibilidade) realizada apenas sobre as vendas realizadas pelo produtor, existem taxas baixas de serviço de encargos e tributos para o cliente final. Não cobramos taxas em caso de estorno de pagamentos."
              />

              <Accordion
                data-scroll="left"
                title="5 - A Sunize aceita produtos físicos também?"
                content="Temos planos futuros para aceitarmos produtos físicos. Por enquanto, a Sunize aceita somente infoprodutos, sendo eles eBooks ou cursos online, também temos um sistema de assinaturas, para pagamentos recorrentes."
              />

              <Accordion
                data-scroll="left"
                title="6 - Quais os benefícios para ser membro da Sunize?"
                content="Os benefícios para ser um membro da Sunize são inúmeros: suporte com profissionais especializados, taxas baixíssimas, checkout de alta conversão, área de membros de alta qualidade, afiliações, renda passiva, proteção contra pirataria para seus produtos (eBook e Curso Online), entre diversos outros benefícios para você alavancar seus lucros."
              />

              <Accordion
                data-scroll="left"
                title="7 - A Sunize oferece área de membros?"
                content="A Sunize têm área de membros exclusiva, tanto para cursos online, como para eBooks, também hospedamos e exibimos seus vídeos ou eBooks sem custos adicionais."
              />

              <Accordion
                data-scroll="left"
                title="8 - A Sunize é segura para hospedar meu produto?"
                content="Garantimos toda a sua segurança de seu eBook ou curso online com uma alta tecnologia de ponta. Seus eBooks e cursos online são acessados direto pela plataforma e ficam protegidos. Sem risco de plágio ou fraudes."
              />
            </div>
          </FaqColumn>
        </Section>
      </Main>

      <Footer />
    </Container>
  );
};
