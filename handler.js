'use strict';

module.exports.ping = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Pong'
    })
  };

  callback(null, response);
};
