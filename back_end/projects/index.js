const express = require('./config/express');
const { logger } = require('./config/winston');

const port = 3000;
const serverURL = 'http://34.64.116.143'; // 서버URL

express().listen(port);

logger.info(`${process.env.NODE_ENV} - API Server Start At ${serverURL}:${port}`);
