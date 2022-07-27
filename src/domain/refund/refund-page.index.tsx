import { Link } from 'react-router-dom'
import logoSunizeMarketing from '../../domain/auth/assets/images/logoSunizeMarketing.png'
import logoRegister3 from '../../domain/auth/assets/images/logoRegister3.png'
import { useStyles } from './refund-page-style';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export function RefundPage(): JSX.Element {
    const loadingStyles = useStyles();
    return (
        <div className={loadingStyles.root}>
            <img className={loadingStyles.imgLogo} src={logoSunizeMarketing} alt="logoSunizeMarketing" />
            <div style={{ display: 'block' }}>
                <div style={{ marginTop: '30px' }}>
                    <p className={loadingStyles.typography1}>
                        Solicitação de reembolso
                    </p>

                    <p className={loadingStyles.typography2}>
                    Você pode solicitar o seu reembolso de pagamento nesta página, <b>caso a sua compra esteja dentro da garantia disponibilizada pelo vendedor</b>.
                    </p>
                    <p className={loadingStyles.typography2}>
                    Após solicitado o reembolso, o acesso ao produto será imediatamente cancelado e a sua compra será reembolsada em até 7 dias úteis.
                    </p>

                    <div className={loadingStyles.box}>
                        <p className={loadingStyles.typography3}>
                        Insira seu código de compra e o e-mail utilizado na sua compra.
                        </p>
                        <p className={loadingStyles.typography4}>
                        Código de Compra
                        </p>

                        <form>
                            <input className={loadingStyles.textArea}  type="text" placeholder="Insira o seu código de compra recebido via e-mail"></input>
                        <p className={loadingStyles.typography4}>
                        Digite o email que você utilizou na compra
                        </p>
                        <input className={loadingStyles.textArea}  type="text" placeholder="Insira o seu e-mail utilizado na compra"></input>
                        </form>
                        <button className={loadingStyles.buttonNext}>Avançar</button>

                    </div>

                    {/*<Link className={loadingStyles.linkText}
                        to='/dashboard'>
                        Voltar para pagina inicial
                    </Link>*/}
                </div>
            </div>
        </div>
    )
}