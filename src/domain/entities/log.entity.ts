interface LogEntityOptions {
    level: LogSeverityLevel,
    message: string,
    createdAt: Date
}

export enum LogSeverityLevel
{
    low     = 'low',
    medium  = 'medium',
    high    = 'high',
}

export class LogEntity
{
    
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor ( options: LogEntityOptions)
    {
        const {message, level, createdAt = new Date()} = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
    }

    // constructor ( message: string, level: LogSeverityLevel )
    // {
    //     this.message = message;
    //     this.level = level;
    //     this.createdAt = new Date();
    // }

    static fromJson = (jsonData: string) : LogEntity => {
        const {level, message, createdAt} =  JSON.parse(jsonData);
        const log = new LogEntity({
            message,
            level,
            createdAt
        });        
        return log;
    } 

    static fromObject = ( object : {[key: string ]: any}): LogEntity => 
    {
        const {message, level, createdAt } = object;
        const log = new LogEntity({
            message,
            level,
            createdAt
        });
        return log;
    }

}