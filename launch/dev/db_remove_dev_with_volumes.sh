#/bin/bash
export $(cat ../../.env.staging | xargs)
docker-compose -f ../../docker-compose.stage.yml down --volumes
export $(cat ../../clean.env | xargs)
