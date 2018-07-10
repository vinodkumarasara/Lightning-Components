public class ChecklistController {
   
    @Auraenabled
    public static checklistcls LoadChecklist(){
        //method to check existing checklist for logged in user
        checklistcls checklistRecd;        
        for(checklist__c chrecd:[select id,name,type__c,(select id,name,status__c,description__c from CheckList_Items__r) from checklist__c where ownerId=:userinfo.getUserId()]){
           checklistRecd=new checklistcls(chrecd,chrecd.CheckList_Items__r); 
           
        }
        if(checklistRecd!=null)
        return checklistRecd;
        else return null;
    }
    @AuraEnabled
    public static List < CheckList_Item__c > savechecklistItems(List<CheckList_Item__c> checklistItems) {
        update checklistItems;
        return checklistItems;
    }
    public class checklistcls{
        @AuraEnabled public checklist__c checkRecd{get;Set;}
        @AuraEnabled public List<Checklist_Item__c> chItems{get;set;}
        public checklistcls(checklist__c ch,List<Checklist_Item__c> chItm){
            checkRecd=ch;
            chItems=chItm;
        }
    }
}