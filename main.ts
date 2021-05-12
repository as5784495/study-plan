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
        schduleId: string;
        searchTime: string;
        searchDay: string;
        className: string;
        

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
    let data: Object;
    
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
            multi = ss.getRange("A1:G1").getValues();
            const keys =     multi[0];
            multi = ss.getRange("A2:G11").getValues();
            let data = multi.map(v => {
                console.log(v[5] , v[6]);
                return keys.reduce((pre , k , i) => {

                    if(k === "endTime"){
                        pre["lessionNum"] = Timediff(v[5], v[6]);
                    }
                    else{
                    pre[k] = v[i];
                    }
                    return pre;
                },{})
            })
            console.log(JSON.stringify(data));
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
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.TEXT);

    // return ContentService.createTextOutput(Timediff("12 : 00", "10 : 15").toString()).setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e: DoPost){

    const data = Object.assign(e, {key: "post"});
    switch (data.postData.type) {
        case "text/plain":
            //TODO...
            break;
        case "application/json":
            //TODO...
            break;
    }
    const content = JSON.parse(e.postData.contents);

    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);


}


function Timediff(t1 , t2): number{

    let t3 = t1.split("：" , 2);
    let t4 = t2.split("：" , 2);
    
    t3[0] = t3[0]*60;
    t4[0] = t4[0]*60;
    return Math.floor((+t4[0] + +t4[1] - +t3[0] - +t3[1])/50);

}