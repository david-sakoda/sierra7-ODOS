import json

import pytest

from odos_init_app import app


@pytest.fixture()
def apigw_event():
    """ Generates API GW Event"""
    return {
        "version": "2.0",
        "routeKey": "POST /loadMovies",
        "rawPath": "/v1/loadMovies",
        "rawQueryString": "",
        "headers": {
            "accept": "*/*",
            "content-length": "277",
            "content-type": "text/plain; boundary=------------------------87f31c4a0eee9f44",
            "host": "9g4urbd5l6.execute-api.us-east-1.amazonaws.com",
            "user-agent": "curl/7.79.1",
            "x-amzn-trace-id": "Root=1-6215b669-3d8b5a8e16c162ab7bf1fb18",
            "x-file-name": "movies.dat",
            "x-forwarded-for": "108.40.125.36",
            "x-forwarded-port": "443",
            "x-forwarded-proto": "https"
        },
        "requestContext": {
            "accountId": "543335889378",
            "apiId": "9g4urbd5l6",
            "domainName": "9g4urbd5l6.execute-api.us-east-1.amazonaws.com",
            "domainPrefix": "9g4urbd5l6",
            "http": {
                "method": "POST",
                "path": "/v1/loadMovies",
                "protocol": "HTTP/1.1",
                "sourceIp": "108.40.125.36",
                "userAgent": "curl/7.79.1"
            },
            "requestId": "N-lwlhOhoAMEMjQ=",
            "routeKey": "POST /loadMovies",
            "stage": "v1",
            "time": "23/Feb/2022:04:22:01 +0000",
            "timeEpoch": 1645590121979
        },
        "body": "LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS04N2YzMWM0YTBlZWU5ZjQ0DQpDb250ZW50LURpc3Bvc2l0aW9uOiBhdHRhY2htZW50OyBuYW1lPSJmaWxlIjsgZmlsZW5hbWU9Im1vdmllcy5kYXQiDQpDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbQ0KDQowMDAwMDA4OjpFZGlzb24gS2luZXRvc2NvcGljIFJlY29yZCBvZiBhIFNuZWV6ZSAoMTg5NCk6OkRvY3VtZW50YXJ5fFNob3J0Cg0KLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS04N2YzMWM0YTBlZWU5ZjQ0LS0NCg==",
        "isBase64Encoded": true
    }

def test_lambda_handler_write_file(apigw_event, mocker):
    file_mock = mocker.patch.object(app, 'FILE')
    file_mock.is_file.return_value = False

    ret = app.lambda_handler(apigw_event, "")
    data = json.loads(ret["body"])

    assert ret["statusCode"] == 200
    assert "file_contents" in ret["body"]
    assert "created_file" in ret["body"]
    assert data["file_contents"] == "Hello, EFS!\n"
    assert data["created_file"] == True
