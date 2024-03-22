import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";



const logRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
    // new MongoLogDatasource()
);


export class Server {
    public static async start() 
    {
       console.log('Server running...');           
      
      
    //   const logs = await logRepository.getLogs(LogSeverityLevel.low);
    //   console.log(logs);
      
       CronService.createJob('*/5 * * * * *',
       () => {            
            new CheckService(
                logRepository,
                () => console.log('success'),
                (error) => console.log(error),
            ).execute('https://google.com');        
        // new CheckService().execute('http://localhost:3000');     
       });

    //    CronService.createJob('*/5 * * * * *',
    //    () => {
    //     const date = new Date();
    //     console.log('5 seconds', date);
    //    });

    //    CronService.createJob('*/2 * * * * *',
    //    () => {
    //     const date = new Date();
    //     console.log('2 seconds', date);
    //    });


    }
}