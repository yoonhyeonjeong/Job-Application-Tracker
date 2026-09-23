import assert from 'node:assert/strict';
import { test } from 'node:test';
import { QueryClient, QueryObserver } from '@tanstack/react-query';
import { invalidateScheduleQueries, invalidateApplicationQueries } from '../services/queryCache.ts';

test('schedule changes invalidate all calendar months and related views, but not another application detail', async () => {
  const client = new QueryClient();
  const affected = [
    ['applicationSchedules', 7], ['schedules', { startDate: '2026-09-01' }],
    ['schedules', { startDate: '2026-10-01' }], ['upcomingSchedules'], ['dashboard'],
  ];
  for (const key of [...affected, ['applicationSchedules', 8], ['applications']]) client.setQueryData(key, []);
  await invalidateScheduleQueries(client, 7);
  for (const key of affected) assert.equal(client.getQueryState(key).isInvalidated, true, JSON.stringify(key));
  assert.equal(client.getQueryState(['applicationSchedules', 8]).isInvalidated, false);
  assert.equal(client.getQueryState(['applications']).isInvalidated, false);
  client.clear();
});

test('active calendar refresh finishes before schedule invalidation resolves', async () => {
  const client = new QueryClient();
  const key = ['schedules', { startDate: '2026-09-01' }];
  client.setQueryData(key, [{ title: 'old' }]);
  let release;
  const response = new Promise(resolve => { release = resolve; });
  const observer = new QueryObserver(client, { queryKey: key, queryFn: () => response, staleTime: Infinity });
  const unsubscribe = observer.subscribe(() => {});
  let finished = false;
  const refresh = invalidateScheduleQueries(client, 7).then(() => { finished = true; });
  await Promise.resolve();
  assert.equal(finished, false);
  release([{ title: 'updated' }]);
  await refresh;
  assert.deepEqual(client.getQueryData(key), [{ title: 'updated' }]);
  unsubscribe();
  client.clear();
});

test('application updates refresh company names in schedules as well as list, detail and summaries', async () => {
  const client = new QueryClient();
  const affected = [['applications'], ['application', 7], ['dashboard'], ['statistics'], ['schedules'], ['upcomingSchedules'], ['applicationSchedules', 7]];
  for (const key of affected) client.setQueryData(key, []);
  await invalidateApplicationQueries(client, 7);
  for (const key of affected) assert.equal(client.getQueryState(key).isInvalidated, true, JSON.stringify(key));
  client.clear();
});

test('opening an inactive calendar after a schedule change fetches the updated data', async () => {
  const client = new QueryClient();
  const key = ['schedules', { startDate: '2026-10-01' }];
  client.setQueryData(key, [{ title: 'old' }]);
  await invalidateScheduleQueries(client, 7);
  const observer = new QueryObserver(client, {
    queryKey: key,
    queryFn: async () => [{ title: 'updated' }],
    staleTime: Infinity,
  });
  const updated = new Promise(resolve => {
    observer.subscribe(result => {
      if (result.data?.[0]?.title === 'updated') resolve();
    });
  });
  try {
    await updated;
    assert.deepEqual(client.getQueryData(key), [{ title: 'updated' }]);
  } finally {
    observer.destroy();
    client.clear();
  }
});

test('a failed refresh keeps the cache stale without turning a successful save into a save failure', async () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const key = ['upcomingSchedules'];
  client.setQueryData(key, [{ title: 'old' }]);
  const observer = new QueryObserver(client, {
    queryKey: key,
    queryFn: async () => { throw new Error('offline'); },
    staleTime: Infinity,
  });
  const unsubscribe = observer.subscribe(() => {});
  try {
    await assert.doesNotReject(invalidateScheduleQueries(client, 7));
    assert.equal(client.getQueryState(key).isInvalidated, true);
    assert.equal(client.getQueryState(key).status, 'error');
    assert.deepEqual(client.getQueryData(key), [{ title: 'old' }]);
  } finally {
    unsubscribe();
    client.clear();
  }
});
