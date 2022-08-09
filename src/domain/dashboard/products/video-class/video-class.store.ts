import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../store/store';

const videoClass = createSlice({
  name: 'VIDEO_CLASS',
  reducers: {
    REPLY_RESPONSE: (
      state,
      action: PayloadAction<{
        id: number;
        comment: 'string';
        author: 'string';
        date: Date;
      }>,
    ) => {
      state.comments = state.comments.map(comment => {
        if (comment.id === action.payload.id) {
          return {
            ...comment,
            responses: [
              ...comment.responses,
              {
                id: action.payload.id,
                comment: action.payload.comment,
                author: action.payload.author,
                date: action.payload.date,
              },
            ],
          };
        }
        return comment;
      });
    },
    CREATE_COMMENT: (
      state,
      action: PayloadAction<{
        id: number;
        comment: 'string';
        author: 'string';
        date: Date;
      }>,
    ) => {
      state.comments = [
        ...state.comments,
        {
          id: action.payload.id,
          comment: action.payload.comment,
          author: action.payload.author,
          date: action.payload.date,
          responses: [],
        },
      ];
    },
  },
  initialState: {
    comments: [
      {
        id: 0,
        comment: 'Comentário tal',
        author: 'Author',
        date: new Date(),
        responses: [] as any,
      },
    ],
    files: [
      { title: 'Arquivo 1', type: 'image', link: '' },
      { title: 'Arquivo 2', type: 'file', link: '' },
      { title: 'Arquivo 3', type: 'image', link: '' },
      { title: 'Arquivo 4', type: 'file', link: '' },
    ],
  },
});

export const videoClassSelector = (state: RootState) => state.videoClass;
export const { REPLY_RESPONSE, CREATE_COMMENT } = videoClass.actions;
export default videoClass.reducer;
