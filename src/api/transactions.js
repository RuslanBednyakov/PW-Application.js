import api from '../sevices/api';

export function commitTransaction (transaction) {
  return api.post('transactions/new', transaction)
    .then((r) => r.data)
    .catch( err => { 
      console.log('api error', err)
      throw err } )
}

export function getTransactionsHistory () {
  return api.get('transactions/history')
    .then((r) => {
      return r.data
    })
    .catch( err => { throw err } )
}

export function getBalance () {
  return api.get('user/balance')
    .then((r) => r.data)
    .catch( err => { throw err } )
}

// export function checkEmail (email) {
//   return api.post('auth/check', email)
// }