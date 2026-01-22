import { envs } from "./configs/envs";
import { AppRoutes } from "./presentantion/routes";
import { Server } from "./presentantion/server";



(async() => {

    main();

})();


function main (){
   const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,


   });

   server.start();
}