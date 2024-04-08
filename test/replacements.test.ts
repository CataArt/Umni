import { loadReplacements } from '../src/replacements';

// fetchのモックを設定
//global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (fetch as jest.Mock).mockClear();
  (fetch as jest.Mock).mockImplementation(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ /* モックデータ */ }),
  }));

  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('loadReplacements function', () => {
  it('should load replacements from a CSV file', async () => {
    // fetchのモック実装を設定
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('original1,replacement1\noriginal2,replacement2'),
      })
    );

    const expected = new Map([
      ['original1', 'replacement1'],
      ['original2', 'replacement2'],
    ]);
    const replacements = await loadReplacements('path/to/file.csv');

    expect(replacements).toEqual(expected);
  });

  it('should handle fetch failure', async () => {
    // fetchが失敗した場合のモック実装を設定
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found',
      })
    );

    await expect(loadReplacements('path/to/nonexistent/file.csv')).rejects.toThrow('Failed to fetch path/to/nonexistent/file.csv: Not Found');
  });

  it('should ignore malformed lines', async () => {
    // 不正なフォーマットの行を含むCSVファイルのモック実装を設定
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        // カンマが多すぎる行を含む(不正)
        text: () => Promise.resolve('original1,replacement1\nmalformed,line,\noriginal2,replacement2'),
      })
    );

    const expected = new Map([
      ['original1', 'replacement1'],
      ['original2', 'replacement2'],
    ]);
    const replacements = await loadReplacements('path/to/malformed.csv');

    expect(replacements).toEqual(expected);
  });

  it('should log an error when fetch fails', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found',
      })
    );

    await expect(loadReplacements('path/to/nonexistent/file.csv')).rejects.toThrow();

    // console.errorが呼ばれたことを検証
    expect(console.error).toHaveBeenCalledWith(`An error occurred while loading replacements: Error: Failed to fetch path/to/nonexistent/file.csv: Not Found`);
  });

  it('should warn about malformed lines', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        // カンマが多すぎる行を含む(不正)
        text: () => Promise.resolve('original1,replacement1\nmalformed,line,\noriginal2,replacement2'),
      })
    );

    const replacements = await loadReplacements('path/to/malformed.csv');
    expect(replacements).toEqual(new Map([
      ['original1', 'replacement1'],
      ['original2', 'replacement2'],
    ]));

    // console.warnが呼ばれたことを検証
    expect(console.warn).toHaveBeenCalledWith('Ignoring malformed line: malformed,line,');
  });
});
