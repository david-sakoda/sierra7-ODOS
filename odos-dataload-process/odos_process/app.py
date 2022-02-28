import boto3
import json
import base64
import concurrent.futures
import traceback
import requests

url = "https://15677b7a-534d-4ec6-bd71-83e1d19d8ec7.mock.pstmn.io/odos/movies/"

s3_client = boto3.client('s3')

def get_api():
    r = requests.get(url)
    return r.json()


def get_file_info(event):
    records = event.get("Records")
    file_info = []
    for r in records:
        file_info.append({"bucket": r.get("s3").get("bucket").get("name"), "key": r.get("s3").get("object").get("key")})
    return file_info

def print_file_data(movie_init_data):
    print("file content: " + str(movie_init_data))
    

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    file_info = get_file_info(event)
    for f in file_info:
        result = s3_client.get_object(Bucket=f.get("bucket"), Key=f.get("key"))
        contents = result['Body'].read()
        print_file_data(contents.decode("utf-8"))
        print ("api data " + str(get_api()))
    print("Complete.")
