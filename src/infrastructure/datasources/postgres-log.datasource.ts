import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {
        
    async saveLog(log: LogEntity): Promise<void> {
        
        const level = severityEnum[log.level];
        const newLog = await prismaClient.logModel.create({
            data: {
                message: log.message,
                origin: '',
                createdAt: log.createdAt,
                level: level
            }
        });

        console.log('PostgreSQL Item Saved')
    }



   async  getLogs(level: LogSeverityLevel): Promise<LogEntity[]> {
               
        const levelSeverity  = severityEnum[level];

        const dbLogs = await prismaClient.logModel.findMany({
            where:{
                level: levelSeverity
            }
        });

        return dbLogs.map(LogEntity.fromObject);
        // return dbLogs.map(dbLog => LogEntity.fromObject(dbLog));
    }



}