import Ember from 'ember';
const {observer, on, run} = Ember;

export default Ember.Component.extend({
  editor: null,
  tagName: 'textarea',
  _contentChangedListener: null,
  changeDebounce: 10,

  valueChanged: observer('value', function() {
    let {editor, value} = this.getProperties('editor', 'value');
    if (editor && editor.getContent() !== value) {
      editor.setContent(value || '');
    }
  }),

  onValueChanged(value) {
    this.set('value', value);
  },

  contentChanged(editor) {
    if (!editor.isNotDirty) {
      this.onValueChanged(editor.getContent());
    }
  },
  
  debounceContentChanged(editor, time){
    run.debounce(this, this.contentChanged, editor, time);
  },
  
  setEvents: observer('editor', function() {
    let {changeDebounce, editor} = this.getProperties('changeDebounce', 'editor');
    
    if (!editor){
      return;
    }
    
    editor.on('change keyup keydown keypress mousedown',
              run.bind(this, this.debounceContentChanged, editor, changeDebounce));
  }),

  initTiny: on('didInsertElement', observer('options', function() {
    let {options, editor} = this.getProperties('options', 'editor');
    
    let initFunction = (editor) => {
      this.set('editor', editor);
      this.get('editor').setContent(this.get('value') || ''); //Set content with default text
    }

    let customOptions = {
      selector: `#${this.get('elementId')}`,
      init_instance_callback: run.bind(this, initFunction)
    };

    if (editor){
      editor.setContent('');
      editor.destroy();
    }
    
    run.later( () => {
      tinymce.init(Ember.assign({}, options, customOptions));
    }, 10)      
  })),

  cleanUp: on('willDestroyElement', function() {
    let editor = this.get('editor');
    if (editor) {
      editor.off('change keyup keydown keypress mousedown');
      editor.destroy();
    }
  })
});
