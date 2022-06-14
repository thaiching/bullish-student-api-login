#!/bin/bash
echo "Create dummy student data before running automation tests"
id=(222 333 444 555 666)

for item in ${id[@]}; do
    printf -v PAYLOAD '{
    "firstName": "Joe",
    "id": %s,
    "lastName": "test",
    "nationality": "Singaporean",
    "studentClass": "4A"
    }' "$item"
    echo $PAYLOAD
    echo $item
    RESPONSE=`curl -s --request POST -H "Content-Type:application/json" http://localhost:9080/studentmgmt/addStudent --data "${PAYLOAD}"`
    echo $RESPONSE
done
