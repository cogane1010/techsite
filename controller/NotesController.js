App.controller('AddNoteController', function ($scope, $location, $routeParams, NoteModel, LinkModel ) {
		var linkId = $routeParams.linkId;

		$scope.cancel = function() {
			$location.path('/link/' + linkId);
		}

		$scope.createNote = function() { 
			NoteModel.addNote(linkId, $scope.note.content);
			$location.path('/link/' + linkId);
		}
	}
);


App.controller('DeleteNoteController', function ($scope, $location, $routeParams, NoteModel) {
		var linkId = $routeParams.linkId;
		NoteModel.deleteNote(linkId, $routeParams.noteId);
		$location.path('/link/' + linkId);
	}
);
			
