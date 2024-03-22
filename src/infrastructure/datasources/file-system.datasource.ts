import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource 
{
    private readonly logPath = 'logs/';
    private readonly allLogPath = 'logs/logs-all.log';
    private readonly mediumLogPath = 'logs/logs-medium.log';
    private readonly heigthLogPath = 'logs/logs-high.log';


    constructor()
    {
        this.createLogsFiles();
    }

    private createLogsFiles = () => 
    {
        if(!fs.existsSync(this.logPath))
        {
            fs.mkdirSync(this.logPath);
        }
        [
            this.allLogPath,
            this.mediumLogPath,
            this.heigthLogPath,
        ].forEach(path => {
            if( fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> 
    {
        const logAsJson = `${ JSON.stringify(newLog) }\n`;
        fs.appendFileSync(this.allLogPath, logAsJson);
        if(newLog.level === LogSeverityLevel.low) return;
        if(newLog.level === LogSeverityLevel.medium)
        {
            fs.appendFileSync(this.mediumLogPath, logAsJson);
        };
        if(newLog.level === LogSeverityLevel.high)
        {
            fs.appendFileSync(this.heigthLogPath, logAsJson);
        };
    }

    private getLogsFromFile = (path: string) : LogEntity[] => {

        const content = fs.readFileSync(path, 'utf-8');

        // const logs = content.split('\n').map(log => LogEntity.fromJson(log));
        const logs = content.split('\n').map(LogEntity.fromJson);

        return logs;
    }
    async getLogs(level: LogSeverityLevel): Promise<LogEntity[]> 
    {
       switch (level) {
        case LogSeverityLevel.low:
            return this.getLogsFromFile(this.allLogPath);
        case LogSeverityLevel.medium:
            return this.getLogsFromFile(this.mediumLogPath);
        case LogSeverityLevel.high:
            return this.getLogsFromFile(this.heigthLogPath);
        default:
            throw new Error(`${level} not implemented.`);
       }
    }

}