import {bind, BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {InvoiceRepository} from '../repositories';
import {InvoicesService} from './contracts/invoices.service';
import {Invoice} from '../models';
import {InvoiceStatus} from '../utils/invoice-status';

@bind({scope: BindingScope.TRANSIENT})
export class InvoicesServiceImpl implements InvoicesService {
  constructor(
    @repository(InvoiceRepository)
    protected invoiceRepository: InvoiceRepository,
  ) {}

  async getInvoices(filter_unapproved: boolean = false): Promise<Invoice[]> {
    let invoices;
    if (filter_unapproved) {
      invoices = await this.invoiceRepository.find({
        where: {status: {neq: InvoiceStatus.Approved}},
      });
    } else {
      invoices = await this.invoiceRepository.find();
    }
    return invoices;
  }

  async getInvoiceByNumber(number: string): Promise<Invoice | null> {
    const invoice = this.invoiceRepository.findOne({
      where: {invoice_number: number},
    });
    return invoice;
  }

  async createInvoice(invoice: Invoice): Promise<Invoice> {
    invoice.status = InvoiceStatus.Pending;
    return await this.invoiceRepository.create(invoice);
  }

  async updateStatus(
    invoice_number: string,
    invoice: Invoice,
  ): Promise<Invoice> {
    return new Promise((resolve, reject) => {
      this.invoiceRepository.dataSource.connector.connect(
        async (err: any, db: any) => {
          var collection = db.collection('Invoice');
          collection.findOneAndUpdate(
            {invoice_number: invoice_number},
            {
              $set: {
                status: invoice.status,
              },
            },
            {returnOriginal: false},
            (er: any, dc: any) => {
              if (er) {
                console.log('Error', er);
                reject(er);
              } else {
                console.log('Updated invoice', dc.value);
                resolve(dc.value);
              }
            },
          );
        },
      );
    });
  }
}
