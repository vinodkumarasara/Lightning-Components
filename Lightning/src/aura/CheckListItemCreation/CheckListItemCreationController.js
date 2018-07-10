({
    doInit: function(component, event, helper) {
        // Prepare a new record from template
        component.find("CheckListItemRecordCreator").getNewRecord(
            "CheckList_Item__c", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newCheckListItem");
                var error = component.get("v.newCheckListItemError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.sobjectType);
            })
        );
    },

    handleSaveCheckListItem: function(component, event, helper) {
        var CheckListId=component.get("v.CheckListId");
        console.log(CheckListId);
        component.set("v.simpleNewCheckListItem.CheckList__c", CheckListId);
        if(helper.validateCheckListItemForm(component)) {            
            component.find("CheckListItemRecordCreator").saveRecord(function(saveResult) {
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
                    console.log('Problem saving CheckList Item, error: ' + JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }
            });
        }
    }
})