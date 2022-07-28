import { useState } from 'react'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import { BiEnvelope, BiUser } from 'react-icons/bi'
import { MdOutlineContactMail } from 'react-icons/md'
import { BsTelephone } from 'react-icons/bs'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'
import { schema } from './register-user-schema'
import { KeyIcon, FormContainer } from './register-user-styles'
import { api } from '@shared/services/api'
import { WrapperAuth } from './wrapper/wrapper-component.index'
import { InputComponent } from './component/input-component/input-component'
import { ButtonComponent } from './component/button-component/button-component.index'
import { DefaultInput } from '@shared/components/DefaultInput/default-input.component'

export function RegisterComponent(): JSX.Element {
    const [document, setDocument] = useState('')
    const history = useHistory();
    const chooseMaskDocument = (documentLength: number) => {
        if (documentLength < 15) return '999.999.999-99?'
        return '99.999.999/9999-99'
    }

    async function handleSubmit(values: any): Promise<void> {
        try {
            await api.post('auth/sign-up', {
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: values.password,
                cpf: values.cpf
            })
            toast.success('Conta cadastrada com sucesso, favor realizar o login!')
            history.push('/login')
        } catch (error) {
            toast.error('Aconteceu um problema na hora de cadastar o usuário, favor tente novamente ou entre em contato com o suporte!')
        }
    }

    return (
        <WrapperAuth
            title="Registrar"
            subtitle="Já possui uma conta?"
            firstAction={{ label: 'Faça o login aqui', path: '/login' }}
        >
            <Formik
                onSubmit={(data) => handleSubmit(data)}
                validationSchema={schema}
                initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    cpf: '',
                }}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <FormContainer>
                        <InputComponent
                            mode="dark"
                            name="name"
                            text="Nome *"
                            icon={BiUser}
                            placeholder="Digite seu nome"
                        />
                        <InputComponent
                            mode="dark"
                            name="email"
                            text="E-mail *"
                            icon={BiEnvelope}
                            placeholder="Digite seu email"
                        />
                        <InputComponent
                            mode="dark"
                            name="cpf"
                            text="CPF / CNPJ *"
                            maskChar={null}
                            formatChars={{ 9: '[0-9]', '?': '[0-9]' }}
                            mask={chooseMaskDocument(document.length)}
                            icon={MdOutlineContactMail}
                            placeholder="Digite seu CPF / CNPJ"
                            onKeyUp={(value: any) => {
                                setDocument(value?.target?.value)
                            }}
                        />
                        <InputComponent
                            mode="dark"
                            name="phone"
                            text="Telefone *"
                            mask="(99) 99999-9999"
                            icon={BsTelephone}
                            placeholder="Digite seu telefone"
                            onChange={(e) => setFieldValue('phone', e.target.value)}
                        />
                        <InputComponent
                            mode="dark"
                            name="password"
                            text="Senha *"
                            handleShowPassword={true}
                            icon={KeyIcon}
                            placeholder="Digite sua senha"
                            type="password"
                            onChange={(e) => setFieldValue('password', e.target.value)}
                        />

                        <ul className="passRequirement">
                            <li>Mínimo 7 caracteres</li>
                            <li>Um número</li>
                            <li>Uma letra</li>
                        </ul>

                        <input required type="checkbox" name="termos" id="terms" />
                        <label htmlFor="terms">
                            Eu li e concordo com os{' '}
                            <Link to="/termos-de-uso">Termos de Uso</Link>
                            <br />e as{' '}
                            <Link style={{ cursor: 'pointer' }} to="/termos-de-uso">
                                Políticas da Sunize
                            </Link>
                        </label>

                        <ButtonComponent loading={isSubmitting}>
                            Cadastrar-se
                        </ButtonComponent>
                    </FormContainer>
                )}
            </Formik>
        </WrapperAuth>
    )
}
