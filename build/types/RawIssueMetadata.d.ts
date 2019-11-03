export interface RawIssueMetadata {
    fields: {
        issuetype: {
            required: true;
            schema: {
                type: "issuetype";
                system: "issuetype";
            };
            name: "Issue Type";
            key: "issuetype";
            operations: [];
            allowedValues: [{
                description: "A task that needs to be done.";
                iconUrl: "https://foo.atlassian.net/images/icons/issuetypes/task_agile.png";
                name: "Task";
            }, {
                description: "A user story. Created by JIRA Software - do not edit or delete.";
                iconUrl: "https://foo.atlassian.net/secure/viewavatar?size=medium&avatarId=11035&avatarType=issuetype";
                name: "Story";
                subtask: false;
            }, {
                description: "A problem which impairs or prevents the functions of the product.";
                iconUrl: "https://foo.atlassian.net/secure/viewavatar?size=medium&avatarId=13021&avatarType=issuetype";
                name: "Bug";
                subtask: false;
            }, {
                description: "A big user story that needs to be broken down. Created by JIRA Software - do not edit or delete.";
                iconUrl: "https://foo.atlassian.net/secure/viewavatar?size=medium&avatarId=11027&avatarType=issuetype";
                name: "Epic";
                subtask: false;
            }];
        };
        customfield_11120: {
            required: false;
            schema: {
                type: "any";
                custom: "com.pyxis.greenhopper.jira:gh-epic-link";
                customId: 11120;
            };
            name: "Epic Link";
            key: "customfield_11120";
            operations: ["set"];
        };
        customfield_11121: {
            required: true;
            schema: {
                type: "string";
                custom: "com.pyxis.greenhopper.jira:gh-epic-label";
                customId: 11121;
            };
            name: "Epic Name";
            key: "customfield_11121";
            operations: ["set"];
        };
        summary: {
            required: true;
            schema: {
                type: "string";
                system: "summary";
            };
            name: "Summary";
            key: "summary";
            operations: ["set"];
        };
        customfield_12420: {
            required: false;
            schema: {
                type: "number";
                custom: "com.atlassian.jira.plugin.system.customfieldtypes:float";
                customId: 12420;
            };
            name: "Estimate";
            key: "customfield_12420";
            operations: ["set"];
        };
        priority: {
            required: false;
            schema: {
                type: "priority";
                system: "priority";
            };
            name: "Priority";
            key: "priority";
            operations: ["set"];
            allowedValues: [{
                "self": "https://foo.atlassian.net/rest/api/2/priority/5";
                "iconUrl": "https://foo.atlassian.net/images/icons/priorities/critical.svg";
                "name": "Urgent";
                "id": "5";
            }, {
                "self": "https://foo.atlassian.net/rest/api/2/priority/6";
                "iconUrl": "https://foo.atlassian.net/images/icons/priority_major.gif";
                "name": "High";
                "id": "6";
            }, {
                "self": "https://foo.atlassian.net/rest/api/2/priority/10000";
                "iconUrl": "https://foo.atlassian.net/images/icons/priorities/trivial.svg";
                "name": "Medium";
                "id": "10000";
            }, {
                "self": "https://foo.atlassian.net/rest/api/2/priority/4";
                "iconUrl": "https://foo.atlassian.net/images/icons/priorities/trivial.svg";
                "name": "Normal priority";
                "id": "4";
            }, {
                "self": "https://foo.atlassian.net/rest/api/2/priority/7";
                "iconUrl": "https://foo.atlassian.net/images/icons/priorities/minor.svg";
                "name": "Low";
                "id": "7";
            }];
        };
        "labels": {
            "required": false;
            "schema": {
                "type": "array";
                "items": "string";
                "system": "labels";
            };
            "name": "Labels";
            "key": "labels";
            "autoCompleteUrl": "https://foo.atlassian.net/rest/api/1.0/labels/92932/suggest?query=";
            "operations": ["add", "set", "remove"];
        };
        "issuelinks": {
            "required": false;
            "schema": {
                "type": "array";
                "items": "issuelinks";
                "system": "issuelinks";
            };
            "name": "Linked Issues";
            "key": "issuelinks";
            "autoCompleteUrl": "https://foo.atlassian.net/rest/api/2/issue/picker?currentProjectId=&showSubTaskParent=true&showSubTasks=true&currentIssueKey=SEC-1413&query=";
            "operations": ["add"];
        };
        "comment": {
            "required": false;
            "schema": {
                "type": "comments-page";
                "system": "comment";
            };
            "name": "Comment";
            "key": "comment";
            "operations": ["add", "edit", "remove"];
        };
    };
}
