var H5P = H5P || {};

/**
 * Guess the answer module
 * @external {jQuery} $ H5P.jQuery
 */
H5P.GuessTheAnswer = (function ($) {
  // CSS Classes:
  var MAIN_CONTAINER = 'h5p-guess-answer';
  var TITLE_CONTAINER = 'h5p-guess-answer-title';
  var IMAGE_CONTAINER = 'h5p-guess-answer-image-container';
  var SOLUTION_CONTAINER = 'h5p-guess-answer-solution-container';

  // CSS Subclasses:
  var IMAGE = 'h5p-guess-answer-image';
  var SHOWING_SOLUTION = 'h5p-guess-answer-showing-solution';

  /**
   * Initialize module.
   * @param {Object} params Behavior settings
   * @param {Number} id Content identification
   * @returns {Object} C Counter instance
   */
  function C(params, id) {
    this.$ = $(this);
    this.id = id;

    // Set default behavior.
    this.params = $.extend({}, {
      taskDescription: '',
      solutionLabel: 'Click to see the answer.',
      solutionImage: null,
      solutionText: ''
    }, params);
  }

  /**
   * Attach function called by H5P framework to insert H5P content into page.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  C.prototype.attach = function ($container) {
    this.setActivityStarted();
    this.$inner = $container.addClass(MAIN_CONTAINER)
      .html('<div></div>')
      .children();

    //Attach task description, if provided.
    this.addTaskDescriptionTo(this.$inner);

    //Attach image, if provided.
    this.addImageTo(this.$inner);

    //Attach solution container.
    this.addSolutionContainerTo(this.$inner);
  };

  /**
   * Adds a task description if provided in semantics, to the provided container.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  C.prototype.addTaskDescriptionTo = function ($container) {
    if (this.params.taskDescription) {
      $('<div/>', {
        'class': TITLE_CONTAINER,
        html: this.params.taskDescription
      }).appendTo($container);
    }
  };

  /**
   * Adds image to the provided container.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  C.prototype.addImageTo = function ($container) {
    var self = this;

    if (self.params.solutionImage && self.params.solutionImage.path) {
      var $imageHolder = $('<div/>', {
        'class': IMAGE_CONTAINER
      }).append($('<img/>', {
        'class': IMAGE,
        src: H5P.getPath(self.params.solutionImage.path, self.id),
        load: function () {
          self.trigger('resize');
        }
      }));

      $imageHolder.appendTo($container);
    }
  };

  /**
   * Adds a solution container to the provided container.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  C.prototype.addSolutionContainerTo = function ($container) {
    var self = this;

    self.$solutionContainer = $('<div/>', {
      'class': SOLUTION_CONTAINER,
      html: this.params.solutionLabel
    }).click(function () {
      $(this).addClass(SHOWING_SOLUTION).html(self.params.solutionText);
    }).appendTo($container);
  };

  return C;
})(H5P.jQuery);
