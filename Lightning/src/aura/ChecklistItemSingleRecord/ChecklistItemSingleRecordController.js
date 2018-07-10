({
    doInit: function(component, event, helper) {
        console.log('Component initialized');
    },
    EditName : function(component,event,helper){  
        component.set("v.nameEditMode", true);
        setTimeout(function(){
            component.find("inputId").focus();
        }, 100);
    },
    inlineEditstatus : function(component,event,helper){  
        component.set("v.StatusEditMode", true);       
        setTimeout(function(){
            component.find("inputId1").focus();
        }, 100);
    },
    onNameChange : function(component,event,helper){
        if(event.getSource().get("v.value").trim() != ''){
            component.set("v.showSaveCancelBtn",true);
        }
    },
    onStatusChange : function(component,event,helper){
        component.set("v.showSaveCancelBtn",true);
    },    
    closeNameBox : function (component, event, helper) {
        component.set("v.nameEditMode", false);
        if(event.getSource().get("v.value").trim() == ''){
            component.set("v.showErrorClass",true);
        }else{
            component.set("v.showErrorClass",false);
        }
    },
    closeStatusBox : function (component, event, helper) {
        component.set("v.statusEditMode", false);
    },
})