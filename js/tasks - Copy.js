"use strict";

(function() {
    var kanbanBoard = window.kanbanBoard || {};
    kanbanBoard.templates = kanbanBoard.templates || {
            colCountTemplate: "{colCount}",
            statusTemplate: "{status}",
            headerTemplate: "{header}",
            bodyTemplate: "{body}",
            colWidthClassTemplate: "ms-u-sm",
            column: "<div class='ms-Grid-col {colCount}'>{header}{body}</div>",
            getContent: function(tasks) {
                var self = this;
                var colWidthClass = this.colWidthClassTemplate + (12 / tasks.length);
                var template = "";
                $(tasks).each(function() {
                    template += self.getColumnTemplate(this, colWidthClass);
                });

                return template;
            },
            getColumnTemplate: function(task, colWidthClass) {
                var header = this.getHeaderTemplate(task.status);
                var template = task
                    .replace(this.colCountTemplate, colWidthClass)
                    .replace(this.statusTemplate, task.status);

                return template;
            },
            getHeaderTemplate: function(status) {
                
            }
        };
    kanbanBoard.board = kanbanBoard.board || {
            tasks: [{ status: "New" }, { status: "Pending" }, { status: "In Progress" }, { status: "Closed" }],
            render: function(tasks) {
                var taskHtml = kanbanBoard.templates.getContent(tasks);
                $("#boardContent").html(taskHtml);
            }
        };

    kanbanBoard.board.render(kanbanBoard.board.tasks);
})();

