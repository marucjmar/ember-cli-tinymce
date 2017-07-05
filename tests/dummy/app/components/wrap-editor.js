import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    toggleModal(){
      this.toggleProperty('isShowingModal')
    }
  }
});