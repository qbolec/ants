///<reference path="./answers.ts" />
class TaskModel extends Backbone.Model{
  private answers : AnswersCollection;
  defaults(){
    return {
      html:"Rozwiąż nierówność x&le;5x<sup>2</sup>-1",
      state:'fresh',
    }
  }
  initialize(){
    this.answers = new AnswersCollection(this.get('answers'));
  }
  getAnswers(ops){
    return ops.success(this.answers);
  }
}
