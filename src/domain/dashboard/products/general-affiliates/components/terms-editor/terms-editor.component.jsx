import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { api } from '@shared/services/api';
import { userSelector } from '@domain/auth/user/user.store';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../../store/hooks';
import { Container } from './terms-editor.styles';
import { toast } from 'react-toastify';

export function TermsEditor() {
  const { id: productId } = useParams();

  const user = useAppSelector(userSelector).data;

  const [terms, setTerms] = useState('');
  const [oldTerms, setOldTerms] = useState('');

  const getTerms = useCallback(async () => {
    const response = await api.get(
      `/users/${user.id}/products/terms/${productId}`,
    );

    setOldTerms(response.data.data);
  }, [productId, user.id]);

  useEffect(() => {
    getTerms();
  }, [getTerms]);

  function handleOnChange(e, editor) {
    setTerms(editor.getData());
  }

  async function submitTerms(event) {
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

  return (
    <>
      <Container>
        <CKEditor
          editor={ClassicEditor}
          className="textEditor"
          onChange={handleOnChange}
          data={oldTerms && oldTerms}
        />
        <button className="button" onClick={submitTerms}>
          Salvar termos
        </button>
      </Container>
    </>
  );
}
