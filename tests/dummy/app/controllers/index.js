import Ember from 'ember';

export default Ember.Controller.extend({
  menuBar: true,
  options: {
    height: 300,
    theme: 'modern',
    plugins: [
      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking save table contextmenu directionality',
      'emoticons template paste textcolor colorpicker textpattern imagetools'
    ],
    toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview media | forecolor backcolor emoticons',
    image_advtab: true,
    templates: [
      { title: 'Test template 1', content: 'Test 1' },
      { title: 'Test template 2', content: 'Test 2' }
    ],
  },
  demoText: '<div> <p style="text-align: center; font-size: 15px;"><img src="https://www.tinymce.com/images/glyph-tinymce@2x.png" alt="" width="220" height="194"></p><p style="text-align: center; color: #7e7e7e; font-size: 15px; font-family: avenir; font-weight: 200;">TinyMCE is a platform independent web-based JavaScript HTML WYSIWYG<br>editor control released as open source under LGPL.</p><p style="text-align: center; color: #868686; font-size: 15px; font-family: avenir; font-weight: 200;"><em>TinyMCE enables you to convert HTML textarea fields or other HTML elements to editor instances.</em></p><p>&nbsp;</p>  </div>',
  actions:{
    toggleMenu(){
      let options = this.get('options'), self = this
      this.set('options',{})
      this.toggleProperty('menuBar')

      Ember.run.later(function(){
        options['menubar'] = self.get('menuBar')
        self.set('options',options)
      }, 10)

    }
  }
});
