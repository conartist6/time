(function(Em, App) {
  "use strict"
  App.WeekView = Em.View.extend({
    didInsertElement: function() {
      this.$('#favorites_table').tableNav();
      this.$('#predicted_table').tableNav();
    },
    actions: {
      deleteRow: function(tableID) {
        var table = this.$("#"+tableID);
        var rows = table.find("tbody tr");
        var rowsToDelete = [];
        for(var i=0; i<rows.length; i++) {
          var row = rows.eq(i);
          var chkbox = row.find("input:checked");
          if(chkbox.length) {
            rowsToDelete.push(this.get('controller.tp').objectAt(i));
          }
        }
        this.get('controller.tp').removeObjects(rowsToDelete);
      }
    }
  });
})(Ember, App);