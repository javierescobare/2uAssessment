import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getInvoices() {
  console.log('Getting invoices', api.baseURL);

  return api.get('/Invoice?unapproved=true');
}

export function approveInvoice(id) {
  console.log('Approving invoice', id);
  api
    .put(`/Invoice/${id}`, { status: 'approved' })
    .then(({ data }) => {
      console.log('Approve invoice response', data);
    })
    .catch((error) => {
      console.error('Error approving invoice', error);
    });
}
