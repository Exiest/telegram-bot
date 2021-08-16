abstract class State {
    stateName: string;
    constructor(name: string) {
        this.stateName = name;
    }
    abstract beginWorking() : string;
}

class OpenedState extends State {
    constructor(name: string) {
        super(name);
    }

    beginWorking() : string {
        return "Ready";
    }
}

class ClosedState extends State {
    constructor(name: string) {
        super(name);
    }

    beginWorking() : string {
        return "Closed";
    }
}

export { State , OpenedState, ClosedState };