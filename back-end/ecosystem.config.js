module.exports = {
    apps: [
      {
        name: 'back-end',
        cwd: '/app/jwt-storage-tutorial/back-end',
        script: 'node',
        args: 'index.js',
        watch: ['index.js']
      },
    ],
  };