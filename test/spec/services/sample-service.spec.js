/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

describe('Service: sampleService', function SampleServiceSuite() {
    var service;

    console.info(module);
    beforeEach(module('app'));
    beforeEach(inject(function($injector) {
        service = $injector.get('sampleService');
    }));

    it('should have an array for things', function thingsArraySpec() {
       expect(service.things instanceof Array).toBe(true);
       expect(service.things.length).toBe(0);
    });

    it('should add a thing to the things array when .addThing is called', function addThingSpec() {
        var things = [{
            name: 'Test',
            count: 3
        }];

        service.addThing(things[0]);

        expect(service.things).toEqual(things);
    })
});