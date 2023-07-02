import { Router } from 'express';
import { AuthRouter } from './auth';
import { MessageRouter } from './message';


type RouterData = [
  path: string | null,
  router: Router
]


export const routers: Array<RouterData> = [
  [ '/auth',    new AuthRouter().router    ],
  [ '/messages', new MessageRouter().router ]
]
