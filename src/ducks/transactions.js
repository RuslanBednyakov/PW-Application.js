import { appName } from '../config'
import { Record, List } from 'immutable'
import io from "socket.io-client"
import { config } from '../config'
import * as API from '../api'


export const ReducerRecord = Record({
  balance: null,
  error: null,
  loading: false,
  transactions: List([])
})

export const moduleName = 'transactions'
export const BALANCE_CHANGED = `${appName}/${moduleName}/BALANCE_CHANGED`
export const TRANSACTION_COMMITED_TO_USER = `${appName}/${moduleName}/TRANSACTION_COMMITED_TO_USER`
export const COMMIT_TRANSACTION_REQUEST = `${appName}/${moduleName}/COMMIT_TRANSACTION_REQUEST`
export const COMMIT_TRANSACTION_SUCCESS = `${appName}/${moduleName}/COMMIT_TRANSACTION_SUCCESS`
export const COMMIT_TRANSACTION_ERROR = `${appName}/${moduleName}/COMMIT_TRANSACTION_ERROR`
export const GET_BALANCE_REQUEST = `${appName}/${moduleName}/GET_BALANCE_REQUEST`
export const GET_BALANCE_SUCCESS = `${appName}/${moduleName}/GET_BALANCE_SUCCESS`
export const GET_BALANCE_ERROR = `${appName}/${moduleName}/GET_BALANCE_ERROR`
export const GET_TRANSACTION_HISTORY_REQUEST = `${appName}/${moduleName}/GET_TRANSACTION_HISTORY_REQUEST`
export const GET_TRANSACTION_HISTORY_SUCCESS = `${appName}/${moduleName}/GET_TRANSACTION_HISTORY_SUCCESS`
export const GET_TRANSACTION_HISTORY_ERROR = `${appName}/${moduleName}/GET_TRANSACTION_HISTORY_ERROR`

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload, error} = action;

  switch (type) {
    case COMMIT_TRANSACTION_REQUEST:
      return state.set('loading', true);

    case BALANCE_CHANGED:
    case GET_BALANCE_SUCCESS:
      return state.set('balance', payload);

    case TRANSACTION_COMMITED_TO_USER:
    case COMMIT_TRANSACTION_SUCCESS:
      return state
        .set('loading', false)
        .update('transactions', transactions => transactions.push(payload));

    case COMMIT_TRANSACTION_ERROR:
    case GET_BALANCE_ERROR:
      console.log('state error', error)
      return state
        .set('loading', false)
        .set('error', error);

    default:
      return state;
  }
}

export const submitIncomingTransactions = (user) => (dispatch) => {
  const socket = io.connect(config.path.BASE_URL, {
    query: {
      userId:  user.id
    }
  })
  
  socket.on('balanceChanged', (balance) => {
    console.log('balanceChanged', balance);
    dispatch({
      type: BALANCE_CHANGED,
      payload: balance
    })
  });

  socket.on('TransactionCommited', (transaction)=>{
    console.log('TransactionCommited', transaction)
    dispatch({
      type: TRANSACTION_COMMITED_TO_USER,
      payload: transaction
    })
  })
}

export const getBalance = () => (dispatch) => {
  dispatch({
    type: GET_BALANCE_REQUEST,
  })
  API.auth.getBalance()
  .then(data => {
    dispatch({
      type: GET_BALANCE_SUCCESS,
      payload: data
    })
  })
  .catch( err => {
    dispatch({
      type: GET_BALANCE_ERROR,
      error: err
    })
  })
}

export const commitTransaction = (data) => (dispatch) => {
  dispatch({
    type: COMMIT_TRANSACTION_REQUEST,
  })
  API.auth.commitTransaction(data)
  .then(data => {
    dispatch({
      type: COMMIT_TRANSACTION_SUCCESS,
      payload: data
    })
  })
  .catch( err => {
    dispatch({
      type: COMMIT_TRANSACTION_ERROR,
      error: err
    })
  })
}

export const getTransactionsHistory = () => (dispatch) => {
  dispatch({
    type: GET_TRANSACTION_HISTORY_REQUEST,
  })
  API.auth.getTransactionsHistory()
  .then(data => {
    dispatch({
      type: GET_TRANSACTION_HISTORY_SUCCESS,
      payload: data
    })
  })
  .catch( err => {
    dispatch({
      type: GET_TRANSACTION_HISTORY_ERROR,
      error: err
    })
  })
}