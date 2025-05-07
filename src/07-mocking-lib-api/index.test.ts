// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const path = '/get/some';
const mockData = {
  name: 'Alex',
  age: 33,
};
jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateMock = jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    } as unknown as AxiosInstance);
    await throttledGetDataFromApi(path);
    expect(axios.create).toHaveBeenCalledWith({ baseURL: baseURL });
    axiosCreateMock.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    const axiosCreateMock = jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    } as unknown as AxiosInstance);
    await throttledGetDataFromApi(path);
    jest.runAllTimers();
    const axiosInstance = axios.create({ baseURL: baseURL });
    expect(axiosInstance.get).toHaveBeenCalledWith(path);
    axiosCreateMock.mockRestore();
  });

  test('should return response data', async () => {
    const axiosCreateMock = jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    } as unknown as AxiosInstance);
    const result = await throttledGetDataFromApi(path);
    jest.runAllTimers();
    expect(result).toEqual(mockData);
    axiosCreateMock.mockRestore();
  });
});
