/// <reference path="../../typings/tsd.d.ts" />
'use strict';

import SampleService from 'services/sample-service';

angular
    .module('app', [
        'ngRoute'
    ])
    .service('sampleService', SampleService.Service);