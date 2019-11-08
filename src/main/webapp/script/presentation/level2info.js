/*
 * Copyright 2019 Uppsala University Library
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
var CORA = (function(cora) {
    "use strict";
    cora.level2info = function(dependencies, spec) {

        function possiblyAddLevel2Info(infoSpec) {
            if (specInfoHasTechnicalInfo()) {
                addLevelTechnicalInfoAsLevel2(infoSpec);
            }
        }

        function specInfoHasTechnicalInfo() {
            return spec.info.technicalInfo;
        }

        function addLevelTechnicalInfoAsLevel2(infoSpec) {
            infoSpec.level2 = [];
            spec.info.technicalInfo.forEach(function(techInfo) {
                infoSpec.level2.push(createTechInfoPart(techInfo));
            });
        }

        function createTechInfoPart(techInfo) {
            var techInfoPart = {
                "className" : "technicalView",
                "text" : techInfo.text
            };

            if (techInfo.onclickMethod !== undefined) {
                techInfoPart.onclickMethod = techInfo.onclickMethod;
            }
            return techInfoPart;
        }

        return {
            possiblyAddLevel2Info:possiblyAddLevel2Info
        }


    };
    return cora;
}(CORA));