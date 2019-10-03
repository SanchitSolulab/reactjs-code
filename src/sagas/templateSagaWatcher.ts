import { fork, all, takeLatest } from 'redux-saga/effects';
import { fetchTemplate, downloadTemplate, sendToDummy, fetchAccounts } from './templateSaga';
import { actionTypes } from '../common/constants/actionTypes';

// add here all your watchers
function* watchLoadTemplateRequest() {
  yield takeLatest(actionTypes.FETCH_TEMPLATE_REQUEST_START, fetchTemplate);
}

function* watchDownloadTemplateRequest() {
  yield takeLatest(actionTypes.DOWNLOAD_TEMPLATE, downloadTemplate);
}

function* watchSendToDummyRequest() {
  yield takeLatest(actionTypes.SEND_TO_DUMMY, sendToDummy);
}

function* watchFetchAccountsRequest() {
  yield takeLatest(actionTypes.FETCH_ACCOUNTS_START, fetchAccounts);
}

// Register all your watchers
export default function* root() {
  yield all([
    fork(watchLoadTemplateRequest),
    fork(watchDownloadTemplateRequest),
    fork(watchSendToDummyRequest),
    fork(watchFetchAccountsRequest)
  ])
}
