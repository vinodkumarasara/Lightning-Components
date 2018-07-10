({
    doInit: function(component, event, helper) {
        // Prepare a new record from template
        component.find("CheckListRecordCreator").getNewRecord(
            "CheckList__c", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newCheckList");
                var error = component.get("v.newCheckListError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.sobjectType);
            })
        );
    },

    handleSaveCheckList: function(component, event, helper) {
        var typeval=component.get("v.TypeVal");
        console.log(typeval);
        component.set("v.simpleNewCheckList.Type__c", typeval);
        if(helper.validateCheckListForm(component)) {            
            component.find("CheckListRecordCreator").saveRecord(function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // record is saved successfully
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": "The record was saved."
                    });
                    resultsToast.fire();
					var AppEvent = $A.get("e.c:ChecklistEvent");
                    AppEvent.fire();
                } else if (saveResult.state === "INCOMPLETE") {
                    // handle the incomplete state
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    // handle the error state
                    console.log('Problem saving CheckList, error: ' + JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }
            });
        }
    }
})