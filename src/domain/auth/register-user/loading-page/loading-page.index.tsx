import { Link } from 'react-router-dom'
import logoSunizeMarketing from '../../assets/images/logoSunizeMarketing.png'
import logoRegister3 from '../../assets/images/logoRegister3.png'
import { useStyles } from './loading-page-style';

export function LoadingPage(): JSX.Element {
    const loadingStyles = useStyles();
    return (
        <div className={loadingStyles.root}>
            <img className={loadingStyles.imgLogo} src={logoSunizeMarketing} alt="logoSunizeMarketing" />
            <div style={{ display: 'flex' }}>
                <div style={{ marginTop: '67px' }}>
                    <p className={loadingStyles.typography1}>
                        Seja bem-vindo!
                    </p>

                    <p className={loadingStyles.typography2}>
                        Estamos preparando o seu ambiente...
                    </p>

                    <Link className={loadingStyles.linkText}
                        to='/dashboard'>
                        Voltar para pagina inicial
                    </Link>
                </div>

                <div className={loadingStyles.divImageRight}>
                    <img src={logoRegister3} alt="logoRegister3" />
                </div>
            </div>
        </div>
    )
}