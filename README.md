# Aida Discord Chatbot

A discord integrated chatbot.

## Introduction

Aika is a chatbot built in Discord. Aika responds to Discord interactions.

Discord application sends all events to one endpoint URL.
Our architecture prevents Discord Serverless Bot from becoming a Lambda Monolith.

When a message is received, a lambda is run which publishes it to the SNS topic. This lambda responds to Discord with "loading".
Command lambdas listen for events on the SNS topic and run accordingly.
In the event of an error, the message is added to an SQS dead letter queue.
A lambda listens to events on this SQS DLQ and updates Discord with "error".

## Run it

Prerequisites:
- AWS SAM CLI
- AWS User connected to CLI
- Discord Application created and invited to your test guild

### Install required packages

Install required packages

```
yarn
```

We are templating the main `template.yaml` file with `generate_template/generate.js`, so it's not in the main folder by default.

### Prepare

1. Get your development Guild (Discord Server) Id by enabling Developer Mode in settings and right-clicking your guild.
2. Get App Id and Bot Token from Discord Developers Portal.
3. Copy `.env.example` to `.env` and fill `.env` with real values.

### Generate template

Generate template based on your folder structure and metadata in `src/`:

```
node generate_template/generate.js
```

### Register commands

Register commands on one guild for development (instant):

```
node register_commands/register.js
```

*If you will not specify `GUILD_ID` environment variable, deployed commands will be global.*

### Build and deploy

Build and deploy with:

```
sam build && sam deploy --guided
```

## Add your own function

1. Create a new command in `src/modules/example/another-one.js` similar to `chat.js`. It must have another name within the `exports.data`.
2. Generate template, register commands, build and deploy using:

```
node generate_template/generate.js && \
node register_commands/register.js && \
sam build && sam deploy
```

## Clean all

```
sam destroy
```

# Sidenotes

This project contains source code and supporting files for a serverless application that you can deploy with the AWS Serverless Application Model (AWS SAM) command line interface (CLI). It includes the following files and folders:

- `src` - Code for the application's Lambda function.
- `events` - Invocation events that you can use to invoke the function.
- `__tests__` - Unit tests for the application code. 
- `template.yaml` - A template that defines the application's AWS resources.

Resources for this project are defined in the `template.yaml` file in this project. The file has its own template generator. You can update the template to add AWS resources through the same deployment process that updates your application code.

## Resources

This implementation is an extension of the code here:
https://betterprogramming.pub/serverless-discord-bot-on-aws-in-5-steps-956dca04d899
https://github.com/jakjus/serverless-discord-bot

At the time of use, this reference did not contain a LICENSE.

For an introduction to the AWS SAM specification, the AWS SAM CLI, and serverless application concepts, see the [AWS SAM Developer Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html).

Next, you can use the AWS Serverless Application Repository to deploy ready-to-use apps that go beyond Hello World samples and learn how authors developed their applications. For more information, see the [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/) and the [AWS Serverless Application Repository Developer Guide](https://docs.aws.amazon.com/serverlessrepo/latest/devguide/what-is-serverlessrepo.html).
