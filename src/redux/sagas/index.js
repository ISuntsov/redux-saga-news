import {
  put,
  call,
  takeLatest,
  select,
  delay,
  debounce,
  // retry,
} from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import {
  SET_LATEST_NEWS_ERROR,
  SET_POPULAR_NEWS_ERROR,
  SET_LOADING_DATA,
} from '../constants'
import { setLatestNews, setPopulartNews } from '../actions/actionCreator'
import { getLatestNews, getPopularNews } from '../../api/index'

export function* handleLatestNews() {
  try {
    const { hits } = yield call(getLatestNews, 'react')
    yield put(setLatestNews(hits))
  } catch {
    yield put({
      type: SET_LATEST_NEWS_ERROR,
      payload: 'Ошибка получения последних новостей',
    })
  }
}

export function* handlePopularNews() {
  try {
    const { hits } = yield call(getPopularNews)
    yield put(setPopulartNews(hits))
  } catch {
    yield put({
      type: SET_POPULAR_NEWS_ERROR,
      payload: 'Ошибка получения популярных новостей',
    })
  }
}

export function* watchNewsSaga() {
  yield delay(500)
  console.log('delay !!!')

  yield put({ type: SET_LOADING_DATA, payload: true })

  const path = yield select(({ router }) => router.location.pathname)

  if (path === '/popular-news') {
    yield call(handlePopularNews)
  }
  if (path === '/latest-news') {
    yield call(handleLatestNews)
  }

  yield put({ type: SET_LOADING_DATA, payload: false })
}

// export function* testError() {
//   console.log('test error')
//   throw new Error('tested error')
// }

export default function* rootSaga() {
  yield debounce(5000, LOCATION_CHANGE, () => console.log('debounce!!!'))
  // yield retry(5, 2000, testError)

  yield takeLatest(LOCATION_CHANGE, watchNewsSaga)
}
