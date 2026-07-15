module.exports = {
  apps: [
    {
      name: "api-restaurant",
      script: "./bin/www",
      instances: "max",
      exec_mode: "cluster",

      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      kill_timeout: 4000,

      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      combine_logs: true,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
