angular.module('CFGPT_Mobile.controllers.GroupCtrl', [
	'CFGPT_Mobile.services.GroupsService'])
	.controller('GroupCtrl', ['$scope', '$stateParams', 'GroupsService', function ($scope, $stateParams, GroupsService) {
		$scope.group = GroupsService.getGroup($stateParams.groupId);
	}]);