import {Invoice} from '../../models';

export interface InvoicesService {
  createInvoice(invoice: Invoice): Promise<Invoice>;
  updateStatus(invoice_number: string, invoice: Invoice): Promise<Invoice>;
  getInvoices(filter_unapproved: boolean): Promise<Invoice[]>;
  getInvoiceByNumber(number: string): Promise<Invoice | null>;
}
