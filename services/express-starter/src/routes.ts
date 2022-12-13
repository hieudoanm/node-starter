/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
  HttpStatusCodeLiteral,
  TsoaResponse,
  fetchMiddlewares,
} from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HealthController } from './modules/health/health.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PortfolioController } from './modules/portfolio/portfolio.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TodosController } from './modules/todos/todos.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HelloController } from './modules/users/users.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { VnindexController } from './modules/vnindex/vnindex.controller';
import { expressAuthentication } from './common/middlewares/guards/authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler } from 'express';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  CapitalPorfolio: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        percentage: { dataType: 'double', required: true },
        updatedDate: { dataType: 'string', required: true },
        market: { dataType: 'string', required: true },
        sector: { dataType: 'string', required: true },
        stockCode: { dataType: 'string', required: true },
        portfolioCode: { dataType: 'string', required: true },
        capital: { dataType: 'string', required: true },
        id: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CapitalAvailableDates: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        availableDate: { dataType: 'string', required: true },
        portfolioCode: { dataType: 'string', required: true },
        capital: { dataType: 'string', required: true },
        id: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  StockHistory: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'CapitalPorfolio' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            percentageChange: { dataType: 'double', required: true },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Todo: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        completed: { dataType: 'boolean' },
        description: { dataType: 'string' },
        title: { dataType: 'string' },
        id: { dataType: 'string' },
        userId: { dataType: 'string' },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        acknowledged: { dataType: 'boolean', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TodoRequestBody: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        description: { dataType: 'string' },
        completed: { dataType: 'boolean' },
        title: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        upsertedCount: { dataType: 'double', required: true },
        modifiedCount: { dataType: 'double', required: true },
        matchedCount: { dataType: 'double', required: true },
        acknowledged: { dataType: 'double', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        deletedCount: { dataType: 'double', required: true },
        acknowledged: { dataType: 'boolean', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  KeyCloakUserInfoResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        email: { dataType: 'string', required: true },
        preferred_username: { dataType: 'string', required: true },
        email_verified: { dataType: 'boolean', required: true },
        sub: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  KeyCloakAddUserResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        requiredActions: {
          dataType: 'array',
          array: { dataType: 'string' },
          required: true,
        },
        lastName: { dataType: 'string', required: true },
        groups: {
          dataType: 'array',
          array: { dataType: 'string' },
          required: true,
        },
        firstName: { dataType: 'string', required: true },
        enabled: { dataType: 'boolean', required: true },
        emailVerified: { dataType: 'boolean', required: true },
        email: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  SignUpRequest: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        password: { dataType: 'string', required: true },
        username: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  KeyCloakTokenResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        scope: { dataType: 'string', required: true },
        session_state: { dataType: 'string', required: true },
        token_type: { dataType: 'string', required: true },
        refresh_token: { dataType: 'string', required: true },
        refresh_expires_in: { dataType: 'double', required: true },
        expires_in: { dataType: 'double', required: true },
        access_token: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  SignInRequest: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        password: { dataType: 'string', required: true },
        username: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.get(
    '/health',
    ...fetchMiddlewares<RequestHandler>(HealthController),
    ...fetchMiddlewares<RequestHandler>(HealthController.prototype.get),

    function HealthController_get(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new HealthController();

        const promise = controller.get.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, 200, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/portfolio/:capital/active-stock-codes',
    ...fetchMiddlewares<RequestHandler>(PortfolioController),
    ...fetchMiddlewares<RequestHandler>(
      PortfolioController.prototype.getActiveStockCodes
    ),

    function PortfolioController_getActiveStockCodes(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        capital: {
          in: 'path',
          name: 'capital',
          required: true,
          dataType: 'string',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new PortfolioController();

        const promise = controller.getActiveStockCodes.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/portfolio/:capital/:portfolioCode',
    ...fetchMiddlewares<RequestHandler>(PortfolioController),
    ...fetchMiddlewares<RequestHandler>(
      PortfolioController.prototype.getPortfolio
    ),

    function PortfolioController_getPortfolio(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        capital: {
          in: 'path',
          name: 'capital',
          required: true,
          dataType: 'string',
        },
        portfolioCode: {
          in: 'path',
          name: 'portfolioCode',
          required: true,
          dataType: 'string',
        },
        updatedDate: {
          in: 'query',
          name: 'updatedDate',
          required: true,
          dataType: 'string',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new PortfolioController();

        const promise = controller.getPortfolio.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/portfolio/:capital/:portfolioCode/available-dates',
    ...fetchMiddlewares<RequestHandler>(PortfolioController),
    ...fetchMiddlewares<RequestHandler>(
      PortfolioController.prototype.getAvailableDates
    ),

    function PortfolioController_getAvailableDates(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        capital: {
          in: 'path',
          name: 'capital',
          required: true,
          dataType: 'string',
        },
        portfolioCode: {
          in: 'path',
          name: 'portfolioCode',
          required: true,
          dataType: 'string',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new PortfolioController();

        const promise = controller.getAvailableDates.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/portfolio/:capital/:portfolioCode/:stockCode',
    ...fetchMiddlewares<RequestHandler>(PortfolioController),
    ...fetchMiddlewares<RequestHandler>(
      PortfolioController.prototype.getStockHistory
    ),

    function PortfolioController_getStockHistory(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        capital: {
          in: 'path',
          name: 'capital',
          required: true,
          dataType: 'string',
        },
        portfolioCode: {
          in: 'path',
          name: 'portfolioCode',
          required: true,
          dataType: 'string',
        },
        stockCode: {
          in: 'path',
          name: 'stockCode',
          required: true,
          dataType: 'string',
        },
        fromDate: {
          default: '',
          in: 'query',
          name: 'fromDate',
          dataType: 'string',
        },
        toDate: {
          default: '',
          in: 'query',
          name: 'toDate',
          dataType: 'string',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new PortfolioController();

        const promise = controller.getStockHistory.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/todos',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(TodosController),
    ...fetchMiddlewares<RequestHandler>(TodosController.prototype.getTodos),

    function TodosController_getTodos(request: any, response: any, next: any) {
      const args = {
        request: {
          in: 'request',
          name: 'request',
          required: true,
          dataType: 'object',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TodosController();

        const promise = controller.getTodos.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 200, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/todos',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(TodosController),
    ...fetchMiddlewares<RequestHandler>(TodosController.prototype.createTodo),

    function TodosController_createTodo(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        request: {
          in: 'request',
          name: 'request',
          required: true,
          dataType: 'object',
        },
        undefined: { in: 'body', required: true, ref: 'TodoRequestBody' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TodosController();

        const promise = controller.createTodo.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 201, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/todos/:id',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(TodosController),
    ...fetchMiddlewares<RequestHandler>(TodosController.prototype.getTodo),

    function TodosController_getTodo(request: any, response: any, next: any) {
      const args = {
        request: {
          in: 'request',
          name: 'request',
          required: true,
          dataType: 'object',
        },
        id: { in: 'path', name: 'id', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TodosController();

        const promise = controller.getTodo.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 200, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    '/todos/:id',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(TodosController),
    ...fetchMiddlewares<RequestHandler>(TodosController.prototype.updateTodo),

    function TodosController_updateTodo(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        request: {
          in: 'request',
          name: 'request',
          required: true,
          dataType: 'object',
        },
        id: { in: 'path', name: 'id', required: true, dataType: 'string' },
        todo: {
          in: 'body',
          name: 'todo',
          required: true,
          ref: 'TodoRequestBody',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TodosController();

        const promise = controller.updateTodo.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 200, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/todos/:id',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(TodosController),
    ...fetchMiddlewares<RequestHandler>(TodosController.prototype.patchTodo),

    function TodosController_patchTodo(request: any, response: any, next: any) {
      const args = {
        request: {
          in: 'request',
          name: 'request',
          required: true,
          dataType: 'object',
        },
        id: { in: 'path', name: 'id', required: true, dataType: 'string' },
        todo: {
          in: 'body',
          name: 'todo',
          required: true,
          ref: 'TodoRequestBody',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TodosController();

        const promise = controller.patchTodo.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 200, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/todos/:id',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(TodosController),
    ...fetchMiddlewares<RequestHandler>(TodosController.prototype.deleteTodo),

    function TodosController_deleteTodo(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        request: {
          in: 'request',
          name: 'request',
          required: true,
          dataType: 'object',
        },
        id: { in: 'path', name: 'id', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TodosController();

        const promise = controller.deleteTodo.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 200, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/users/info',
    ...fetchMiddlewares<RequestHandler>(HelloController),
    ...fetchMiddlewares<RequestHandler>(HelloController.prototype.getUserInfo),

    function HelloController_getUserInfo(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        request: {
          in: 'request',
          name: 'request',
          required: true,
          dataType: 'object',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new HelloController();

        const promise = controller.getUserInfo.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 200, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/users/sign-up',
    ...fetchMiddlewares<RequestHandler>(HelloController),
    ...fetchMiddlewares<RequestHandler>(HelloController.prototype.signUp),

    function HelloController_signUp(request: any, response: any, next: any) {
      const args = {
        undefined: { in: 'body', required: true, ref: 'SignUpRequest' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new HelloController();

        const promise = controller.signUp.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 201, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/users/sign-in',
    ...fetchMiddlewares<RequestHandler>(HelloController),
    ...fetchMiddlewares<RequestHandler>(HelloController.prototype.signIn),

    function HelloController_signIn(request: any, response: any, next: any) {
      const args = {
        undefined: { in: 'body', required: true, ref: 'SignInRequest' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new HelloController();

        const promise = controller.signIn.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 200, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/users/refresh-token',
    ...fetchMiddlewares<RequestHandler>(HelloController),
    ...fetchMiddlewares<RequestHandler>(HelloController.prototype.refreshToken),

    function HelloController_refreshToken(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        request: {
          in: 'request',
          name: 'request',
          required: true,
          dataType: 'object',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new HelloController();

        const promise = controller.refreshToken.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 200, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/users/sign-out',
    ...fetchMiddlewares<RequestHandler>(HelloController),
    ...fetchMiddlewares<RequestHandler>(HelloController.prototype.signOut),

    function HelloController_signOut(request: any, response: any, next: any) {
      const args = {
        request: {
          in: 'request',
          name: 'request',
          required: true,
          dataType: 'object',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new HelloController();

        const promise = controller.signOut.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 204, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    '/users/:id/password',
    ...fetchMiddlewares<RequestHandler>(HelloController),
    ...fetchMiddlewares<RequestHandler>(
      HelloController.prototype.changePassword
    ),

    function HelloController_changePassword(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        id: { in: 'path', name: 'id', required: true, dataType: 'string' },
        undefined: {
          in: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            password: { dataType: 'string', required: true },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new HelloController();

        const promise = controller.changePassword.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 204, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/vnindex/history/:symbol/chart',
    ...fetchMiddlewares<RequestHandler>(VnindexController),
    ...fetchMiddlewares<RequestHandler>(
      VnindexController.prototype.chartifyHistory
    ),

    function VnindexController_chartifyHistory(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        request: {
          in: 'request',
          name: 'request',
          required: true,
          dataType: 'object',
        },
        symbol: {
          in: 'path',
          name: 'symbol',
          required: true,
          dataType: 'string',
        },
        width: { default: 500, in: 'query', name: 'width', dataType: 'double' },
        height: {
          default: 100,
          in: 'query',
          name: 'height',
          dataType: 'double',
        },
        minValue: {
          default: 0,
          in: 'query',
          name: 'minValue',
          dataType: 'double',
        },
        maxValue: {
          default: 200,
          in: 'query',
          name: 'maxValue',
          dataType: 'double',
        },
        strokeColor: {
          default: '#0074d9',
          in: 'query',
          name: 'strokeColor',
          dataType: 'string',
        },
        strokeWidth: {
          default: 2,
          in: 'query',
          name: 'strokeWidth',
          dataType: 'double',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new VnindexController();

        const promise = controller.chartifyHistory.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 200, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return async function runAuthenticationMiddleware(
      request: any,
      _response: any,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      // keep track of failed auth attempts so we can hand back the most
      // recent one.  This behavior was previously existing so preserving it
      // here
      const failedAttempts: any[] = [];
      const pushAndRethrow = (error: any) => {
        failedAttempts.push(error);
        throw error;
      };

      const secMethodOrPromises: Promise<any>[] = [];
      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          const secMethodAndPromises: Promise<any>[] = [];

          for (const name in secMethod) {
            secMethodAndPromises.push(
              expressAuthentication(request, name, secMethod[name]).catch(
                pushAndRethrow
              )
            );
          }

          // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

          secMethodOrPromises.push(
            Promise.all(secMethodAndPromises).then((users) => {
              return users[0];
            })
          );
        } else {
          for (const name in secMethod) {
            secMethodOrPromises.push(
              expressAuthentication(request, name, secMethod[name]).catch(
                pushAndRethrow
              )
            );
          }
        }
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      try {
        request['user'] = await promiseAny(secMethodOrPromises);
        next();
      } catch (err) {
        // Show most recent error as response
        const error = failedAttempts.pop();
        error.status = error.status || 401;
        next(error);
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return (
      'getHeaders' in object && 'getStatus' in object && 'setStatus' in object
    );
  }

  function promiseHandler(
    controllerObj: any,
    promise: any,
    response: any,
    successStatus: any,
    next: any
  ) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode = successStatus;
        let headers;
        if (isController(controllerObj)) {
          headers = controllerObj.getHeaders();
          statusCode = controllerObj.getStatus() || statusCode;
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        returnHandler(response, statusCode, data, headers);
      })
      .catch((error: any) => next(error));
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function returnHandler(
    response: any,
    statusCode?: number,
    data?: any,
    headers: any = {}
  ) {
    if (response.headersSent) {
      return;
    }
    Object.keys(headers).forEach((name: string) => {
      response.set(name, headers[name]);
    });
    if (
      data &&
      typeof data.pipe === 'function' &&
      data.readable &&
      typeof data._read === 'function'
    ) {
      data.pipe(response);
    } else if (data !== null && data !== undefined) {
      response.status(statusCode || 200).json(data);
    } else {
      response.status(statusCode || 204).end();
    }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function responder(
    response: any
  ): TsoaResponse<HttpStatusCodeLiteral, unknown> {
    return function (status, data, headers) {
      returnHandler(response, status, data, headers);
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, request: any, response: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return validationService.ValidateParam(
            args[key],
            request.query[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'path':
          return validationService.ValidateParam(
            args[key],
            request.params[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'header':
          return validationService.ValidateParam(
            args[key],
            request.header(name),
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'body':
          return validationService.ValidateParam(
            args[key],
            request.body,
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'body-prop':
          return validationService.ValidateParam(
            args[key],
            request.body[name],
            name,
            fieldErrors,
            'body.',
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'formData':
          if (args[key].dataType === 'file') {
            return validationService.ValidateParam(
              args[key],
              request.file,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          } else if (
            args[key].dataType === 'array' &&
            args[key].array.dataType === 'file'
          ) {
            return validationService.ValidateParam(
              args[key],
              request.files,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          } else {
            return validationService.ValidateParam(
              args[key],
              request.body[name],
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          }
        case 'res':
          return responder(response);
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, '');
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
