process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'mongodb://127.0.0.1:27017/test';
process.env.GITHUB_USERNAME = 'test-user';
process.env.ADMIN_SECRET = 'test-secret-long-enough';
process.env.GITHUB_PER_PAGE = '100';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { syncRepos, SyncInProgressError } = require('../dist/services/githubSync');

const timestamp = '2026-10-01T12:00:00.000Z';

function repo(overrides = {}) {
  return {
    id: 123,
    name: 'sample',
    full_name: 'test-user/sample',
    html_url: 'https://github.com/test-user/sample',
    description: 'Example',
    homepage: null,
    language: 'TypeScript',
    topics: ['portfolio'],
    stargazers_count: 2,
    forks_count: 1,
    private: false,
    archived: false,
    fork: false,
    license: { spdx_id: 'MIT' },
    created_at: timestamp,
    pushed_at: timestamp,
    updated_at: timestamp,
    ...overrides,
  };
}

function store(overrides = {}) {
  const calls = { upserts: [], unpublish: [], syncs: [] };
  return {
    calls,
    async upsertProject(input) {
      calls.upserts.push(input);
      if (overrides.upsertProject) await overrides.upsertProject(input);
    },
    async unpublishMissing(ids) {
      calls.unpublish.push(ids);
      return overrides.unpublished ?? 0;
    },
    async recordSync(input) {
      calls.syncs.push(input);
      if (overrides.recordSync) await overrides.recordSync(input);
    },
  };
}

test('sincroniza todos os repositórios públicos e não sobrescreve curadoria', async () => {
  const persistence = store({ unpublished: 1 });
  const result = await syncRepos({
    listRepositories: async () => [
      repo({ id: 42, name: 'clcmo' }),
      repo({ id: 43, name: 'fork', fork: true }),
      repo({ id: 44, private: true }),
    ],
    store: persistence,
  });

  assert.deepEqual(result, { synced: 2, unpublished: 1 });
  assert.deepEqual(persistence.calls.unpublish, [['42', '43']]);
  assert.equal(persistence.calls.upserts[0].hidden, true);
  assert.equal(persistence.calls.upserts[0].slug, 'clcmo');
  assert.equal(persistence.calls.upserts[1].fields.isFork, true);
  assert.equal('featured' in persistence.calls.upserts[0], false);
  assert.equal('coverUrl' in persistence.calls.upserts[0].fields, false);
  assert.equal(persistence.calls.syncs[0].status, 'success');
});

test('recusa resposta vazia sem despublicar documentos existentes', async () => {
  const persistence = store();

  await assert.rejects(
    syncRepos({ listRepositories: async () => [], store: persistence }),
    /sincronização cancelada/,
  );
  assert.deepEqual(persistence.calls.unpublish, []);
  assert.equal(persistence.calls.syncs[0].status, 'error');
});

test('não despublica projetos se um upsert falhar e registra o erro', async () => {
  const persistence = store({
    upsertProject: async () => {
      throw new Error('falha simulada');
    },
  });

  await assert.rejects(
    syncRepos({ listRepositories: async () => [repo()], store: persistence }),
    /falha simulada/,
  );
  assert.deepEqual(persistence.calls.unpublish, []);
  assert.deepEqual(persistence.calls.syncs, [
    { reposCount: 0, status: 'error', message: 'falha simulada' },
  ]);
});

test('recusa sincronizações simultâneas e libera o lock ao concluir', async () => {
  let markStarted;
  let release;
  const started = new Promise((resolve) => {
    markStarted = resolve;
  });
  const waiting = new Promise((resolve) => {
    release = resolve;
  });
  const persistence = store();
  const firstSync = syncRepos({
    listRepositories: async () => {
      markStarted();
      await waiting;
      return [repo()];
    },
    store: persistence,
  });

  await started;
  await assert.rejects(
    syncRepos({ listRepositories: async () => [repo()], store: store() }),
    SyncInProgressError,
  );
  release();
  await firstSync;

  const nextSync = await syncRepos({
    listRepositories: async () => [repo({ id: 124 })],
    store: store(),
  });
  assert.equal(nextSync.synced, 1);
});
