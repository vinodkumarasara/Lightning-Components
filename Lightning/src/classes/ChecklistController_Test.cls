@istest
public class ChecklistController_Test {
    public static testmethod void unittest(){
        checklist__c chrecd=new checkList__c();
        chrecd.name='Test Record';
        insert chrecd;
        
        checklist_item__c itemrecd=new checklist_item__c(checklist__c=chrecd.Id);
        insert itemrecd;
        ChecklistController obj=new ChecklistController();
        ChecklistController.LoadChecklist();
        ChecklistController.savechecklistItems(new List<checklist_item__c>{itemrecd});
        PickListController.getPickListValuesIntoList('CheckList__c', 'Type__c');
    } 
}