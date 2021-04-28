enum Func {
    Schedule = "schedule",  
    Subject = "subject", 
    Comment = "comment",
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

type DoPost = GoogleAppsScript.Events.DoPost & {
    parameter: {
        func: Func
    }
}

function doGet(e: DoGet) {
    const  {func}  = e.parameter
    let result: string;
    let multi: any[][];
    
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
            multi = sheet.getRange("A2:G11").getValues();
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
    return ContentService.createTextOutput(JSON.stringify(multi)).setMimeType(ContentService.MimeType.TEXT);
    
    // return ContentService.createTextOutput(JSON.stringify(e)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e: DoPost){
    const {func} = e.parameter;
    let result: string;
    let multi:any[][];

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
            break;
        case Func.Plan:
            result = "This is Plan."
            break;
        case Func.Comment:
            result = "This is Comment."
            multi = [[123,"延期"]];
            sheet.getRange("A2:B2").setValues(multi);
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
    }
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.TEXT);


}