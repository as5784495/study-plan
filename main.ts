enum Func {
    Schedule = "schedule",  
    Subject = "subject", 
    Comment = "comment",
    Tag = "tag",
    Plan = "plan", 
    RestTimeRecod = "restTimeRecod",
    ScheduleMonitor = "scheduleMonitor",
    UpdateData ="updateData",

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

type ScheduleType = {
    className: string,
    day: number,
    lessionNum: number,
    point: number,
    professor: string,
    scheduleId: number,
    startTime: string,
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
            multi = ss.getDataRange().getValues();
            const keys =     multi[0];
            const Time_ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Time");
            const Time_multi = Time_ss.getDataRange().getValues();
            const Time_keys = Time_multi[0];
            data = multi.map(v => {    
                return keys.reduce((pre , k , i) => {  //pre每一筆資料
                    if(k === "timeIds" && v[i] !== "timeIds"){
                        const timeId = v[i].split(",")
                        const timeIdLength = timeId.length;  
                        pre["lessionNum"] = timeIdLength;
                        let  timeData = timeId.map(Time_v => {
                            return Time_multi.find(t => t[0] === +Time_v)
                        })
                        timeData = Array.from(timeData);
                        const Obj =  timeData.map(t => {
                            return Time_keys.reduce((Time_pre, Time_k, Time_i) => {
                                Time_pre[Time_k] = t[Time_i];
                                return Time_pre;
                            },{})
                        })
                        
        
                        pre["time"] =  Obj;
                        
                    }
                    else pre[k] = v[i];
                    
                    return pre;
                },{})
            }).slice(1);
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
    }
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.TEXT);

    // return ContentService.createTextOutput(Timediff("12 : 00", "10 : 15").toString()).setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e: DoPost){

    const data = Object.assign(e, {key: "post"});
    if(data.postData.type !== "application/json") throw new Error("不是json格式");

    console.log(data);

    const  {func}  = e.parameter
    switch(func) {
        case Func.UpdateData: { 
            let contents = JSON.parse(e.postData.contents) as ScheduleType[];


            const ss = SpreadsheetApp.getActiveSpreadsheet();
            const sheet = ss.getSheetByName(`test`);


            contents.forEach((v,i) => {
                const table = sheet.getRange(`A${i+2}:G${i+2}`)
                table.setValues([[v.scheduleId, v.className, v.point, v.professor, v.day, v.startTime ,getEndTime(v.startTime , v.lessionNum)]]);
            })
            
            
            break;
        }
        default:
            console.error("沒有這個功能");
            return ContentService.createTextOutput("沒有這個功能").setMimeType(ContentService.MimeType.TEXT);
        
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

function getEndTime(t1 , lessonNum) {
    

    // let t3 = t1.split("：" , 2);
    // let t4 = (+t3[0] + (+t3[1] + 50*lessonNum)/60) >> 0; 
    // let t5 = (+t3[1] + 50*lessonNum)%60;
    // return `${t4}：${t5}`; 

    
}

function test(){
    let result: string;
    let multi: any[][];
    let data: Object;
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(`Schedule`);
    multi = ss.getDataRange().getValues();
    const keys =     multi[0];
    const Time_ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Time");
    const Time_multi = Time_ss.getDataRange().getValues();
    const Time_keys = Time_multi[0];
    data = multi.map(v => {    
        return keys.reduce((pre , k , i) => {  //pre每一筆資料
            if(k === "timeIds" && v[i] !== "timeIds"){
                const timeId = v[i].split(",")
                const timeIdLength = timeId.length;  
                pre["lessionNum"] = timeIdLength;
                let  timeData = timeId.map(Time_v => {
                    return Time_multi.find(t => t[0] === +Time_v)
                })
                timeData = Array.from(timeData);
                const Obj =  timeData.map(t => {
                    return Time_keys.reduce((Time_pre, Time_k, Time_i) => {
                        Time_pre[Time_k] = t[Time_i];
                        return Time_pre;
                    },{})
                })
                

                pre["time"] =  Obj;
                
            }
            else pre[k] = v[i];
            
            return pre;
        },{})
    }).slice(1);
    console.log(JSON.stringify(data));

}