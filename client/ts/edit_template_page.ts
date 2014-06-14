///<reference path="../jst/edit_template_page.ts" />
///<reference path="./page.ts" />
///<reference path="./task_template_executor.ts" />
class EditTemplatePageView extends Backbone.View{
  model:EditTemplatePage;
  editor:AceAjax.Editor;
  last_markers = [];
  className(){return "edit_template_page"}
  events(){
    return {
      'click .save' : ()=> this.trigger('save'),
      'change .is_open_source' : () => {
        this.model.get('me').set('is_open_source', (<HTMLInputElement>this.$('input.is_open_source')[0]).checked );
      },
      'change .nick' : () => {
        this.model.get('me').set('nick', (<HTMLInputElement>this.$('input.nick')[0]).value );
      }
    }
  }
  sourceToRanges(source){
    // session is an instance of Ace editSession
    // Usage
    // var lengthArray = calculateCumulativeLength(editor.getSession());
    // Need to call this only if the document is updated after the last call.
    function calculateCumulativeLength(session){
      var cumLength = [];    // honestly! It took me 25 hours to notice this! *actually stands for CUMulativeLENGTH.
      var cnt = session.getLength();
      var cuml = 0, nlLength = session.getDocument().getNewLineCharacter().length;
      cumLength.push(cuml);
      var text = session.getLines(0, cnt);
      for(var i=0; i< cnt; i++){
        cuml += text[i].length + nlLength;
        cumLength.push(cuml);
      }

      return cumLength;
    }

    // Fast binary search implementation
    // Pass the cumulative length array here.
    // Usage
    // var row = findRow(lengthArray, 0, lengthArray.length, 2512);
    // tries to find 2512th character lies in which row.
    function findRow(cumLength, rows, rowe, pos){
      if(rows > rowe)
      return null;

      if(rows + 1 === rowe)
      return rows;

      var mid = Math.floor((rows + rowe) / 2);

      if(pos < cumLength[mid])
      return findRow(cumLength, rows, mid, pos);

      else if(pos > cumLength[mid])
      return findRow(cumLength, mid, rowe, pos);

      else return mid;

    }
    var cumLength = calculateCumulativeLength(this.editor.getSession());
    function offsetToPoint(offset){
      var r = findRow(cumLength,0,cumLength.length, offset);
      var c = offset - cumLength[r];
      return {line:r,column:c};
    }
    var start = offsetToPoint(source.start);
    var end = offsetToPoint(source.end);
    return new (ace.require('ace/range').Range)(start.line, start.column, end.line, end.column);
  }
  getNumericValue(control){
    return +control.value + '' === control.value ? +control.value : undefined ;
  }
  clearMarkers(){
    if(this.editor){
      this.editor.getSession().clearAnnotations();
      _.each(this.last_markers,(marker)=>this.editor.getSession().removeMarker(marker));
      this.last_markers = [];
    }
  }
  initialize(){

  }
  addErrorMarker(e){
    if('source' in e){
      var range = this.sourceToRanges(e.source);
    }else if('column' in e && 'line' in e && this.editor){
      var range = new (ace.require('ace/range').Range)(e.line-1, e.column-1, e.line-1, e.column);
    }else{
      return;
    }
    this.editor.getSession().setAnnotations([{column: range.start.column,row:range.start.row,text:e.toString(),type:'error'}]);
    this.last_markers.push(this.editor.getSession().addMarker(range,"sexp_error","text",false));
  }
  updateWarning(){
    var e=this.model.get('warning');
    this.$('.warning_info').toggleClass('hidden',e==null);
    if(e){
      var warning_text = e.toString();
      this.addErrorMarker(e);
      this.$('.warning_info').text(warning_text);
      this.addErrorMarker(e);
    }else{
      this.$('.warning_info').empty();
    }
  }
  updateError(){
    var e=this.model.get('error');
    this.$('.error_info').toggleClass('hidden',e==null);
    if(e){
      this.$('.error_info').text(e.toString());
      this.addErrorMarker(e);
    }else{
      this.$('.error_info').empty();
    }
  }
  render(){
    this.$el.html(Templates.get('edit_template_page')({
      source:this.model.get('me').get('source'),
      is_open_source:this.model.get('me').get('is_open_source'),
      nick:this.model.get('me').get('nick'),
    }));
    _.defer(()=>{
      this.editor = ace.edit(this.$(".source")[0]);
      this.editor.setTheme("ace/theme/monokai");
      this.editor.getSession().setMode("ace/mode/sexp");
      this.editor.setOption("showPrintMargin", false);
      this.editor.focus();
      this.editor.gotoLine(5,4);
      this.trigger('execution_required');
      this.editor.getSession().on('change',() => {
        this.clearMarkers();
        this.model.get('me').set('source', this.editor.getValue())
      });
      this.updateError();
      this.updateWarning();
      this.listenTo(this.model,'change:error',this.updateError);
      this.listenTo(this.model,'change:warning',this.updateWarning);
    });

    return this;
  }
}
class EditTemplatePage extends Page {
  view:EditTemplatePageView;
  executor:TaskTemplateExecutor;
  default(){
    return {
      me:null,
      task_template:null,
      error:null,
      warning:null,
      task:null,
    }
  }
  private result(task){
    this.set('error',null);
    this.set('task',task);
  }
  private error(e){
    this.set('error',e);
    this.set('task',null);
  }
  public run(){
    try{
      var type = this.executor.infereType(this.get('me').get('source'));
      this.set('warning',null);
    }catch(e){
      this.set('warning',null); //chyba nie zauważa zmiany inaczej??
      this.set('warning',e);
    }
  }
  public saveTemplate(){
    app.api.saveNick(this.get('me').get('nick'),{
      success:()=>{
      },
      error:()=>{
        app.alerts.add(new Alert({kind:'danger',msg:Texts.get('save_nick/response/other'),ttl:5000}))
      },

    });
    app.api.saveIsOpenSource(this.get('me').get('is_open_source'),{
      success:()=>{

      },
      error:()=>{
        app.alerts.add(new Alert({kind:'danger',msg:Texts.get('save_is_open_source/response/other'),ttl:5000}))
      },

    });
    var ast = null;
    try{
      ast = JSON.stringify(this.executor.parse(this.get('me').get('source')));
    }catch(e){
      ast = null;
    }
    app.api.saveAst(ast,{
      success:()=>{
      },
      error:()=>{
        app.alerts.add(new Alert({kind:'danger',msg:Texts.get('save_ast/response/other'),ttl:5000}))
      },

    });
    app.api.saveSource(this.get('me').get('source'),{
      success:(me)=>{
        this.get('me').set(me);
        app.alerts.add(new Alert({kind:'success',msg:Texts.get('task_template/save/response/200'),ttl:5000}));
      },
      error:(xhr)=>{
        var status_to_alert = {
        };
        var alert = status_to_alert[+ xhr.status] || {kind:'danger',msg:Texts.get('task_template/save/response/other',xhr.status ),ttl:60000};
        app.alerts.add(new Alert(_.extend(alert,{})));
      }
    });
  }
  initialize(){
    this.executor = new TaskTemplateExecutor();

    this.view = new EditTemplatePageView({model:this});
    this.view.render();

    var lazy_run = _.throttle( () => this.run(), 500 );
    var lazy_run_handler = (e) => lazy_run(); //just ignore e

    this.listenTo(this.get('me'),'change:source',lazy_run_handler);
    this.listenTo(this.view,'execution_required',lazy_run_handler);
    this.listenTo(this.view,'save',this.saveTemplate);
  }
}
