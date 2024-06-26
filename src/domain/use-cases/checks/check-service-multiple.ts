import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute(url: string):Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback : SuccessCallback,
        private readonly errorCallback : ErrorCallback
    ) {}

    public async execute(url: string): Promise<boolean> 
    {
        try {            
            const req = await fetch(url);
            if(!req.ok)
            {
                throw new Error(`Error on Check Service ${url}`)
            }

            // const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low);
            const log = new LogEntity({message:`Service ${url} working`, level: LogSeverityLevel.low,createdAt:new Date()});
            
            this.callLogs(log);
            
            this.successCallback();
            console.log(`${url} is OK`);
            return true;
        } catch (error) {            
            const errorMessage = `${error}`;
            const log = new LogEntity({message:errorMessage, level: LogSeverityLevel.high,createdAt:new Date()});
            this.callLogs(log);
            // console.log(`${error}`)
            this.errorCallback(errorMessage);
            return false;
        }        
    }

    private callLogs(log: LogEntity){
        this.logRepository.forEach(logRepo => {
            logRepo.saveLog(log);
        })
    }
}