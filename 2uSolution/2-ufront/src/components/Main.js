import React, { Component } from 'react';
import InvoiceList from './InvoiceList';
import connectSocket from '../services/socket.service';
import { getInvoices } from '../services/invoice.service';

class Main extends Component {
  state = {
    invoices: [],
  };

  componentDidMount() {
    this.loadInvoices();
  }

  render() {
    return (
      <div>
        <h1 className="invoices_title">Invoices</h1>
        <InvoiceList invoices={this.state.invoices} />
      </div>
    );
  }

  loadInvoices() {
    getInvoices()
      .then(({ data }) => {
        this.setState(() => ({
          invoices: data.payload,
        }));
        connectSocket(this.addNewInvoice, this.removeInvoice);
      })
      .catch((error) => {
        console.error('Error loading invoices', error);
      });
  }

  addNewInvoice = (new_invoice) => {
    this.setState((prevState) => ({
      invoices: [...prevState.invoices, new_invoice],
    }));
  };

  removeInvoice = (removing_invoice) => {
    this.setState((prevState) => ({
      invoices: prevState.invoices.filter((i) => i._id !== removing_invoice._id),
    }));
  };
}

export default Main;
