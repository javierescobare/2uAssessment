import {DefaultCrudRepository} from '@loopback/repository';
import {Invoice, InvoiceRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InvoiceRepository extends DefaultCrudRepository<
  Invoice,
  typeof Invoice.prototype.invoice_number,
  InvoiceRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Invoice, dataSource);
  }
}
