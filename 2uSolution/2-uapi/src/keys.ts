import {BindingKey} from '@loopback/context';
import {InvoicesService} from './services';

export namespace InvoicesServiceBindings {
  export const INVOICES_SERVICE = BindingKey.create<InvoicesService>(
    'services.invoices.service',
  );
}

export namespace SocketServiceBindings {
  export const SOCKET_CLIENT = BindingKey.create<SocketIOClient.Socket>(
    'socket.config.client',
  );
}
