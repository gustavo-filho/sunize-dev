import { IPropsEvaluation } from '@domain/dashboard/market/interfaces/iprops-evaluation.type';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';
import { Container, TotalEvaluations } from './evaluation.styles';

export const Evaluation: React.FC<IPropsEvaluation> = ({
  productId,
  withoutNumber,
}) => {
  const { user } = useUser();

  const [evaluation, setEvaluation] = useState(0);

  useEffect(() => {
    api
      .get(`/user/${user?.id}/avaliations/${productId}`, {
        headers: { 'sunize-access-token': user!.access_token },
      })
      .then(response => {
        setEvaluation(response.data.avaliationMedium);
      });
  }, [productId, user]);

  return (
    <Container>
      {evaluation <= 0 ? (
        <>
          <FiStar />
          <FiStar />
          <FiStar />
          <FiStar />
          <FiStar />
        </>
      ) : evaluation <= 0.5 ? (
        <>
          <FaStarHalfAlt />
          <FiStar />
          <FiStar />
          <FiStar />
          <FiStar />
        </>
      ) : evaluation <= 1 ? (
        <>
          <FaStar />
          <FiStar />
          <FiStar />
          <FiStar />
          <FiStar />
        </>
      ) : evaluation <= 1.5 ? (
        <>
          <FaStar />
          <FaStarHalfAlt />
          <FiStar />
          <FiStar />
          <FiStar />
        </>
      ) : evaluation <= 2 ? (
        <>
          <FaStar />
          <FaStar />
          <FiStar />
          <FiStar />
          <FiStar />
        </>
      ) : evaluation <= 2.5 ? (
        <>
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
          <FiStar />
          <FiStar />
        </>
      ) : evaluation <= 3 ? (
        <>
          <FaStar />
          <FaStar />
          <FaStar />
          <FiStar />
          <FiStar />
        </>
      ) : evaluation <= 3.5 ? (
        <>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
          <FiStar />
        </>
      ) : evaluation <= 4 ? (
        <>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FiStar />
        </>
      ) : evaluation <= 4.5 ? (
        <>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </>
      ) : (
        evaluation >= 5 && (
          <>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </>
        )
      )}

      {!withoutNumber && (
        <TotalEvaluations evaluations={evaluation}>
          {evaluation ? `(${evaluation})` : <> &nbsp;Nenhuma avaliação</>}
        </TotalEvaluations>
      )}
    </Container>
  );
};
