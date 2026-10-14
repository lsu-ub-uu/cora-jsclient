import CORA from "./aCoraNameSpace.js";
import { ajaxCall } from "./net/ajaxCall.js";
import { ajaxCallFactory } from "./net/ajaxCallFactory.js";
import { appTokenLogin } from "./login/appTokenLogin.js";
import { appTokenLoginFactory } from "./login/appTokenLoginFactory.js";
import { authTokenHolder } from "./login/authTokenHolder.js";
import { box } from "./gui/box.js";
import { busy } from "./gui/busy.js";
import { button } from "./gui/button.js";
import { calculatePathForNewElement } from "./metadata/calculatePathForNewElement.js";
import { clientInstanceProvider } from "./jsClient/clientInstanceProvider.js";
import { coraData } from "./metadata/coraData.js";
import { createDivWithClassName } from "./gui/basicGui.js";
import { createLabelWithClassName } from "./gui/basicGui.js";
import { createRemoveButton } from "./gui/basicGui.js";
import { createSpanWithClassName } from "./gui/basicGui.js";
import { dataHolder } from "./metadata/dataHolder.js";
import { definitionViewer } from "./definitionViewer/definitionViewer.js";
import { definitionViewerFactory } from "./definitionViewer/definitionViewerFactory.js";
import { definitionViewerText } from "./definitionViewer/definitionViewerText.js";
import { definitionViewerTextFactory } from "./definitionViewer/definitionViewerTextFactory.js";
import { definitionViewerView } from "./definitionViewer/definitionViewerView.js";
import { definitionViewerViewFactory } from "./definitionViewer/definitionViewerViewFactory.js";
import { genericFactory } from "./genericFactory.js";
import { genericParentFactory } from "./genericParentFactory.js";
import { holder } from "./gui/holder.js";
import { holderFactory } from "./gui/holderFactory.js";
import { incomingLinksListHandler } from "./incomingLinksListHandler.js";
import { incomingLinksListHandlerView } from "./incomingLinksListHandlerView.js";
import { indexHandler } from "./indexHandler.js";
import { indexListHandler } from "./indexListHandler.js";
import { indexListHandlerFactory } from "./indexListHandlerFactory.js";
import { info } from "./gui/info.js";
import { infoFactory } from "./gui/infoFactory.js";
import { inputButton } from "./gui/inputButton.js";
import { jsBookkeeper } from "./metadata/jsBookkeeper.js";
import { jsClient } from "./jsClient/jsClient.js";
import { jsClientFactory } from "./jsClient/jsClientFactory.js";
import { jsClientView } from "./jsClient/jsClientView.js";
import { jsClientViewFactory } from "./jsClient/jsClientViewFactory.js";
import { loginManager } from "./login/loginManager.js";
import { loginManagerFactory } from "./login/loginManagerFactory.js";
import { loginManagerView } from "./login/loginManagerView.js";
import { loginManagerViewFactory } from "./login/loginManagerViewFactory.js";
import { managedGuiItem } from "./managedGuiItem.js";
import { managedGuiItemFactory } from "./managedGuiItemFactory.js";
import { managedGuiItemView } from "./managedGuiItemView.js";
import { managedGuiItemViewFactory } from "./managedGuiItemViewFactory.js";
import { message } from "./gui/message.js";
import { messageHolder } from "./gui/messageHolder.js";
import { messageHolderFactory } from "./gui/messageHolderFactory.js";
import { metadataChildAndRepeatInitializerFactory } from "./metadata/metadataChildAndRepeatInitializerFactory.js";
import { metadataChildInitializer } from "./metadata/metadataChildInitializer.js";
import { metadataChildValidator } from "./metadata/metadataChildValidator.js";
import { metadataController } from "./metadata/metadataController.js";
import { metadataControllerFactory } from "./metadata/metadataControllerFactory.js";
import { metadataHelper } from "./metadata/metadataHelper.js";
import { metadataProvider } from "./metadata/metadataProvider.js";
import { metadataProviderFactory } from "./metadata/metadataProviderFactory.js";
import { metadataRepeatInitializer } from "./metadata/metadataRepeatInitializer.js";
import { metadataRepeatValidator } from "./metadata/metadataRepeatValidator.js";
import { metadataValidator } from "./metadata/metadataValidator.js";
import { metadataValidatorFactory } from "./metadata/metadataValidatorFactory.js";
import { numberVariableValidator } from "./metadata/numberVariableValidator.js";
import { openGuiItemHandler } from "./jsClient/openGuiItemHandler.js";
import { openGuiItemHandlerFactory } from "./jsClient/openGuiItemHandlerFactory.js";
import { openGuiItemHandlerView } from "./jsClient/openGuiItemHandlerView.js";
import { openGuiItemHandlerViewFactory } from "./jsClient/openGuiItemHandlerViewFactory.js";
import { pAttributes } from "./presentation/pAttributes.js";
import { pAttributesView } from "./presentation/pAttributesView.js";
import { pChildRefHandler } from "./presentation/pChildRefHandler.js";
import { pChildRefHandlerView } from "./presentation/pChildRefHandlerView.js";
import { pCollectionVar } from "./presentation/pCollectionVar.js";
import { pCollectionVarView } from "./presentation/pCollectionVarView.js";
import { pGroup } from "./presentation/pGroup.js";
import { pGroupView } from "./presentation/pGroupView.js";
import { pMap } from "./presentation/pMap.js";
import { pMapView } from "./presentation/pMapView.js";
import { pMultipleChildrenViewFactory } from "./presentation/pMultipleChildrenViewFactory.js";
import { pNonRepeatingChildRefHandler } from "./presentation/pNonRepeatingChildRefHandler.js";
import { pNonRepeatingChildRefHandlerView } from "./presentation/pNonRepeatingChildRefHandlerView.js";
import { pNumVar } from "./presentation/pNumVar.js";
import { pNumVarView } from "./presentation/pNumVarView.js";
import { pParentMultipleChildren } from "./presentation/pParentMultipleChildren.js";
import { pParentMultipleChildrenView } from "./presentation/pParentMultipleChildrenView.js";
import { pParentVar } from "./presentation/pParentVar.js";
import { pParentVarView } from "./presentation/pParentVarView.js";
import { pRecordLink } from "./presentation/pRecordLink.js";
import { pRecordLinkView } from "./presentation/pRecordLinkView.js";
import { pRepeatingContainer } from "./presentation/pRepeatingContainer.js";
import { pRepeatingElement } from "./presentation/pRepeatingElement.js";
import { pResourceLink } from "./presentation/pResourceLink.js";
import { pResourceLinkView } from "./presentation/pResourceLinkView.js";
import { pSurroundingContainer } from "./presentation/pSurroundingContainer.js";
import { pSurroundingContainerView } from "./presentation/pSurroundingContainerView.js";
import { pVar } from "./presentation/pVar.js";
import { pVarView } from "./presentation/pVarView.js";
import { pVarViewFactory } from "./presentation/pVarViewFactory.js";
import { passwordLogin } from "./login/passwordLogin.js";
import { passwordLoginFactory } from "./login/passwordLoginFactory.js";
import { passwordLoginJsClientIntegrator } from "./login/passwordLoginJsClientIntegrator.js";
import { passwordLoginView } from "./login/passwordLoginView.js";
import { passwordLoginViewFactory } from "./login/passwordLoginViewFactory.js";
import { pathUtils } from "./metadata/pathUtils.js";
import { presentationFactory } from "./presentation/presentationFactory.js";
import { presentationHolder } from "./presentation/presentationHolder.js";
import { presentationHolderFactory } from "./presentation/presentationHolderFactory.js";
import { pubSub } from "./pubSub.js";
import { question } from "./gui/question.js";
import { recordGui } from "./recordGui/recordGui.js";
import { recordGuiFactory } from "./recordGui/recordGuiFactory.js";
import { recordHandler } from "./recordHandler.js";
import { recordHandlerFactory } from "./recordHandlerFactory.js";
import { recordHandlerView } from "./recordHandlerView.js";
import { recordHandlerViewFactory } from "./recordHandlerViewFactory.js";
import { recordListHandler } from "./recordListHandler.js";
import { recordListHandlerFactory } from "./recordListHandlerFactory.js";
import { recordPartPermissionCalculator } from "./recordPartPermissionCalculator.js";
import { recordTypeHandler } from "./recordTypeHandler.js";
import { recordTypeHandlerFactory } from "./recordTypeHandlerFactory.js";
import { recordTypeHandlerView } from "./recordTypeHandlerView.js";
import { recordTypeHandlerViewFactory } from "./recordTypeHandlerViewFactory.js";
import { recordTypeMenu } from "./jsClient/recordTypeMenu.js";
import { recordTypeProvider } from "./recordTypeProvider.js";
import { recordTypeProviderFactory } from "./recordTypeProviderFactory.js";
import { recordTypeSorter } from "./recordTypeSorter.js";
import { recordViewer } from "./recordViewer.js";
import { recursiveDelete } from "./recursiveDelete/recursiveDelete.js";
import { recursiveDeleteDeleter } from "./recursiveDelete/recursiveDeleteDeleter.js";
import { recursiveDeleteFactory } from "./recursiveDelete/recursiveDeleteFactory.js";
import { recursiveDeleteView } from "./recursiveDelete/recursiveDeleteView.js";
import { reloadableMetadataProvider } from "./metadata/reloadableMetadataProvider.js";
import { reloadableRecordTypeProvider } from "./reloadableRecordTypeProvider.js";
import { reloadableSearchProvider } from "./search/reloadableSearchProvider.js";
import { reloadableTextProvider } from "./metadata/reloadableTextProvider.js";
import { resultHandler } from "./search/resultHandler.js";
import { resultHandlerFactory } from "./search/resultHandlerFactory.js";
import { resultHandlerView } from "./search/resultHandlerView.js";
import { resultHandlerViewFactory } from "./search/resultHandlerViewFactory.js";
import { searchHandler } from "./search/searchHandler.js";
import { searchHandlerFactory } from "./search/searchHandlerFactory.js";
import { searchHandlerJsClientIntegrator } from "./search/searchHandlerJsClientIntegrator.js";
import { searchHandlerJsClientIntegratorFactory } from "./search/searchHandlerJsClientIntegratorFactory.js";
import { searchHandlerView } from "./search/searchHandlerView.js";
import { searchHandlerViewFactory } from "./search/searchHandlerViewFactory.js";
import { searchProvider } from "./search/searchProvider.js";
import { searchProviderFactory } from "./search/searchProviderFactory.js";
import { searchRecordHandler } from "./search/searchRecordHandler.js";
import { searchRecordHandlerFactory } from "./search/searchRecordHandlerFactory.js";
import { searchRecordHandlerView } from "./search/searchRecordHandlerView.js";
import { searchRecordHandlerViewFactory } from "./search/searchRecordHandlerViewFactory.js";
import { textProvider } from "./metadata/textProvider.js";
import { textProviderFactory } from "./metadata/textProviderFactory.js";
import { uploadManager } from "./net/uploadManager.js";
import { uploadManagerFactory } from "./net/uploadManagerFactory.js";
import { uploadManagerView } from "./net/uploadManagerView.js";
import { webRedirectLogin } from "./login/webRedirectLogin.js";
import { webRedirectLoginFactory } from "./login/webRedirectLoginFactory.js";
import { workItemView } from "./gui/workItemView.js";
import { workItemViewFactory } from "./gui/workItemViewFactory.js";
import { xmlHttpRequestFactory } from "./net/xmlHttpRequestFactory.js";

