import { useStyles } from '@domain/dashboard/products/create-package/create-package.styles';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FormGroup } from '@domain/dashboard/products/create-product/create-product.styles';
import { schema } from './create-package.validation';
import { HexColorPicker } from 'react-colorful';
import {
  Dropzone,
  FilesData,
} from '@domain/dashboard/products/components/dropzone/dropzone.component';
import selectImage from '@domain/dashboard/products/assets/images/select-image.png';
import { useState } from 'react';

export const CreatePackage = () => {
  const classes = useStyles();
  const [productImage, setProductImage] = useState<FilesData>({
    uploadedFiles: [],
  });
  const [bannerImage, setBannerImage] = useState<FilesData>({
    uploadedFiles: [],
  });
  const [color, setColor] = useState('#aabbcc');

  const onSubmit = () => {};
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className={classes.titleBox}>
          <h2 className={classes.title}>Informações sobre o pacote</h2>
        </div>
        <div className={classes.mainContent}>
          <Formik
            onSubmit={onSubmit}
            validationSchema={schema}
            validateOnChange
            initialValues={{
              title: '',
              description: '',
              charge_type: 'ONE_TIME',
              currency: 'BRL',
              category: 0,
              price: '',
              subscription_time: 'MENSAL',
            }}
          >
            {({ isValid }) => (
              <Form
                style={{
                  gap: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <FormGroup>
                  <label>Título do seu produto</label>
                  <Field
                    name="title"
                    placeholder="Digite o nome do seu produto"
                  />
                  <p>
                    <ErrorMessage name="title" />
                  </p>
                </FormGroup>
                <FormGroup>
                  <label>Imagem do seu produto</label>
                  <Dropzone
                    title={
                      <p>
                        Arraste para cá <br /> - ou -
                      </p>
                    }
                    errorTitle={
                      'Arquivo não permitido / Arquivos múltiplos não permitidos'
                    }
                    accept="image/jpeg, image/png, image/jpg"
                    sizeKB={5242880}
                    img={selectImage}
                    files={productImage}
                    setFiles={setProductImage}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Banner do seu produto</label>
                  <Dropzone
                    title={
                      <p>
                        Arraste para cá <br /> - ou -
                      </p>
                    }
                    errorTitle={
                      'Arquivo não permitido / Arquivos múltiplos não permitidos'
                    }
                    accept="image/jpeg, image/png, image/jpg"
                    sizeKB={5242880}
                    img={selectImage}
                    files={bannerImage}
                    setFiles={setBannerImage}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Cor de fundo</label>
                  <Field
                    name="color"
                    placeholder="Selecione a cor do seu produto"
                    value={color}
                  />
                  <p>
                    <ErrorMessage name="color" />
                  </p>
                </FormGroup>
                <FormGroup>
                  <HexColorPicker color={color} onChange={setColor} />
                </FormGroup>
                <FormGroup>
                  <button type="submit" disabled={!isValid}>
                    {!isValid ? 'Campos Faltando' : isValid && 'Cadastrar'}
                  </button>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
