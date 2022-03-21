import { API } from './common';
import { AuthController } from './auth';
import { ChatController } from './chat';
import { GameController } from './game';
import { FeedController } from './feed';
import { ReportController } from './report';
import { SearchController } from './search';
import { SwipeController } from './swipe';
import { UserController } from './user';

const server = new API({
    middlewares: [],
    controllers: [
        new AuthController(),
        new ChatController(),
        new GameController(),
        new FeedController(),
        new ReportController(),
        new SearchController(),
        new SwipeController(),
        new UserController()
    ],
    onWebsocketConnection: ChatController.onWebsocketConnection
});

server.initialize();