export { ajaxCall };
export { ajaxCallFactory };
export { appTokenLogin };
export { appTokenLoginFactory };
export { authTokenHolder };
export { box };
export { busy };
export { button };
export { calculatePathForNewElement };
export { clientInstanceProvider };
export { coraData };
export { createDivWithClassName };
export { createLabelWithClassName };
export { createRemoveButton };
export { createSpanWithClassName };
export { dataHolder };
export { definitionViewer };
export { definitionViewerFactory };
export { definitionViewerText };
export { definitionViewerTextFactory };
export { definitionViewerView };
export { definitionViewerViewFactory };
export { genericFactory };
export { genericParentFactory };
export { holder };
export { holderFactory };
export { incomingLinksListHandler };
export { incomingLinksListHandlerView };
export { indexHandler };
export { indexListHandler };
export { indexListHandlerFactory };
export { info };
export { infoFactory };
export { inputButton };
export { jsBookkeeper };
export { jsClient };
export { jsClientFactory };
export { jsClientView };
export { jsClientViewFactory };
export { loginManager };
export { loginManagerFactory };
export { loginManagerView };
export { loginManagerViewFactory };
export { managedGuiItem };
export { managedGuiItemFactory };
export { managedGuiItemView };
export { managedGuiItemViewFactory };
export { message };
export { messageHolder };
export { messageHolderFactory };
export { metadataChildAndRepeatInitializerFactory };
export { metadataChildInitializer };
export { metadataChildValidator };
export { metadataController };
export { metadataControllerFactory };
export { metadataHelper };
export { metadataProvider };
export { metadataProviderFactory };
export { metadataRepeatInitializer };
export { metadataRepeatValidator };
export { metadataValidator };
export { metadataValidatorFactory };
export { numberVariableValidator };
export { openGuiItemHandler };
export { openGuiItemHandlerFactory };
export { openGuiItemHandlerView };
export { openGuiItemHandlerViewFactory };
export { pAttributes };
export { pAttributesView };
export { pChildRefHandler };
export { pChildRefHandlerView };
export { pCollectionVar };
export { pCollectionVarView };
export { pGroup };
export { pGroupView };
export { pMap };
export { pMapView };
export { pMultipleChildrenViewFactory };
export { pNonRepeatingChildRefHandler };
export { pNonRepeatingChildRefHandlerView };
export { pNumVar };
export { pNumVarView };
export { pParentMultipleChildren };
export { pParentMultipleChildrenView };
export { pParentVar };
export { pParentVarView };
export { pRecordLink };
export { pRecordLinkView };
export { pRepeatingContainer };
export { pRepeatingElement };
export { pResourceLink };
export { pResourceLinkView };
export { pSurroundingContainer };
export { pSurroundingContainerView };
export { pVar };
export { pVarView };
export { pVarViewFactory };
export { passwordLogin };
export { passwordLoginFactory };
export { passwordLoginJsClientIntegrator };
export { passwordLoginView };
export { passwordLoginViewFactory };
export { pathUtils };
export { presentationFactory };
export { presentationHolder };
export { presentationHolderFactory };
export { pubSub };
export { question };
export { recordGui };
export { recordGuiFactory };
export { recordHandler };
export { recordHandlerFactory };
export { recordHandlerView };
export { recordHandlerViewFactory };
export { recordListHandler };
export { recordListHandlerFactory };
export { recordPartPermissionCalculator };
export { recordTypeHandler };
export { recordTypeHandlerFactory };
export { recordTypeHandlerView };
export { recordTypeHandlerViewFactory };
export { recordTypeMenu };
export { recordTypeProvider };
export { recordTypeProviderFactory };
export { recordTypeSorter };
export { recordViewer };
export { recursiveDelete };
export { recursiveDeleteDeleter };
export { recursiveDeleteFactory };
export { recursiveDeleteView };
export { reloadableMetadataProvider };
export { reloadableRecordTypeProvider };
export { reloadableSearchProvider };
export { reloadableTextProvider };
export { resultHandler };
export { resultHandlerFactory };
export { resultHandlerView };
export { resultHandlerViewFactory };
export { searchHandler };
export { searchHandlerFactory };
export { searchHandlerJsClientIntegrator };
export { searchHandlerJsClientIntegratorFactory };
export { searchHandlerView };
export { searchHandlerViewFactory };
export { searchProvider };
export { searchProviderFactory };
export { searchRecordHandler };
export { searchRecordHandlerFactory };
export { searchRecordHandlerView };
export { searchRecordHandlerViewFactory };
export { textProvider };
export { textProviderFactory };
export { uploadManager };
export { uploadManagerFactory };
export { uploadManagerView };
export { webRedirectLogin };
export { webRedirectLoginFactory };
export { workItemView };
export { workItemViewFactory };
export { xmlHttpRequestFactory };

