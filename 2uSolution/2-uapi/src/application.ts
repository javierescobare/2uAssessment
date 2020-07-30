import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';
import {InvoicesServiceBindings, SocketServiceBindings} from './keys';
import {InvoicesServiceImpl} from './services';
import * as dotenv from 'dotenv';
import {MongoDataSource} from './datasources';
import * as io from 'socket.io-client';

export class TwoUApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  socket: SocketIOClient.Socket;

  constructor(options: ApplicationConfig = {}) {
    super(options);
    dotenv.config();

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    const socket_url = process.env.SOCKET_URL || 'http://localhost:8080';
    console.log('Connecting to socket', socket_url);
    this.socket = io.connect(socket_url);
    this.socket.on('connect', () => {
      console.log('Connected to socket');
    });
    this.bind(SocketServiceBindings.SOCKET_CLIENT).to(this.socket);

    this.setUpBindings();
  }

  private setUpBindings() {
    this.bind('datasources.config.mongo').to({
      name: 'mongo',
      connector: 'mongodb',
      url: process.env.MONGO_URL,
      hostname: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PWD,
      database: process.env.MONGO_DB,
      useNewUrlParser: true,
    });
    this.bind('datasources.mongo').toClass(MongoDataSource);

    this.bind(InvoicesServiceBindings.INVOICES_SERVICE).toClass(
      InvoicesServiceImpl,
    );
  }
}
