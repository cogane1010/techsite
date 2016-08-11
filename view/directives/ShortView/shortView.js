/**
 * Created by Nguyen Hoang on 4/3/2015.
 */
App.directive('gbShortView', function() {
    return {
        restrict: 'E',
        templateUrl: 'view/directives/shortView.html',
        scope: {
            show: '=show',
            notes: '=notes',
            orderValue: '@orderBy',
            onDelete: '=deleteNoteHandler'
        }
    };
})