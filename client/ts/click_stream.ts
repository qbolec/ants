class ClickStream{
  constructor(){
    this.start();
  }
  getPath(node){
    if (node.length != 1) throw 'Requires one element.';

    var path;
    while (node.length) {
        var realNode = node[0], name = realNode.localName;
        if (!name) break;

        name = name.toLowerCase();
        if (realNode.id) {
            name + '#' + realNode.id;
        }

        var parent = node.parent(), siblings = parent.children(name);
        if (siblings.length > 1) name += ':eq(' + siblings.index(node) + ')';
        path = name + (path ? '>' + path : '');
        if (realNode.id) {
          break;
        }
        node = parent;
    }

    return path;
  }
  report(path,screenX,screenY){
    app.api.reportClick({path:path,screen:{x:screenX,y:screenY},timestamp:+new Date()});
  }
  start(){
    $(window.document.body).on('click',(e)=>{
      this.report(this.getPath($(e.target)), e.screenX, e.screenY);
    });
  }
}