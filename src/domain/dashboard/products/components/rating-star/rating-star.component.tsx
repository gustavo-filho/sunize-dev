import { Dispatch, SetStateAction, useCallback } from 'react';
import { Container, Rating } from './rating-star.styles';
interface RatingData {
  productName: string;
  productId: number | string;
  ratingValue: number | null;
}

interface Props {
  ratingData: RatingData;
  setRating: Dispatch<SetStateAction<RatingData | null>>;
}

export const RatingStart = ({ ratingData, setRating }: Props) => {
  const setRatingValue = useCallback(
    async (value: number) => {
      setRating({
        ratingValue: value,
        productId: ratingData.productId,
        productName: ratingData.productName,
      });
    },
    [ratingData.productId, ratingData.productName, setRating],
  );

  return (
    <Container>
      <Rating>
        <input
          type="radio"
          id={`${ratingData.productId}star5`}
          name={`rating${ratingData.productId}`}
          onClick={() => setRatingValue(5)}
        />
        <label
          htmlFor={`${ratingData.productId}star5`}
          className="full"
          title="Awesome"
        ></label>
        <input
          type="radio"
          id={`${ratingData.productId}star4.5`}
          name={`rating${ratingData.productId}`}
          onClick={() => setRatingValue(4.5)}
        />
        <label
          htmlFor={`${ratingData.productId}star4.5`}
          className="half"
        ></label>
        <input
          type="radio"
          id={`${ratingData.productId}star4`}
          name={`rating${ratingData.productId}`}
          onClick={() => setRatingValue(4)}
        />
        <label
          htmlFor={`${ratingData.productId}star4`}
          className="full"
        ></label>
        <input
          type="radio"
          id={`${ratingData.productId}star3.5`}
          name={`rating${ratingData.productId}`}
          onClick={() => setRatingValue(3.5)}
        />
        <label
          htmlFor={`${ratingData.productId}star3.5`}
          className="half"
        ></label>
        <input
          type="radio"
          id={`${ratingData.productId}star3`}
          name={`rating${ratingData.productId}`}
          onClick={() => setRatingValue(3)}
        />
        <label
          htmlFor={`${ratingData.productId}star3`}
          className="full"
        ></label>
        <input
          type="radio"
          id={`${ratingData.productId}star2.5`}
          name={`rating${ratingData.productId}`}
          onClick={() => setRatingValue(2.5)}
        />
        <label
          htmlFor={`${ratingData.productId}star2.5`}
          className="half"
        ></label>
        <input
          type="radio"
          id={`${ratingData.productId}star2`}
          name={`rating${ratingData.productId}`}
          onClick={() => setRatingValue(2)}
        />
        <label
          htmlFor={`${ratingData.productId}star2`}
          className="full"
        ></label>
        <input
          type="radio"
          id={`${ratingData.productId}star1.5`}
          name={`rating${ratingData.productId}`}
          onClick={() => setRatingValue(1.5)}
        />
        <label
          htmlFor={`${ratingData.productId}star1.5`}
          className="half"
        ></label>
        <input
          type="radio"
          id={`${ratingData.productId}star1`}
          name={`rating${ratingData.productId}`}
          onClick={() => setRatingValue(1)}
        />
        <label
          htmlFor={`${ratingData.productId}star1`}
          className="full"
        ></label>
        <input
          type="radio"
          id={`${ratingData.productId}star0.5`}
          name={`rating${ratingData.productId}`}
          onClick={() => setRatingValue(0.5)}
        />
        <label
          htmlFor={`${ratingData.productId}star0.5`}
          className="half"
        ></label>
      </Rating>
    </Container>
  );
};
