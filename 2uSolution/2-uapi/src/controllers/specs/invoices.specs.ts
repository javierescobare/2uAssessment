const InvoiceCreateRequestSchema = {
  type: 'object',
  required: [
    'invoice_number',
    'total',
    'currency',
    'invoice_date',
    'due_date',
    'vendor_name',
    'remittance_address',
  ],
  properties: {
    invoice_number: {type: 'string'},
    total: {type: 'string'},
    currency: {type: 'string'},
    invoice_date: {type: 'string'},
    due_date: {type: 'string'},
    vendor_name: {type: 'string'},
    remittance_address: {type: 'string'},
  },
};

export const InvoiceCreateRequestBody = {
  description: 'Invoice model',
  required: true,
  content: {
    'application/json': {schema: InvoiceCreateRequestSchema},
  },
};

const InvoiceUpdateStatusRequestSchema = {
  type: 'object',
  required: ['status'],
  properties: {
    status: {type: 'string'},
  },
};

export const InvoiceUpdateStatusRequestBody = {
  description: 'Invoice update status model',
  required: true,
  content: {
    'application/json': {schema: InvoiceUpdateStatusRequestSchema},
  },
};
