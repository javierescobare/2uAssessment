import {testdb} from '../fixtures/datasources/testdb.datasource';
import {InvoiceRepository} from '../../repositories';
import {Invoice} from '../../models';

export async function givenEmptyDatabase() {
  await invoiceRepository.deleteAll();
}

export const invoiceRepository = new InvoiceRepository(testdb);
