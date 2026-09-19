import CORA from "./main.js";
import CORATEST from "../../test/script/aCoratestNameSpace.js";
import "../../test/script/metadata/metadataProviderStub.js";
import "../../test/script/metadata/textProviderStub.js";
import "../../test/script/recordTypeProviderStub.js";
import "../../test/script/metadata/metadataProviderRealStub.js";
import "../../test/script/metadata/textProviderRealStub.js";

window.CORA = CORA;
window.CORATEST = CORATEST;
window.MetadataProviderStub = CORATEST.MetadataProviderStub;

export {};
