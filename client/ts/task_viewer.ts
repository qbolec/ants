///<reference path="./backbone/backbone.d.ts" />
///<reference path="./control.ts" />
///<reference path="./question_viewer.ts" />
///<reference path="./answer_selector.ts" />
///<reference path="./chosen_answers_viewer.ts" />


class TaskViewerView extends Backbone.View{
  model:TaskViewer;
  task:TaskModel;
  className(){return 'task_viewer'}
  initialize(){
    this.listenTo(this.model,'change:current_task',(model,task)=>{
      this.adjustToTask(task);
    });
    this.adjustToTask(this.model.get('current_task'));
  }
  adjustToTask(task){
    if(this.task){
      this.stopListening(this.task);
    }
    this.task=task;
    if(task){
      this.listenTo(this.task,'change:state',(task,state)=>{
        this.adjustToState(state);
      });
      this.adjustToState(task.get('state'));
    }
  }
  adjustToState(state){
    this.$el.removeClass('state-fresh state-wrong state-correct');
    this.$el.addClass('state-'+state);
  }
  render(){
    this.$el.empty();
    this.$el.append(this.model.question_viewer.getEl());
    this.$el.append(this.model.answer_selector.getEl());
    this.$el.append(this.model.chosen_answers_viewer.getEl());
    return this;
  }
}
class TaskViewer extends Control {
  defaults(){
    return {
      current_task:null,
    }
  }
  view:TaskViewerView;
  question_viewer:QuestionViewer;
  answer_selector:AnswerSelector;
  chosen_answers_viewer:ChosenAnswersViewer;
  canDeactivate(){
    return this.answer_selector.canDeactivate();
  }
  selectAnswer(task,answer){
    app.api.selectAnswer(task,answer,{
      success:(update)=>{
        answer.set('chosen',true);
        app.activate();
        task.set(update);
        if(task.get('state')=='correct'){
          var alert = new Alert({msg:"Gratulacje, to prawidłowa odpowiedź, spróbujmy teraz czegoś trudniejszego.",kind:"success",ttl:2000});
        }else{
          var alert = new Alert({msg:"Niestety, to zła odpowiedź, spróbujmy czegoś prostszego.",kind:"danger",ttl:2000});
        }
        app.alerts.add(alert);
        _.delay(()=>{
          if(this.get('current_task') == task){
            app.activate();
            this.trigger('next_requested');
          }
        },2000);
      },
      error:()=>{
        console.log('Error answer to ' + task.get('html') + 'is ',answer.get('letter'));
      }
    });
  }
  i_dont_know_and_i_dont_care(task){
    app.api.markAsWrong(task,{
      success:(update)=>{
        app.activate();
        task.set(update);
        if(this.get('current_task')==task){
          this.trigger('next_requested');
        }
      },
      error:()=>{
        console.log("Error when marking as wrong");
      }
    });
  }
  i_dont_know_but_i_want_to_know(task){
    app.api.markAsWrong(task,{
      success:(update)=>{
        app.activate();
        task.set(update);
        if(this.get('current_task')==task){
          this.trigger('help_requested');
        }
      },
      error:()=>{
        console.log("Error when marking as wrong");
      }
    });
  }
  i_know_but_i_am_in_haste(task){
    app.api.markAsCorrect(task,{
      success:(update)=>{
        app.activate();
        task.set(update);
        if(this.get('current_task')==task){
          this.trigger('next_requested');
        }
      },
      error:()=>{
        console.log("Error when marking as correct");
      }
    });
  }
  skip_without_prejudice(){
    this.trigger('next_requested');
  }
  skip_this_subject(task){
    if(task.get('subject_id')){
      app.learning_scope.ignoreSubjectId(task.get('subject_id'));
      app.alerts.add(new Alert({msg:"OK, ten temat nie pojawi się już dzisiaj.",kind:"info",ttl:2000}));
      this.trigger('next_requested');
    }
  }
  change_subject(){
    app.alerts.add(new Alert({msg:"Wybierz z drzewka temat, który chcesz poćwiczyć",kind:"info",ttl:5000}));
    app.router.navigate("report", {trigger: true});
  }
  userWantsToSkip(){
    this.answer_selector.userWantsToSkip();
  }
  initialize(){
    this.question_viewer = new QuestionViewer();
    this.answer_selector = new AnswerSelector();
    this.chosen_answers_viewer = new ChosenAnswersViewer();
    this.view = new TaskViewerView({model:this});
    this.view.render();
    this.listenTo(this,'change:current_task',(model,task)=>{
      this.question_viewer.set('current_task',task);
      this.answer_selector.set('current_task',task);
      this.chosen_answers_viewer.set('current_task',task);
    });
    this.listenTo(this.answer_selector,'answer',this.selectAnswer);
    this.listenTo(this.answer_selector,'i_dont_know_and_i_dont_care',this.i_dont_know_and_i_dont_care);
    this.listenTo(this.answer_selector,'i_dont_know_but_i_want_to_know',this.i_dont_know_but_i_want_to_know);
    this.listenTo(this.answer_selector,'i_know_but_i_am_in_haste',this.i_know_but_i_am_in_haste);
    this.listenTo(this.answer_selector,'skip_without_prejudice',this.skip_without_prejudice);
    this.listenTo(this.answer_selector,'skip_this_subject',this.skip_this_subject);
    this.listenTo(this.answer_selector,'change_subject',this.change_subject);

  }
}
