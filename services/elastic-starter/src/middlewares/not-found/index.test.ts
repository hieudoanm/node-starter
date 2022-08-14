import { Request, Response } from 'express';
import { notFoundHandler } from '.';

describe('notFoundHandler', () => {
  const mockResponse = (): Response => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should call status and json', () => {
    const mockedRequest = {} as Request;
    const mockedResponse = mockResponse();
    notFoundHandler(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toBeCalled();
    expect(mockedResponse.json).toBeCalled();
  });
});
