({
	doInit : function(component, event, helper) {
		helper.loadrecords(component, event);
	},
    Savechecklistitem : function(component, event, helper) {
        if (helper.requiredFieldValidation(component, event)){
            var action = component.get("c.savechecklistItems");
            action.setParams({
                'checklistItems': component.get("v.CheckListItems")
            });
            action.setCallback(this, function(response) {
                if (response.getState() === "SUCCESS" && component.isValid()) {
                    component.set("v.CheckListItems", response.getReturnValue());
                    component.set("v.showSaveCancelBtn",false);
                    alert('CheckList Item Updated...');
                }
            });
            $A.enqueueAction(action);
        }
    },
    CreateCheckList: function(component, event, helper) {
        component.set("v.createchecklst",true);
    },
    closeModel:function(component, event, helper) {
        component.set("v.createchecklst",false);
        component.set("v.createchecklstitm",false);
        helper.loadrecords(component, event);
    },
    CreateCheckListItem:function(component, event, helper) {        
        component.set("v.createchecklstitm",true);
    },
})