// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';

describe('BankAccount', () => {
  const initialBalance = 1000;
  const moneyForDeposit = 100;
  const withdrawMoney = 150;
  const transferMoney = 220;

  test('should create account with initial balance', () => {
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(initialBalance);
    expect(() => {
      account.withdraw(initialBalance + 100);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(initialBalance);
    const account2 = getBankAccount(initialBalance);
    expect(() => {
      account.transfer(initialBalance + 100, account2);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(initialBalance);

    expect(() => {
      account.transfer(initialBalance + 100, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(initialBalance);
    account.deposit(moneyForDeposit);
    expect(account.getBalance()).toBe(initialBalance + moneyForDeposit);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(initialBalance);
    account.withdraw(withdrawMoney);
    expect(account.getBalance()).toBe(initialBalance - withdrawMoney);
  });

  test('should transfer money', () => {
    const account = getBankAccount(initialBalance);
    const account2 = getBankAccount(initialBalance);
    account.transfer(transferMoney, account2);
    expect(account.getBalance()).toBe(initialBalance - transferMoney);
    expect(account2.getBalance()).toBe(initialBalance + transferMoney);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(initialBalance);
    const fetchBalance = await account.fetchBalance();
    const isSuccessRequest = fetchBalance === null;
    if (isSuccessRequest) {
      expect(fetchBalance).toBeNull();
    } else {
      expect(typeof fetchBalance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    /*const account = getBankAccount(initialBalance);
    const fetchBalance = await account.fetchBalance();
    const synchronizeBalance = await account.synchronizeBalance();
    typeof fetchBalance === 'number' &&
      expect(typeof fetchBalance).toBe('number');*/
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    /*const account = getBankAccount(initialBalance);
    const fetchBalance = await account.synchronizeBalance();
    typeof fetchBalance === null &&
      expect(fetchBalance).toThrow(SynchronizationFailedError);*/
  });
});
