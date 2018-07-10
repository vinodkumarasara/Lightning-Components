({
    requiredFieldValidation : function(component,event) {
        var allRecords = component.get("v.CheckListItems");
        var isValid = true;
        for(var i = 0; i < allRecords.length;i++){
            if(allRecords[i].Name == null || allRecords[i].Name.trim() == ''){
                alert('fill this field : Row No ' + (i+1) + ' CheckList Item Name is null' );
                isValid = false;
            } 
        }
        return isValid;
    },
    loadrecords:function(component,event){
        var action = component.get("c.LoadChecklist");
        
        action.setCallback(this, function(response) {
            var list = response.getReturnValue();
            console.log(list);
            if(list==null){
                console.log('in null condition');
                component.set("v.checklistExist",false);
            }
            else{
                //console.log('in else condition');
                component.set("v.checklistExist",true);
                component.set("v.CheckListRecd",list.checkRecd);
                component.set("v.CheckListItems",list.chItems);
                //console.log(list.checkRecd);
                //console.log(list.chItems);
            }
        })
        $A.enqueueAction(action);
    }
})