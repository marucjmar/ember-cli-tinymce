import Ember from 'ember';

const {observer, on, run} = Ember;

export default Ember.Component.extend({
  editor: undefined,
  tagName: 'textarea',

  // Change the editor content if value changes
  valueChanged: Ember.observer('value', function() {
    let editor = this.get('editor');
    if (editor && editor.getContent() !== this.get('value')) {
      editor.setContent(this.get('value') || '');
    }
  }),

  // Change de value if editor content changes
  contentChanged(editor) {
    this.set('value', editor.getContent());
  },

  //Bind events to function
  setEvents: observer('editor', function() {
    let editor = this.get('editor');
    editor.on('change keyup keydown keypress mousedown', ()=>{
      run.debounce(this, this.contentChanged, editor, 1);
    });
  }),

  // Initialize tinymce
  initTiny: on('didInsertElement', observer('options', function() {
    let {options, editor} = this.getProperties('options', 'editor')

    let customOptions = {
      selector: `#${this.get('elementId')}`,
      init_instance_callback : (editor) => {
        this.set('editor', editor);
        this.get('editor').setContent(this.get('value') || ''); //Set content with default text
      },
    };

    if (editor){
      editor.destroy();
    }

    tinymce.init(Ember.$.extend( customOptions, options ));
  }))
});
