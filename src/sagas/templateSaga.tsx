import "regenerator-runtime/runtime";
import { call, put } from 'redux-saga/effects';
import { memberAPI } from '../api/member';
import { TemplateEntity } from '../model/templateEntity';
import { Account } from '../model/account';
import { fetchTemplatesCompletedAction, downloadTemplateCompletedAction, fetchAccountsCompletedAction } from '../components/templates/actions';
import { sendToDummyCompleted } from "../components/accountPicker/actions/send";

// worker Saga: will be fired on LOAD_MEMBERS_REQUESTED actions
export function* fetchTemplate() {
    let templates: Array<TemplateEntity>;
    templates = yield call(memberAPI.fetchTemplatesAsync);
    yield put(fetchTemplatesCompletedAction(templates));
}

export function* downloadTemplate(data) {
    let url = yield call(memberAPI.downloadTemplate, data.payload.templateThumb);
    yield put(downloadTemplateCompletedAction(url.data));
}

export function* sendToDummy(data) {
    let response = yield call(memberAPI.sendToDummy, data.payload.templateThumb, data.payload.currentAccount);
    yield put(sendToDummyCompleted(response));
}

export function* fetchAccounts() {
    const accounts: Account[] = yield call(memberAPI.fetchAccounts);
    yield put(fetchAccountsCompletedAction(accounts))
}