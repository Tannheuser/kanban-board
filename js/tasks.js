"use strict";

(function() {
    var kanbanBoard = window.kanbanBoard || {};
    kanbanBoard.templates = kanbanBoard.templates || {
        colCountTemplate: "{colCount}",
        statusTemplate: "{status}",
        headerTemplate: "{header}",
        bodyTemplate: "{body}",
        tasksTemplate: "{tasks}",
        titleTemplate: "{title}",
        assigneeTemplate: "{assignee}",
        deadlineTemplate: "{deadline}",
        colWidthClassTemplate: "ms-u-sm",
        column: "<div class='ms-Grid-col {colCount}'>{header}{body}</div>",
        header: "<ul class='list'>" +
                    "<h3 class='ms-font-l ms-fontColor-themeDarkAlt ms-fontWeight-regular'>{status}</h3>" +
                    "<hr class='ms-fontColor-themeLighterAlt'/></ul>",
        body: "<div class='kb-col-container'>{tasks}</div>",
        task: "<div class='ms-Callout ms-Callout--arrowLeft'>" +
                "<div class='ms-Callout-main'>" +
                    "<div class='ms-Callout-header'><p class='ms-Callout-title ms-fontColor-themePrimary'>{title}</p></div>" +
                    "<div class='ms-Callout-inner'>" +
                        "<div class='ms-Callout-content'><p class='ms-Callout-subText'>{assignee}</p></div>" +
                        "<div class='ms-Callout-actions'><p class='ms-Callout-subText'><i class='ms-Icon ms-Icon--clock'></i> {deadline}</p></div>" +
                    "</div>" +
                "</div>" +
            "</div>"
    };

    kanbanBoard.board = kanbanBoard.board || {
        getContent: function(tasks) {
            var self = this;
            var colWidthClass = kanbanBoard.templates.colWidthClassTemplate + (12 / tasks.length);
            var template = "";
            $(tasks).each(function() {
                template += self.getColumnTemplate(this, colWidthClass);
            });

            return template;
        },
        getColumnTemplate: function(task, colWidthClass) {
            var header = this.getHeaderTemplate(task.status);
            var body = this.getBodyTemplate(task.items);
            return kanbanBoard.templates.column
                .replace(kanbanBoard.templates.colCountTemplate, colWidthClass)
                .replace(kanbanBoard.templates.headerTemplate, header)
                .replace(kanbanBoard.templates.bodyTemplate, body);
        },
        getHeaderTemplate: function(status) {
            return kanbanBoard.templates.header.replace(kanbanBoard.templates.statusTemplate, status);
        },
        getBodyTemplate: function(tasks) {
            var template = "";

            $(tasks).each(function() {
                template += kanbanBoard.templates.task
                    .replace(kanbanBoard.templates.titleTemplate, this.title)
                    .replace(kanbanBoard.templates.assigneeTemplate, this.assignee)
                    .replace(kanbanBoard.templates.deadlineTemplate, this.deadline);
            });

            return kanbanBoard.templates.body.replace(kanbanBoard.templates.tasksTemplate, template);
        },
        render: function(tasks) {
            var content = this.getContent(tasks);
            $("#boardContent").html(content);
        }
    };

    kanbanBoard.data = kanbanBoard.data || {
        tasks: [
            {
                status: "New",
                items: [
                    {
                        title: "Поиск ресурсов проекта",
                        assignee: "Риккель Антон",
                        deadline: "01.02.2016"
                    },
                    {
                        title: "Разработка архитектуры",
                        assignee: "Рябинин Алексей",
                        deadline: "10.02.2016"
                    }
                ]
            },
            {
                status: "Pending",
                items: [
                    {
                        title: "Настройка среды",
                        assignee: "Исупов Владимир",
                        deadline: "28.01.2016"
                    },
                    {
                        title: "Подготовка пресейла",
                        assignee: "Исупов Владимир",
                        deadline: "31.01.2016"
                    }
                ]
            },
            {
                status: "In Progress",
                items: []
            },
            {
                status: "Closed",
                items: [
                    {
                        title: "Оценка проекта",
                        assignee: "Риккель Антон",
                        deadline: "20.02.2016"
                    },
                    {
                        title: "Подготовка документации",
                        assignee: "Риккель Антон",
                        deadline: "25.02.2016"
                    }
                ]
            }
        ]
    };
    kanbanBoard.board.render(kanbanBoard.data.tasks);
})();




