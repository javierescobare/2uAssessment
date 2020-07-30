import React, { Component } from 'react';
import InvoiceItem from './InvoiceItem';

class InvoiceList extends Component {
  render() {
    const pending_invoices = this.props.invoices;
    console.log('Invoices', pending_invoices);
    return (
      <div>
        <table className="invoices_table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Vendor Name</th>
              <th>Vendor Address</th>
              <th>Invoice Total</th>
              <th>Invoice Date</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pending_invoices.map((invoice) => (
              <InvoiceItem key={invoice._id} {...invoice} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default InvoiceList;
