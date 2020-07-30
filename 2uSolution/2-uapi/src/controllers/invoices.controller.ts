import {inject} from '@loopback/context';
import {InvoicesServiceBindings, SocketServiceBindings} from '../keys';
import {InvoicesService} from '../services';
import {post, requestBody, get, param, put, HttpErrors} from '@loopback/rest';
import {Invoice, ResponseBase} from '../models';
import {
  InvoiceCreateRequestBody,
  InvoiceUpdateStatusRequestBody,
} from './specs/invoices.specs';

export class InvoicesController {
  constructor(
    @inject(InvoicesServiceBindings.INVOICES_SERVICE)
    protected invoicesService: InvoicesService,
    @inject(SocketServiceBindings.SOCKET_CLIENT)
    protected socket?: SocketIOClient.Socket,
  ) {}

  @get('/Invoice')
  async getInvoices(
    @param.query.boolean('unapproved') filter_unapproved: boolean,
  ) {
    const invoices = await this.invoicesService.getInvoices(filter_unapproved);
    return new ResponseBase({payload: invoices});
  }

  @get('/Invoice/{number}')
  async getInvoiceByNumber(
    @param.path.string('number') invoice_number: string,
  ) {
    const invoice = await this.invoicesService.getInvoiceByNumber(
      invoice_number,
    );
    return new ResponseBase({payload: invoice});
  }

  @post('/Invoice')
  async createInvoice(@requestBody(InvoiceCreateRequestBody) invoice: Invoice) {
    let created_invoice = await this.invoicesService.createInvoice(invoice);
    if (this.socket) this.socket.emit('new_invoice', created_invoice);
    return new ResponseBase({message: 'invoice submitted successfully'});
  }

  @put('/Invoice/{number}')
  async updateInvoiceStatus(
    @param.path.string('number') invoice_number: string,
    @requestBody(InvoiceUpdateStatusRequestBody) invoice: Invoice,
  ) {
    let updated_invoice = await this.invoicesService.updateStatus(
      invoice_number,
      invoice,
    );
    if (!updated_invoice) {
      throw new HttpErrors.NotFound('Invoice not found');
    }
    if (this.socket) this.socket.emit('updated_invoice', updated_invoice);
    return new ResponseBase({message: 'invoice updated successfully'});
  }
}
