import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Invoice extends Entity {
  @property({
    type: 'string',
    id: true,
    autogenerated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  invoice_number: string;

  @property({
    type: 'string',
    required: true,
  })
  total: string;

  @property({
    type: 'string',
    required: true,
  })
  currency: string;

  @property({
    type: 'date',
    required: true,
    jsonSchema: {
      format: 'date',
    },
  })
  invoice_date: string;

  @property({
    type: 'date',
    required: true,
    jsonSchema: {
      format: 'date',
    },
  })
  due_date: string;

  @property({
    type: 'string',
    required: true,
  })
  vendor_name: string;

  @property({
    type: 'string',
    required: true,
  })
  remittance_address: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
