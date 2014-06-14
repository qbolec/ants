class Page extends Control {
  quit(){
    this.stopListening();
    this.view.stopListening();
  }
}