import eventBus from './eventBus';

export const EVENTS = {
    NEWCONNECT : 'newconnect',
    UPDATE_STATUS : 'updatestatus'
}


let nodes = {};

eventBus.on(EVENTS.NEWCONNECT, function (ip) {
    console.log('new node connnected', ip);
    nodes[ip] = {
        ip 
    }
    console.log(nodes);
    
});

eventBus.on(EVENTS.UPDATE_STATUS, function (ip,status) {
    console.log(`new status of ${ip}`, status);
    nodes[ip] = {
        ip,
        status : status 
    }
    console.log(nodes);    
});
