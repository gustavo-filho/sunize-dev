import { api } from '@shared/services/api';
import { userSelector } from '@domain/auth/user/user.store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../../store/hooks';
import { Container, Sun } from './terms-editor.styles';
import { toast } from 'react-toastify';

import 'suneditor/dist/css/suneditor.min.css';

export function TermsEditor() {
  const editor = useRef();

  const { id: productId } = useParams();

  const user = useAppSelector(userSelector).data;

  const [loading, setLoading] = useState(false);

  const [terms, setTerms] = useState('');
  const [oldTerms, setOldTerms] = useState('');

  const getTerms = useCallback(async () => {
    setLoading(true);

    const response = await api.get(
      `/users/${user.id}/products/terms/${productId}`,
    );

    setOldTerms(response.data.data);

    setLoading(false);
  }, [productId, user.id]);

  useEffect(() => {
    getTerms();
  }, [getTerms]);

  async function submitTerms(event: any) {
    event.preventDefault();

    try {
      await api.post(`/users/${user.id}/products/terms/${productId}`, {
        terms: terms,
      });

      toast.success('Termos de afiliação salvos!');
    } catch {
      toast.error('Erro ao enviar os termos de afiliação');
    }
  }

  function handleChange(content: any) {
    setTerms(content);
  }

  return (
    <>
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <Container>
          <Sun setContents={oldTerms} onChange={handleChange} />

          <button className="button" onClick={submitTerms}>
            Salvar termos
          </button>
        </Container>
      )}
    </>
  );
}
