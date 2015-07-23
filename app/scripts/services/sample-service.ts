/// <reference path="../../../typings/tsd.d.ts" />
'use strct';

module SampleService {
    export interface IThing {
        name: String;
        count: Number;
    }

    export interface ISampleService {
        things: Array<IThing>;
        addThing(newThing: IThing): void;
    }

    export class Service implements ISampleService {
        things: Array<IThing>;

        constructor() {
            this.things = [];
        }

        addThing(newThing: IThing): void {
            this.things.push(newThing);
        }
    }
}

export default SampleService;