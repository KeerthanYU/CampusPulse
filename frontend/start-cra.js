// Small launcher to ensure ALLOWED_HOSTS and HOST are set correctly
process.env.ALLOWED_HOSTS = process.env.ALLOWED_HOSTS || 'all';
process.env.HOST = process.env.HOST || 'localhost';
process.env.WDS_SOCKET_HOST = process.env.WDS_SOCKET_HOST || 'localhost';
process.env.WDS_SOCKET_PORT = process.env.WDS_SOCKET_PORT || '0';
require('react-scripts/scripts/start');
