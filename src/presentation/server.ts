import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";



const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);


export class Server {
    public static start() {
       console.log('Server running...');           
       CronService.createJob('*/5 * * * * *',
       () => {            
            new CheckService(
                fileSystemRepository,
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