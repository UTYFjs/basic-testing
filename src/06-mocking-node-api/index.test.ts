// Uncomment the code below and write your tests
import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously,
} from '06-mocking-node-api';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
const timeout = 1000;
const interval = 500;
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, interval);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(interval * 2);

    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = './test.txt';
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = './test.txt';
    jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './test.txt';
    const mockContent = '123';
    const promise: Promise<string | Buffer> = new Promise((resolve) =>
      resolve(mockContent),
    );
    jest.spyOn(fsPromises, 'readFile').mockReturnValue(promise);
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const result = await readFileAsynchronously(pathToFile);
    jest.runAllTimersAsync();
    expect(result).toEqual(mockContent);
  });
});
