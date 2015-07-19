import Ember from 'ember';

export default Ember.Mixin.create({
  attributeBindings: ['tabindex'],
  focused: false,
  init: function() {
    this._super();
    let shouldFocusElement = this.get('focused');
    if (shouldFocusElement) {
      this.on('didInsertElement', () => {
        this.updateFocused();
      });
    }
  },
  updateFocused: function() {
    let focusedElement = document.activeElement;
    let componentElement = this.$()[0];
    let $ = Ember.$;
    let isAlreadyFocused = Boolean(focusedElement) && $.contains(componentElement, focusedElement);
    let shouldFocusElement = this.get('focused');
    if (shouldFocusElement === isAlreadyFocused) { return; }
    if (shouldFocusElement) {
      let selector = this.get('selector') || 'input,textarea,select';
      let inputElement = this.$(selector)[0];
      inputElement.focus();
    } else {
      focusedElement.blur();
    }
  }.observes('focused'),
  focusIn: function(event) {
    event.stopPropagation();
    this.set('focused', true);
  },
  focusOut: function(event) {
    event.stopPropagation();
    this.set('focused', false);
  }
});
