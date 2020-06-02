/*
 * Copyright 2020 Uppsala University Library
 *
 * This file is part of Cora.
 *
 *     Cora is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     Cora is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with Cora.  If not, see <http://www.gnu.org/licenses/>.
 */
var CORA = (function (cora) {
    "use strict";
    cora.permissionCalculator = function (dependencies, spec) {


        function indexData(dataRecord) {
            var record = dataRecord;
            if (recordHasIndexLink(record)) {
                indexRecord(record);
            }
        }

        function recordHasIndexLink(record) {
            return record.actionLinks.index !== undefined;
        }

        function indexRecord(record) {
            var indexLink = record.actionLinks.index;
            var callSpec = {
                "url": indexLink.url,
                "requestMethod": indexLink.requestMethod,
                "accept": indexLink.accept,
                "contentType": indexLink.contentType,
                "data": JSON.stringify(indexLink.body),
                "loadMethod": spec.loadMethod,
                "errorMethod": handleCallError,
                "timeoutMethod": spec.timeoutMethod
            };
            dependencies.ajaxCallFactory.factor(callSpec);
        }

        function handleCallError(error) {
            throw new Error("error indexing", error);
        }

        function getDependencies() {
            return dependencies;
        }

        function getSpec() {
            return spec;
        }

        return Object.freeze({
            "type": "indexHandler",
            getDependencies: getDependencies,
            getSpec: getSpec,
            indexData: indexData,
            handleCallError: handleCallError
        });
    };
    return cora;
}(CORA));