import axios from "axios"
import { useDispatch } from "react-redux"

const initialState = {
  loading: false,
  articles: [],
}

const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
const PENDING = 'PENDING';

// QUESTION: why do I not need to import useDispatch?
export const requestArticles = async (dispatch) => {
  dispatch({
    type: PENDING
  });

  let articles = await axios.get('/api/hacker-news').then((res) => res.data);

  dispatch({
    type: REQUEST_ARTICLES,
    payload: articles,
  })
}

export default function hackerNewsReducer(state = initialState, action) {

  switch (action.type) {
    case 'PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'REQUEST_ARTICLES':
      return { // QUESTION: why do I not need to spread 'state'?
        loading: false,
        articles: action.payload,
      }

    default:
      return state
  }
}