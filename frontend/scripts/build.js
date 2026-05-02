const { spawnSync } = require('child_process');

process.env.CI = 'false';

const command = process.platform === 'win32' ? 'craco.cmd' : 'craco';
const result = spawnSync(command, ['build'], {
  env: process.env,
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status ?? 1);
