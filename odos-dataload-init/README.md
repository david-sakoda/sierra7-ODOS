# odos-dataload-init

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders.

- odos_init_app - Code for the application's Lambda function.
- tests - Unit tests for the application code. 
- template.yaml - A template that defines the application's AWS resources.


## Deploy the sample application

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

sam build --use-container
sam local invoke odosdataloadinit  --event events/event.json

sam package --template-file template.yaml --output-template-file package.yaml --s3-bucket odos-lambda-bootstrap
sam deploy --template-file package.yaml --s3-bucket odos-lambda-bootstrap --stack-name odos-dataload-init-lambda --capabilities CAPABILITY_NAMED_IAM --region us-east-1

sam logs -n odos-dataload-init --stack-name odos-dataload-init-lambda --tail

## Tests

Tests are defined in the `tests` folder in this project. Use PIP to install the test dependencies and run tests.

```bash
odos-dataload-init$ pip install -r tests/requirements.txt --user
# unit test
odos-dataload-init$ python -m pytest tests/unit -v
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name odos-dataload-init
```

