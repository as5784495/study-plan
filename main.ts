enum Func {
    Schedule = "schedule",  
    Subject = "subject", 
    Comment = "Comment",
    Tag = "tag",
    Plan = "plan", 
    RestTimeRecod = "restTimeRecod",
    ScheduleMonitor = "scheduleMonitor",

}
type DoGet = GoogleAppsScript.Events.DoGet & {
    parameter: {
        func: Func
    },
};

function doGet(e: DoGet) {
    const  {func}  = e.parameter
    let result: string;
    let multi: GoogleAppsScript.Spreadsheet.Range[][]
    
    for (const v in e.parameter) {
        if(v!="func")
            {
                console.error("沒有這個功能");
                return ContentService.createTextOutput("沒有這個功能").setMimeType(ContentService.MimeType.TEXT);
            }
    }
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(`${ func }`);

    switch (func){
        case Func.Schedule:
            result = "This is Schedule."
            multi = sheet.getRange("B2:F11").getValues();
            console.log(multi);
            break;
        case Func.Plan:
            result = "This is Plan."
            break;
        case Func.Comment:
            result = "This is Comment."
            break;
        case Func.Tag:
            result = "This is Tag."
            break;
        case Func.Subject:
            result = "This is Subject."
            break;
        case Func.ScheduleMonitor:
            result = "This is ScheduleMonitor."
            break;
        case Func.RestTimeRecod:
            result = "This is RestTimeRecod."
            break;
            
        default:
            console.error("沒有這個功能");
            return ContentService.createTextOutput("沒有這個功能").setMimeType(ContentService.MimeType.TEXT);
            // throw new Error("沒有這個功能");
            break;
    }
    SpreadsheetApp.flush();
    return ContentService.createTextOutput(JSON.stringify(multi)).setMimeType(ContentService.MimeType.TEXT);
    
    // return ContentService.createTextOutput(JSON.stringify(e)).setMimeType(ContentService.MimeType.JSON);
}