/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/

"use strict";

/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/

import { $log } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import App from "./App";


async function bootstrap() {
    try {
        $log.debug("Start server...");
        const platform = await PlatformExpress.bootstrap(App, {
            // extra settings
        });

        await platform.listen();
        $log.debug("Server initialized");
    } catch (er) {
        $log.error(er);
    }
}

bootstrap();