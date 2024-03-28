import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async() => {
    main();
})();

async function main(){
    
    await MongoDatabase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME,
    });


    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data:{
    //         level:'HIGH',
    //         message:'Test Mensaje',
    //         origin:'App.Ts'
    //     }
    // });

    // console.log(newLog);
    //Crear Collecion

    // const logs = await prisma.logModel.findMany({
    //     where:{
    //         level:'HIGH'
    //     }
    // });
    // console.log(logs);


    // const newLog = await LogModel.create({
    //     message: 'Test Message desde Mongo',
    //     origin:'App.ts',
    //     level:'low'
    // });
    
    // await newLog.save();

    // const logs = await LogModel.find();
    // console.log(logs);

    Server.start();
    // console.log(envs);
}