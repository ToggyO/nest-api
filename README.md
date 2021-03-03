Nest API
======

#### Development
1. Run `npm install`;
2. Create docker containers with Redis and PostgreSQL:
   1. `cd launch/dev`;
   2. `. db_start_dev.sh`.
3. `cd ../../`;
4. Make initial migrations for database by executing the command `npm run migration:run:dev`;
5. Launch application with:
   - `npm run start:dev` - in development mode;
   - `npm run start:debug` - if you are using IDE debug launcher
- To remove containers, use `db_remove_dev.sh` (or `db_remove_dev_with_volumes.sh`)
from `launc/dev` directory.
    
#### Publication
1. Create docker container:
   1. `cd launch/stage`;
   2. `. start_stage.sh`
    - (Note: If you already have launched containers, use `. restart_stage.sh`.
      Executing this script, you provide a disk memory cleaning from dangling docker images).
- To stop containers, use `stop_stage.sh` from `launc/stage` directory.
- To remove containers, use `remove_stage.sh` (or `remove_stage_with_volumes.sh`)
  from `launc/stage` directory.