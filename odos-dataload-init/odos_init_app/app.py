import boto3
import json
import base64
from io import BytesIO
import cgi


s3_client = boto3.client('s3')

def get_event_body(event):
    return event.get("body")

def get_event_headers(event):
    return event.get("headers")

def get_event_header(event, header_name):
    event_headers =get_event_headers(event)
    return event_headers[header_name]

def get_data_bytes(event):
    event_body = get_event_body(event)
    return base64.b64decode(event_body) if event.get("isBase64Encoded") else event_body.encode()

def get_file_data(event):
    cgi_content_type, params = cgi.parse_header(get_event_header(event, "content-type"))
    params['boundary'] =  params['boundary'].encode('utf-8')
    multipart_data = cgi.parse_multipart(BytesIO(get_data_bytes(event)), params)
    return multipart_data['file'][0]

def lambda_handler(event, context):
    # TODO implement
    print("Received event: " + json.dumps(event, indent=2))
    file_data = get_file_data(event)
    file_name = get_event_header(event, 'x-file-name')
    result = s3_client.put_object(Body=file_data, Bucket='odos-dataload-init', Key=file_name)

    res = result.get('ResponseMetadata')

    if res.get('HTTPStatusCode') == 200:
        return {
            'statusCode': 201,
            'body': 'Upload Successful.'
        }
    else:
        return {
            'statusCode': res.get('HTTPStatusCode'),
            'body': 'Upload Failed.'
        }
