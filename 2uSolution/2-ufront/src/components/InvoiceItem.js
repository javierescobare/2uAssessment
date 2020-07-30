import React, { Component } from 'react';
import { approveInvoice } from '../services/invoice.service';

class InvoiceItem extends Component {
  render() {
    const invoice = this.props;
    return (
      <tr className="invoice_row">
        <td>{invoice.invoice_number}</td>
        <td>{invoice.vendor_name}</td>
        <td>{invoice.remittance_address}</td>
        <td>
          {invoice.total} {invoice.currency}
        </td>
        <td>{this.formatDate(invoice.invoice_date)}</td>
        <td>{this.formatDate(invoice.due_date)}</td>
        <td>
          <button
            className="approve_btn"
            onClick={() => this.sendApproveInvoice(invoice.invoice_number)}
          >
            Approve
          </button>
        </td>
      </tr>
    );
  }

  formatDate(date) {
    const d = new Date(date);
    return d.toDateString();
  }

  sendApproveInvoice(id) {
    approveInvoice(id);
  }
}

export default InvoiceItem;
