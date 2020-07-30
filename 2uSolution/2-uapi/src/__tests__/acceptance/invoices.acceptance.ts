import {
  givenEmptyDatabase,
  invoiceRepository as mockInvoiceRepository,
} from '../helpers/database.helper';
import {expect, Client} from '@loopback/testlab';
import {TwoUApiApplication} from '../..';
import {setupApplication} from '../helpers/test-helper';
import {InvoicesController} from '../../controllers';
import {InvoicesServiceImpl} from '../../services';
import {Invoice} from '../../models';

describe('InvoiceController', () => {
  let app: TwoUApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  beforeEach(givenEmptyDatabase);

  it('API returns an HTTP 200 Response code with message', async () => {
    const res = await client
      .post('/Invoice')
      .accept('application/json')
      .send(
        `{
      "invoice_number": "12345",
      "total": "199.99",
      "currency": "USD",
      "invoice_date": "2019-08-17",
      "due_date": "2019-09-17",
      "vendor_name": "Acme Cleaners Inc.",
      "remittance_address": "123 ABC St. Charlotte, NC 28209"
    }`,
      )
      .set('Content-Type', 'application/json')
      .expect(200);

    expect(res.body).to.containEql({
      message: 'invoice submitted successfully',
    });
  });

  it('Store invoice with "status": "pending"', async () => {
    //  Arrange
    const controller = new InvoicesController(
      new InvoicesServiceImpl(mockInvoiceRepository),
    );
    const invoice_number = '54321';

    //  Act
    await controller.createInvoice(
      new Invoice({
        invoice_number: invoice_number,
        total: '199.99',
        currency: 'USD',
        invoice_date: '2019-08-17',
        due_date: '2019-09-17',
        vendor_name: 'Acme Cleaners Inc.',
        remittance_address: '123 ABC St. Charlotte, NC 28209',
      }),
    );

    //  Assert
    let saved_invoice = await mockInvoiceRepository.findOne({
      where: {invoice_number: invoice_number},
    });
    expect(saved_invoice).to.not.null;
    expect(saved_invoice).to.have.property('status', 'pending');
  });
});
