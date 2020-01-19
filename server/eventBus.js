const eventBus = require('js-event-bus')();

eventBus.on('uncaughtException', function (err) {
    console.error(err);
});

export default eventBus;