(function() {
  /**
  * @function claculatePercent
  * @desc Calculate the horizontal percent value where event(click) happens on seek-bar
  * @param
  * @returns
  */
  var calculatePercent = function(seekBar, event) {
    var offsetX = event.pageX - seekBar.offset().left;
    var seekBarWidth = seekBar.width();
    var offsetXPercent = offsetX / seekBarWidth;
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(1, offsetXPercent);
    return offsetXPercent;
  };

  function seekBar($document) {
    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, element, attribute) {
        scope.value = 0;
        scope.max = 100;

        /**
        * @desc Holds the element that matches the directive as a jQuery object
        * @type element?
        */
        var seekBar = $(element);

        /**
        * @function percentString
        * @desc Calculates a percent based on the value and the max value of seek-bar
        * @returns {String}
        */
        var percentString = function() {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };

        /**
        * @function fillStyle
        * @desc Returns the width of the seek bar fill element based on the calculated percent
        * @returns {Object}
        */
        scope.fillStyle = function() {
          return {width: percentString()};
        };

        /**
        * @function onClickSeekBar
        * @desc Updates the seek-bar value based on seek-bar's width and the location where event(click) happens
        * @param event
        */
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
        };

        /**
        * @function trackThumb
        * @desc Apply the change in scope.value as the user drags the seek-bar thumb
        */
        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
            });
          });

          $document.bind('mouseup.thumb', function(event) {
            $document.unbind('mousedown.thumb');
            $document.unbind('mouseup.thumb');
          });
        };
      }
    };
  }

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);
})();
