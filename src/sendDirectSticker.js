/*jslint node: true */
"use strict";

var log = require("npmlog");

module.exports = function(mergeWithDefaults, api, ctx) {
  return function sendDirectSticker(sticker_id, nameOrUserId, callback) {
    if(!callback) throw new Error("Callback is required for sendDirectSticker");

    log.warn("Warning - sendDirectSticker and sendDirectMessage are deprecated.");

    if(typeof nameOrUserId === "number") {
      return api.sendSticker(sticker_id, nameOrUserId, callback);
    }

    api.getUserId(nameOrUserId, function(err, data) {
      if(err) return callback(err);

      // TODO: find the actual best entry
      var thread_id = data[0].uid;
      api.sendSticker(sticker_id, thread_id, callback);
    });
  };
};
