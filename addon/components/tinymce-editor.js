import Ember from 'ember';
const {observer, on, run} = Ember;

export default Ember.Component.extend({
  editor: undefined,
  tagName: 'textarea',
  _contentChangedListener: null,

  valueChanged: observer('value', function() {
    let editor = this.get('editor');
    if (editor && editor.getContent() !== this.get('value')) {
      editor.setContent(this.get('value') || '');
    }
  }),

  onValueChanged(value) {
    this.set('value', value);
  },

  contentChanged(editor) {
    if (!editor.isNotDirty)
      this.onValueChanged(editor.getContent());
  },

  setEvents: observer('editor', function() {
    let editor = this.get('editor');

    this._contentChangedListener = run.bind(this, ()=> {
      run.debounce(this, this.contentChanged, editor, 1);
    });

    editor.on('change keyup keydown keypress mousedown', this._contentChangedListener);
  }),

  initTiny: on('didInsertElement', observer('options', function() {
    let {options, editor} = this.getProperties('options', 'editor');

    let customOptions = {
      selector: `#${this.get('elementId')}`,
      init_instance_callback: (editor) => {
        this.set('editor', editor);
        this.get('editor').setContent(this.get('value') || ''); //Set content with default text
      },
    };

    if (editor){
      editor.setContent('');
      editor.destroy();
    }
    
    run.later( () => {
      tinymce.init(Ember.$.extend( customOptions, options ));
    }, 10)      
  })),

  cleanUp: on('willDestroyElement', function() {
    let editor = this.get('editor');
    if (editor) {
      editor.off('change keyup keydown keypress mousedown', this._contentChangedListener);
      editor.destroy();
    }
  })
});