Object.assign(CORA, {
	ajaxCall,
	ajaxCallFactory,
	appTokenLogin,
	appTokenLoginFactory,
	authTokenHolder,
	box,
	busy,
	button,
	calculatePathForNewElement,
	clientInstanceProvider,
	coraData,
	createDivWithClassName,
	createLabelWithClassName,
	createRemoveButton,
	createSpanWithClassName,
	dataHolder,
	definitionViewer,
	definitionViewerFactory,
	definitionViewerText,
	definitionViewerTextFactory,
	definitionViewerView,
	definitionViewerViewFactory,
	genericFactory,
	genericParentFactory,
	holder,
	holderFactory,
	incomingLinksListHandler,
	incomingLinksListHandlerView,
	indexHandler,
	indexListHandler,
	indexListHandlerFactory,
	info,
	infoFactory,
	inputButton,
	jsBookkeeper,
	jsClient,
	jsClientFactory,
	jsClientView,
	jsClientViewFactory,
	loginManager,
	loginManagerFactory,
	loginManagerView,
	loginManagerViewFactory,
	managedGuiItem,
	managedGuiItemFactory,
	managedGuiItemView,
	managedGuiItemViewFactory,
	message,
	messageHolder,
	messageHolderFactory,
	metadataChildAndRepeatInitializerFactory,
	metadataChildInitializer,
	metadataChildValidator,
	metadataController,
	metadataControllerFactory,
	metadataHelper,
	metadataProvider,
	metadataProviderFactory,
	metadataRepeatInitializer,
	metadataRepeatValidator,
	metadataValidator,
	metadataValidatorFactory,
	numberVariableValidator,
	openGuiItemHandler,
	openGuiItemHandlerFactory,
	openGuiItemHandlerView,
	openGuiItemHandlerViewFactory,
	pAttributes,
	pAttributesView,
	pChildRefHandler,
	pChildRefHandlerView,
	pCollectionVar,
	pCollectionVarView,
	pGroup,
	pGroupView,
	pMap,
	pMapView,
	pMultipleChildrenViewFactory,
	pNonRepeatingChildRefHandler,
	pNonRepeatingChildRefHandlerView,
	pNumVar,
	pNumVarView,
	pParentMultipleChildren,
	pParentMultipleChildrenView,
	pParentVar,
	pParentVarView,
	pRecordLink,
	pRecordLinkView,
	pRepeatingContainer,
	pRepeatingElement,
	pResourceLink,
	pResourceLinkView,
	pSurroundingContainer,
	pSurroundingContainerView,
	pVar,
	pVarView,
	pVarViewFactory,
	passwordLogin,
	passwordLoginFactory,
	passwordLoginJsClientIntegrator,
	passwordLoginView,
	passwordLoginViewFactory,
	pathUtils,
	presentationFactory,
	presentationHolder,
	presentationHolderFactory,
	pubSub,
	question,
	recordGui,
	recordGuiFactory,
	recordHandler,
	recordHandlerFactory,
	recordHandlerView,
	recordHandlerViewFactory,
	recordListHandler,
	recordListHandlerFactory,
	recordPartPermissionCalculator,
	recordTypeHandler,
	recordTypeHandlerFactory,
	recordTypeHandlerView,
	recordTypeHandlerViewFactory,
	recordTypeMenu,
	recordTypeProvider,
	recordTypeProviderFactory,
	recordTypeSorter,
	recordViewer,
	recursiveDelete,
	recursiveDeleteDeleter,
	recursiveDeleteFactory,
	recursiveDeleteView,
	reloadableMetadataProvider,
	reloadableRecordTypeProvider,
	reloadableSearchProvider,
	reloadableTextProvider,
	resultHandler,
	resultHandlerFactory,
	resultHandlerView,
	resultHandlerViewFactory,
	searchHandler,
	searchHandlerFactory,
	searchHandlerJsClientIntegrator,
	searchHandlerJsClientIntegratorFactory,
	searchHandlerView,
	searchHandlerViewFactory,
	searchProvider,
	searchProviderFactory,
	searchRecordHandler,
	searchRecordHandlerFactory,
	searchRecordHandlerView,
	searchRecordHandlerViewFactory,
	textProvider,
	textProviderFactory,
	uploadManager,
	uploadManagerFactory,
	uploadManagerView,
	webRedirectLogin,
	webRedirectLoginFactory,
	workItemView,
	workItemViewFactory,
	xmlHttpRequestFactory,
});

export default CORA;
