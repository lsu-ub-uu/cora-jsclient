/*
 * Copyright 2016, 2017, 2020 Uppsala University Library
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
	cora.metadataChildAndRepeatInitializerFactory = function(dependencies) {
		let self;
		
		let metadataChildInititalizerDep = {
				recordTypeProvider : dependencies.recordTypeProvider,
				metadataProvider : dependencies.metadataProvider,
				pubSub : dependencies.pubSub
				
		};
		let metadataRepeatInititalizerDep = {
				recordTypeProvider : dependencies.recordTypeProvider,
				metadataProvider : dependencies.metadataProvider,
				pubSub : dependencies.pubSub
		};

		let metadataChildInitializerFactory =  CORA.genericFactory(
				"metadataChildInitializer", metadataChildInititalizerDep);
		let metadataRepeatInitializerFactory =  CORA.genericFactory(
				"metadataRepeatInitializer", metadataRepeatInititalizerDep);
		
		const factorChildInitializer = function(spec) {
			metadataChildInititalizerDep.metadataChildAndRepeatInitializerFactory = self;
			return metadataChildInitializerFactory.factor(spec);
		};
		
		const factorRepeatInitializer = function(spec) {
			metadataRepeatInititalizerDep.metadataChildAndRepeatInitializerFactory = self;
			return metadataRepeatInitializerFactory.factor(spec);
		};
		
		const getDependencies = function () {
			return dependencies;
		}
		
		const getChildInitializerFactory = function(){
			return metadataChildInitializerFactory;
		}
		
		const getRepeatInitializerFactory = function(){
			return metadataRepeatInitializerFactory;
		}

		let out = Object.freeze({
			"type" : "metadataChildAndRepeatInitializerFactory",
			getDependencies : getDependencies,
			factorChildInitializer : factorChildInitializer,
			factorRepeatInitializer : factorRepeatInitializer,
			getChildInitializerFactory : getChildInitializerFactory,
			getRepeatInitializerFactory : getRepeatInitializerFactory
		});
		self = out;
		return out;
	};
	return cora;
}(CORA));