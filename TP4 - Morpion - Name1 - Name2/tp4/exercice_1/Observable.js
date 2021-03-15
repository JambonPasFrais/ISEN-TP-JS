class Event{
    constructor(event, fonction){
        this.event = event;
        this.fonction = fonction;
    }
}
class Observable{
    constructor(){
        this.tab = new Array();
    }
    on(eventName, callback){
        let event = new Event(eventName, callback);
        this.tab.push(event);
    }
    off(eventName, callback){
        let research = this.tab.findIndex(element => eventName == element.event && callback == element.callback);
        this.tab.shift(research);
    }
    trigger(eventName, ...parameter1){
        let research = this.tab.find(element => eventName == element.event);
        research.fonction(...parameter1);
    }
}
